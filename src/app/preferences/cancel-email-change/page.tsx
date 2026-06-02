// Sovereign Email Preference Center, Phase 3. Cancel landing page.
// A bare GET renders a button and nothing else. The cancel runs only on the
// POST the button fires, so a scanner prefetch cannot cancel a change. noindex
// and no-referrer, under /preferences for the no-track gate. Mirror of the IGOS
// page.

import type { Metadata } from 'next'
import CancelEmailChangeClient from './CancelEmailChangeClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cancel email change',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default async function CancelEmailChangePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  const params = await searchParams
  const token = typeof params.t === 'string' ? params.t : ''

  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem 4rem',
        fontFamily: 'Georgia, serif',
        color: '#f5f0e8',
      }}
    >
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#f5f0e8' }}>
          Cancel the email change
        </h1>
        <CancelEmailChangeClient token={token} />
      </div>
    </main>
  )
}
