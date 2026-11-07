// The old one-click "join the articles list" link, now a redirect that writes
// nothing (2026-11-07, Email Codex Section 12).
//
// This GET used to subscribe on open, so any mail scanner that followed the
// link joined the reader without them knowing. Every letter, nurture email and
// Side Quest HQ template that ever carried it still points here, so the route
// stays and hands the address (and token, when the link carried one) to the
// join page, /articles/join. That page joins a person once they are plainly on
// it, behind BotID, and shows a one-tap button otherwise. Every link already in
// an inbox became scanner-safe the day this shipped.

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const target = new URL('/articles/join', req.url)
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  if (email) target.searchParams.set('email', email)
  if (token) target.searchParams.set('token', token)
  return NextResponse.redirect(target, 307)
}
