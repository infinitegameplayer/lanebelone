import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { lookupNativeFormConfig } from '@/lib/form-config'
import { sendEmail } from '@/lib/email/resend'
import { applyNewsletterOptIn, applyArticleOptIn } from '@/lib/newsletter'
import {
  contactAutoResponse,
  speakingAutoResponse,
} from '@/lib/email/templates'

// Form Architecture Codex (canonical pattern; see Council Chamber/Codices)
// covers the standard for adding any new form across SQHQ, lanebelone and IGOS.

function autoResponseForFormName(formName: string, firstName?: string) {
  switch (formName) {
    case 'lanebelone-contact':
      return contactAutoResponse(firstName)
    case 'lanebelone-speaking':
      return speakingAutoResponse(firstName)
    default:
      // lanebelone-newsletter intentionally has no auto-response.
      // The newsletter welcome email from applyNewsletterOptIn is the
      // single canonical confirmation for that path.
      return null
  }
}

type SubmitBody = {
  formName: string
  email?: string
  firstName?: string
  lastName?: string
  message?: string
  // Explicit newsletter consent. Honored only when form-config declares
  // newsletterOptIn: 'explicit-checkbox'.
  newsletterConsent?: boolean
  honeypot?: string
  openedAt?: number
}

const MIN_FILL_MS = 1500

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') ?? req.headers.get('referer') ?? ''
  let body: SubmitBody
  try {
    body = (await req.json()) as SubmitBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!body?.formName) {
    return NextResponse.json({ error: 'Missing formName' }, { status: 400 })
  }

  const config = lookupNativeFormConfig(body.formName)
  if (!config) {
    return NextResponse.json({ error: 'Unknown form' }, { status: 400 })
  }

  const originAllowed = config.allowedOrigins.some((allowed) => origin.startsWith(allowed))
  if (!originAllowed) {
    return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 })
  }

  if (body.honeypot && body.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }
  if (typeof body.openedAt === 'number' && Date.now() - body.openedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : undefined
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : undefined
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : undefined
  const message = typeof body.message === 'string' ? body.message.trim() : undefined

  const supabase = getSupabaseAdmin()

  try {
    const auditFields: Record<string, unknown> = {}
    if (firstName) auditFields.firstName = firstName
    if (lastName) auditFields.lastName = lastName
    if (email) auditFields.email = email
    if (message) auditFields.message = message
    await supabase.from('form_submissions').insert({
      contact_email: email ?? null,
      form_id: body.formName,
      form_name: body.formName,
      fields: auditFields,
      processed: false,
    })
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('form_submissions insert error:', m)
  }

  // Owner notification. Fires for inquiry forms (those carrying a contactTag)
  // so a real submission reaches the brand inbox, not just the Supabase audit
  // row. The newsletter and articles forms carry no contactTag, so the welcome
  // email stays their sole confirmation and no inquiry notification fires.
  if (config.contactTag) {
    await sendOwnerNotification(body.formName, { firstName, lastName, email, message })
  }

  if (!email) {
    return NextResponse.json({ ok: true, contactUpserted: false, reason: 'no_email' })
  }

  let unsubscribed = false
  try {
    const { data: existing, error: selectErr } = await supabase
      .from('contacts')
      .select('id, tags, first_name, last_name, unsubscribed')
      .eq('email', email)
      .maybeSingle()
    if (selectErr) throw selectErr

    if (existing) {
      unsubscribed = existing.unsubscribed === true
      const currentTags: string[] = Array.isArray(existing.tags) ? existing.tags : []
      const tagToAdd = config.contactTag
      const mergedTags = tagToAdd && !currentTags.includes(tagToAdd)
        ? [...currentTags, tagToAdd]
        : currentTags
      const updates: Record<string, unknown> = { tags: mergedTags }
      if (firstName && !existing.first_name) updates.first_name = firstName
      if (lastName && !existing.last_name) updates.last_name = lastName
      const { error: updateErr } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', existing.id)
      if (updateErr) throw updateErr
    } else {
      const tags = config.contactTag ? [config.contactTag] : []
      const { error: insertErr } = await supabase.from('contacts').insert({
        email,
        first_name: firstName ?? null,
        last_name: lastName ?? null,
        source_site: config.sourceSite,
        source_form: config.sourceForm,
        tags,
      })
      if (insertErr) throw insertErr
    }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('contacts upsert error:', m)
  }

  if (!unsubscribed) {
    try {
      const template = autoResponseForFormName(body.formName, firstName)
      if (template) {
        await sendEmail({
          to: email,
          subject: template.subject,
          html: template.html,
          previewText: template.previewText,
        })
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('auto-response send error:', m)
    }
  }

  // Newsletter opt-in. Fires after the auto-response so the form's own
  // confirmation email lands first and the welcome email lands second.
  // The helper owns the personal_subscriber tag, the Resend audience
  // add and the welcome email.
  const shouldOptIn =
    config.newsletterOptIn === 'implicit' ||
    (config.newsletterOptIn === 'explicit-checkbox' && body.newsletterConsent === true)
  if (shouldOptIn && !unsubscribed) {
    try {
      if (config.list === 'article') {
        await applyArticleOptIn({
          email,
          firstName,
          lastName,
          source: `form:${body.formName}`,
        })
      } else {
        await applyNewsletterOptIn({
          email,
          firstName,
          lastName,
          source: `form:${body.formName}`,
        })
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('newsletter opt-in error:', m)
    }
  }

  return NextResponse.json({ ok: true })
}

// Brand inbox that receives inquiry notifications. Env override repoints it
// without a deploy.
const OWNER_NOTIFY_TO = process.env.LANEBELONE_FORM_NOTIFY_TO || 'howdy@lanebelone.com'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Notify the brand inbox that a new inquiry arrived. replyTo carries the
// submitter's address so a reply from the inbox reaches them directly. Sent
// independent of the submitter auto-response and never blocks the response.
async function sendOwnerNotification(
  formName: string,
  fields: { firstName?: string; lastName?: string; email?: string; message?: string }
) {
  try {
    const name = [fields.firstName, fields.lastName].filter(Boolean).join(' ') || 'Not provided'
    const detail = [
      `<strong>Form:</strong> ${escapeHtml(formName)}`,
      `<strong>Name:</strong> ${escapeHtml(name)}`,
      `<strong>Email:</strong> ${escapeHtml(fields.email || 'Not provided')}`,
    ].join('<br>')
    const messageBlock = fields.message
      ? `<p style="margin-top:16px"><strong>Message:</strong></p><p>${escapeHtml(fields.message)}</p>`
      : '<p style="margin-top:16px">No message was included.</p>'
    await sendEmail({
      to: OWNER_NOTIFY_TO,
      replyTo: fields.email,
      subject: `New lanebelone.com inquiry: ${formName}`,
      previewText: `${fields.firstName || 'Someone'} submitted ${formName}.`,
      html: `<p>A new inquiry just came in through lanebelone.com.</p><p>${detail}</p>${messageBlock}<p style="margin-top:16px">Reply to this email to respond to them directly.</p>`,
    })
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('owner notification send error:', m)
  }
}
