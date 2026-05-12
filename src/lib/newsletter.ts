// Shared newsletter opt-in helper. Mirror of SQHQ
// (C:\Users\User\sites\sidequesthq\src\lib\newsletter.ts).
// Keep the two in lockstep until a shared `kingdom-forms` package lands.
//
// Routes every consent surface (inquiry-form checkbox, NewsletterForm submit,
// future success-page button on lanebelone surfaces) through a single funnel:
// Supabase tag application, Resend audience eager-add, welcome email from
// howdy@lanebelone.com.

import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase'
import { newsletterWelcomeEmail } from '@/lib/email/templates'
import { sendEmail } from '@/lib/email/resend'
import { signEmailToken } from '@/lib/unsubscribe-token'

export type OptInSource =
  | `form:${string}`
  | `success-page:${string}`
  | `migration:${string}`
  | 'test'

export type OptInResult = {
  status: 'subscribed' | 'already-subscribed' | 'unsubscribed-rejoin' | 'error'
  error?: string
}

const TAG = 'distillation_subscriber'
const AUDIENCE_NAME = 'The Distillation'

let cachedAudienceId: string | null = null

async function resolveAudienceId(resend: Resend): Promise<string | null> {
  if (cachedAudienceId) return cachedAudienceId
  const overrideId = process.env.RESEND_AUDIENCE_DISTILLATION_ID
  if (overrideId) {
    cachedAudienceId = overrideId
    return cachedAudienceId
  }
  try {
    const list = await resend.audiences.list()
    const found = list.data?.data?.find((a) => a.name === AUDIENCE_NAME)
    if (found?.id) {
      cachedAudienceId = found.id
      return cachedAudienceId
    }
  } catch (err) {
    console.error('Resend audiences.list failed:', err instanceof Error ? err.message : err)
  }
  return null
}

export async function applyNewsletterOptIn({
  email,
  firstName,
  lastName,
  source,
}: {
  email: string
  firstName?: string
  lastName?: string
  source: OptInSource
}): Promise<OptInResult> {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail) {
    return { status: 'error', error: 'missing email' }
  }

  const dryRun = process.env.NEWSLETTER_OPTIN_DRY_RUN === 'true'
  const supabase = getSupabaseAdmin()

  let rejoin = false
  let alreadyTagged = false
  try {
    const { data: existing, error: selectErr } = await supabase
      .from('contacts')
      .select('id, tags, first_name, last_name, unsubscribed')
      .eq('email', normalizedEmail)
      .maybeSingle()
    if (selectErr) throw selectErr

    if (existing) {
      const currentTags: string[] = Array.isArray(existing.tags) ? existing.tags : []
      const isUnsub = existing.unsubscribed === true
      alreadyTagged = currentTags.includes(TAG) && !isUnsub
      rejoin = currentTags.includes(TAG) && isUnsub

      if (alreadyTagged) {
        return { status: 'already-subscribed' }
      }

      const mergedTags = currentTags.includes(TAG) ? currentTags : [...currentTags, TAG]
      const updates: Record<string, unknown> = {
        tags: mergedTags,
        unsubscribed: false,
        unsubscribed_at: null,
      }
      if (firstName && !existing.first_name) updates.first_name = firstName
      if (lastName && !existing.last_name) updates.last_name = lastName

      const { error: updateErr } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', existing.id)
      if (updateErr) throw updateErr
    } else {
      const { error: insertErr } = await supabase.from('contacts').insert({
        email: normalizedEmail,
        first_name: firstName ?? null,
        last_name: lastName ?? null,
        source_site: 'lanebelone',
        source_form: source,
        tags: [TAG],
      })
      if (insertErr) throw insertErr
    }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('newsletter opt-in supabase error:', m)
    return { status: 'error', error: m }
  }

  if (!dryRun) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const audienceId = await resolveAudienceId(resend)
      if (audienceId) {
        await resend.contacts.create({
          audienceId,
          email: normalizedEmail,
          firstName: firstName ?? undefined,
          lastName: lastName ?? undefined,
          unsubscribed: false,
        })
      } else {
        console.warn('newsletter opt-in: Resend audience id not resolved, skipping eager-add')
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      if (!/already exists|409/i.test(m)) {
        console.error('newsletter opt-in resend audience error:', m)
      }
    }
  }

  if (!dryRun) {
    try {
      const token = signEmailToken(normalizedEmail)
      const unsubUrl = `https://lanebelone.com/unsubscribe?email=${encodeURIComponent(normalizedEmail)}&token=${token}`
      const template = newsletterWelcomeEmail({ firstName, unsubscribeUrl: unsubUrl })
      await sendEmail({
        to: normalizedEmail,
        subject: template.subject,
        html: template.html,
        previewText: template.previewText,
      })
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('newsletter opt-in welcome send error:', m)
    }
  } else {
    console.log(`[newsletter opt-in dry-run] ${normalizedEmail} (source=${source}, rejoin=${rejoin})`)
  }

  return { status: rejoin ? 'unsubscribed-rejoin' : 'subscribed' }
}
