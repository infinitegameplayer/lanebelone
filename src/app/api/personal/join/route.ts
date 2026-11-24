// The one-click join to Personal notes from an email link (/personal/join), the
// letters map's Personal line (PendingPlan - The Letters Map and Welcome Back,
// step 1). Mirror of /api/articles/join under Email Codex Section 12.
//
// Acts only on a person's press of the page's button (press-only.ts): an
// automatic request changes nothing. The press passes the ordinary BotID check.
//
// A valid ?token= is proof the person asked, so an address that left every list
// rejoins directly. Without one, an address that left gets the "Want back in?"
// email instead of a silent re-add, and a tap for an address the Kingdom has
// never seen adds nothing.

import { NextRequest, NextResponse } from 'next/server'
import { refuseBots } from '@/lib/bot-guard'
import { refuseAutomatic } from '@/lib/press-only'
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
  let body: { email?: unknown; token?: unknown; mode?: unknown }
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

  const refused = refuseAutomatic('/api/personal/join', body.mode)
  if (refused) return refused
  const blocked = await refuseBots({ route: '/api/personal/join' })
  if (blocked) return blocked
  if (!tokenValid && !(await findContact(email))) {
    return NextResponse.json({ ok: true, status: 'unknown' }, { status: 200 })
  }

  const result = await applyNewsletterOptIn({
    email,
    source: 'one-click:personal-join-tap',
    verified: tokenValid,
  })
  if (result.status === 'error') {
    return NextResponse.json({ error: 'Something went wrong. Try again in a moment.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, status: result.status }, { status: 200 })
}
