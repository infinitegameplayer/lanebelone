// The one-click join to the articles list, from the email letters and the
// Personal nurture: /articles/join?email=...(&token=...). It replaced the old
// GET route that subscribed on open, which now redirects here, so every link
// already in an inbox became scanner-safe (2026-11-07, Email Codex Section 12).
//
// The server reads whether the address is already on the list and writes
// nothing. A reader already on it is told so. Everyone else meets JoinClient,
// which joins them with no button once a person is plainly on the page, and
// shows its one-tap button whenever it cannot tell.

import type { Metadata } from 'next'
import Link from 'next/link'
import { getContactMembership } from '@/lib/email-lists'
import { verifyEmailToken } from '@/lib/unsubscribe-token'
import JoinClient from './JoinClient'
import { lead, Shell } from './shell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Get the writing by email',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ARTICLE_TAG = 'article_subscriber'

export default async function ArticlesJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[]; token?: string | string[] }>
}) {
  const params = await searchParams
  // An address never holds a space, so a space here is a "+" the query string
  // decoded (name+tag@example.com arriving unencoded from the email link).
  const raw = typeof params.email === 'string' ? params.email.trim().toLowerCase().replace(/ /g, '+') : ''
  const email = raw.length <= 254 && EMAIL_REGEX.test(raw) ? raw : ''
  const token = typeof params.token === 'string' ? params.token.trim() : ''

  if (!email || (token && !verifyEmailToken(email, token))) {
    return (
      <Shell heading="This link did not work">
        <p style={lead}>
          You can get every new piece by email from the bottom of any{' '}
          <Link href="/blog" style={{ color: '#d4a040' }}>article</Link>.
        </p>
      </Shell>
    )
  }

  // getContactMembership returns the empty "never seen" shape on any read
  // error, so a database hiccup shows the join rather than breaking the page.
  const m = await getContactMembership(email)
  if (m.exists && !m.unsubscribed && m.tags.includes(ARTICLE_TAG)) {
    return (
      <Shell heading="You're already on the list">
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>
          New writing lands in your inbox as it publishes. Meanwhile, the{' '}
          <Link href="/blog" style={{ color: '#d4a040' }}>latest pieces</Link> are here.
        </p>
      </Shell>
    )
  }

  return (
    <Shell heading="Get the writing by email">
      <JoinClient email={email} token={token} />
    </Shell>
  )
}
