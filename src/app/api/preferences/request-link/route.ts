// Sovereign Email Preference Center, Phase 2. Magic-link fallback.
// When a preference link is expired or unknown, the page offers to email a
// fresh one. This route mints a short-lived expiring token and sends the link,
// keeping the no-login rule. It answers the same way for every address, so it
// never confirms whether an email is on file. A link is sent only when a
// contact exists, and only that case writes an audit row.

import { NextRequest, NextResponse } from 'next/server'
import { signExpiringToken, EXPIRING_TTL_MAGIC_LINK_SECONDS } from '@/lib/unsubscribe-token'
import { getContactMembership } from '@/lib/email-lists'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendEmail } from '@/lib/email/resend'

const SITE_URL = 'https://lanebelone.com'
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: { email?: string }
  try {
    body = (await req.json()) as { email?: string }
  } catch {
    return NextResponse.json({ ok: true })
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  // Identical response for every input. The page learns nothing here.
  if (!email || !EMAIL_REGEX.test(email)) return NextResponse.json({ ok: true })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const supabase = getSupabaseAdmin()

  // Rate limit the fresh-link send. The mail-bomb surface is repeated sends to a
  // known existing address, each of which writes a preference_link_sent row, so
  // counting those bounds it. Identical response holds: an over-cap request still
  // returns ok and simply does not send. A failed count read fails open, bounded
  // by the fact that a send only ever fires to an existing contact.
  try {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count: emailCount } = await supabase
      .from('preference_audit')
      .select('id', { count: 'exact', head: true })
      .eq('email', email)
      .eq('action', 'preference_link_sent')
      .gte('created_at', since)
    if ((emailCount ?? 0) >= 3) return NextResponse.json({ ok: true })
    if (ip) {
      const { count: ipCount } = await supabase
        .from('preference_audit')
        .select('id', { count: 'exact', head: true })
        .eq('ip', ip)
        .eq('action', 'preference_link_sent')
        .gte('created_at', since)
      if ((ipCount ?? 0) >= 10) return NextResponse.json({ ok: true })
    }
  } catch (err) {
    console.error('request-link rate check failed:', err instanceof Error ? err.message : err)
  }

  try {
    const membership = await getContactMembership(email)
    if (membership.exists) {
      const token = signExpiringToken(email, EXPIRING_TTL_MAGIC_LINK_SECONDS)
      const url = `${SITE_URL}/preferences?email=${encodeURIComponent(email)}&token=${token}`
      await sendEmail({
        to: email,
        subject: 'Your preferences link',
        previewText: 'A fresh link to manage your email preferences. Good for one hour.',
        html: `
          <p>Here is your link to manage your email preferences. It works for the next hour.</p>
          <p><a href="${url}" style="color:#c8973a;text-decoration:none">Open my preferences</a></p>
          <p>If you did not ask for this, you can ignore it. Nothing changes until you click.</p>
        `,
      })
      await supabase
        .from('preference_audit')
        .insert({ email, action: 'preference_link_sent', detail: {}, ip })
    }
  } catch (err) {
    console.error('request-link error:', err instanceof Error ? err.message : err)
  }

  return NextResponse.json({ ok: true })
}
