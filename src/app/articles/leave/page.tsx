// "Not you? One click to undo." from the articles welcome email lands here:
// /articles/leave?email=...&token=... The server checks the signed token and
// whether the address is on the list, and writes nothing. LeaveClient takes the
// address off the list once a person is plainly on the page, or shows its
// button when it cannot tell (the scanner-proof one-click, 2026-11-07).

import type { Metadata } from 'next'
import Link from 'next/link'
import { getContactMembership } from '@/lib/email-lists'
import { verifyAnyToken } from '@/lib/unsubscribe-token'
import LeaveClient from './LeaveClient'
import { lead, Shell } from '../join/shell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Stop the writing by email',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

const ARTICLE_TAG = 'article_subscriber'

export default async function ArticlesLeavePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[]; token?: string | string[] }>
}) {
  const params = await searchParams
  // A "+" in an address can arrive decoded as a space, as on the join page.
  const email = typeof params.email === 'string' ? params.email.trim().toLowerCase().replace(/ /g, '+') : ''
  const token = typeof params.token === 'string' ? params.token.trim() : ''

  if (!email || !token || email.length > 254 || !verifyAnyToken(email, token)) {
    return (
      <Shell heading="This link did not work">
        <p style={lead}>
          To change what you receive, use Manage preferences at the bottom of any email, or reply to it and it will be handled by hand.
        </p>
      </Shell>
    )
  }

  const m = await getContactMembership(email)
  const onList = m.exists && !m.unsubscribed && m.tags.includes(ARTICLE_TAG)

  return (
    <Shell heading="Stop the writing by email">
      {onList ? (
        <LeaveClient email={email} token={token} />
      ) : (
        <>
          <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
          <p style={lead}>
            This address is not on the articles list, so there is nothing to undo. The{' '}
            <Link href="/blog" style={{ color: '#d4a040' }}>writing</Link> is still here to read.
          </p>
        </>
      )}
    </Shell>
  )
}
