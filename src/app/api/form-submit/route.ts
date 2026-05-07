import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { lookupNativeFormConfig } from '@/lib/form-config'
import { sendEmail } from '@/lib/email/resend'
import {
  newsletterAutoResponse,
  contactAutoResponse,
  speakingAutoResponse,
} from '@/lib/email/templates'

// Form Architecture Codex (canonical pattern; see Council Chamber/Codices)
// covers the standard for adding any new form across SQHQ, lanebelone and IGOS.

function autoResponseForFormName(formName: string, firstName?: string) {
  switch (formName) {
    case 'lanebelone-newsletter':
      return newsletterAutoResponse(firstName)
    case 'lanebelone-contact':
      return contactAutoResponse(firstName)
    case 'lanebelone-speaking':
      return speakingAutoResponse(firstName)
    default:
      return null
  }
}

type SubmitBody = {
  formName: string
  email?: string
  firstName?: string
  lastName?: string
  message?: string
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

  return NextResponse.json({ ok: true })
}
