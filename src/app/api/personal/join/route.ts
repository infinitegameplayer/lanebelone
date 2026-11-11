// The one-click join to Personal notes from an email link (/personal/join), the
// letters map's Personal line (PendingPlan - The Letters Map and Welcome Back,
// step 1). Mirror of /api/articles/join under Email Codex Section 12.
//
// mode 'auto' is the page acting by itself once a person is plainly there
// (auto-action-gate.ts). It acts only when BotID vouches for the visitor and the
// address is already a Kingdom contact; anything else answers needsTap and the
// page shows its button. mode 'tap' is the button: the ordinary BotID check.
//
// A valid ?token= is proof the person asked, so an address that left every list
// rejoins directly. Without one, an address that left gets the "Want back in?"
// email instead of a silent re-add, and a tap for an address the Kingdom has
// never seen adds nothing.

import { NextRequest, NextResponse } from 'next/server'
import { botVerdict, refuseBots } from '@/lib/bot-guard'
import { autoJoinAllowed, cleanGateReport } from '@/lib/auto-action-gate'
import { verifyEmailToken } from '@/lib/unsubscribe-token'
import { getSupabaseAdmin } from '@/lib/supabase'
import { applyNewsletterOptIn } from '@/lib/newsletter'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function findContact(email: string): Promise<{ unsubscribed: boolean | null } | null> {
  const { data, error } = await getSupabaseAdmin()
    .from('contacts')
    .select('unsubscribed')
    .eq('email', email)
    .maybeSingle()
  return error ? null : data
}

export async function POST(req: NextRequest) {
  let body: { email?: unknown; token?: unknown; mode?: unknown; gate?: unknown }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  const token = typeof body.token === 'string' ? body.token.trim() : ''
  const tokenValid = token ? verifyEmailToken(email, token) : false
  if (token && !tokenValid) {
    return NextResponse.json({ ok: false, status: 'invalid' }, { status: 400 })
  }

  const auto = body.mode === 'auto'
  if (auto) {
    const verdict = await botVerdict({ route: '/api/personal/join' })
    const contact = verdict === 'human' ? await findContact(email) : null
    const allowed = autoJoinAllowed(verdict, contact)
    console.log(`auto-join ${JSON.stringify({ route: '/api/personal/join', verdict, known: contact !== null, allowed, gate: cleanGateReport(body.gate) })}`)
    if (!allowed) return NextResponse.json({ ok: true, needsTap: true }, { status: 200 })
  } else {
    const blocked = await refuseBots({ route: '/api/personal/join' })
    if (blocked) return blocked
    if (!tokenValid && !(await findContact(email))) {
      return NextResponse.json({ ok: true, status: 'unknown' }, { status: 200 })
    }
  }

  const result = await applyNewsletterOptIn({
    email,
    source: auto ? 'one-click:personal-join' : 'one-click:personal-join-tap',
    verified: tokenValid,
  })
  if (result.status === 'error') {
    return NextResponse.json({ error: 'Something went wrong. Try again in a moment.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, status: result.status }, { status: 200 })
}
