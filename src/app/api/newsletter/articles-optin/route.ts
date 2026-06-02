// One-click "join the articles list" GET handler.
//
// Security tradeoff note: the broadcast link sent to Personal-list contacts
// uses ?email={{{EMAIL}}} with no HMAC token. The existence guard below
// bounds abuse: if no matching contact exists in Supabase, the request is
// rejected without creating anything. This limits abuse to already-known
// contacts whose emails appear in Personal-list broadcasts.
// An optional ?token= parameter allows fully verified opt-ins (e.g. from
// transactional surfaces that can mint an HMAC token). When token is present
// and invalid, the request is rejected regardless of contact existence.

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyEmailToken } from '@/lib/unsubscribe-token'
import { applyArticleOptIn } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const rawEmail = searchParams.get('email') ?? ''
  const token = searchParams.get('token') ?? ''

  const email = rawEmail.trim().toLowerCase()

  if (!email) {
    return NextResponse.redirect(new URL('/articles-subscribed?status=invalid', req.url))
  }

  // If a token was supplied, it must be valid.
  if (token) {
    if (!verifyEmailToken(email, token)) {
      return NextResponse.redirect(new URL('/articles-subscribed?status=invalid', req.url))
    }
  }

  // Look up the contact. If none exists and no valid token was supplied,
  // reject without creating anything (prevents arbitrary opt-ins via the
  // tokenless broadcast link).
  const supabase = getSupabaseAdmin()
  const { data: existing } = await supabase
    .from('contacts')
    .select('id, tags, first_name, last_name, unsubscribed')
    .eq('email', email)
    .maybeSingle()

  if (!existing && !token) {
    return NextResponse.redirect(new URL('/articles-subscribed?status=unknown', req.url))
  }

  await applyArticleOptIn({
    email,
    source: 'one-click:personal-email',
  })

  return NextResponse.redirect(new URL('/articles-subscribed', req.url))
}
