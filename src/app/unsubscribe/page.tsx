// The footer unsubscribe link lands here: /unsubscribe?email=...&token=...
// Linked from the welcome emails, the Personal and Side Quest letters and any
// transactional surface that needs a manual unsubscribe link. Opening the page
// writes nothing. The server checks the signed token and whether the address
// has already left, and UnsubscribeClient takes it off every list once a person
// is plainly on the page, or shows one button when it cannot tell (Email Codex
// Section 12, the scanner-proof gate, 2026-11-07).

import { getContactMembership } from '@/lib/email-lists'
import { verifyEmailToken } from '@/lib/unsubscribe-token'
import UnsubscribeClient, { type LinkState } from './UnsubscribeClient'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[]; token?: string | string[] }>
}) {
  const params = await searchParams
  // A "+" in an address can arrive decoded as a space, as on the join page.
  const email = typeof params.email === 'string' ? params.email.trim().toLowerCase().replace(/ /g, '+') : ''
  const token = typeof params.token === 'string' ? params.token.trim() : ''

  let state: LinkState = 'ready'
  if (!email || !token || email.length > 254) state = 'missing'
  else if (!verifyEmailToken(email, token)) state = 'invalid'
  else if ((await getContactMembership(email)).unsubscribed) state = 'already'

  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        fontFamily: 'Georgia, serif',
        color: '#f5f0e8',
      }}
    >
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f5f0e8' }}>Unsubscribe</h1>
        <UnsubscribeClient email={email} token={token} state={state} />
      </div>
    </main>
  )
}
