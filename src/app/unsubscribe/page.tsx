// Unsubscribe confirmation page. Reads email + token from query string and
// POSTs to /api/unsubscribe. Shows the result inline. Linked from the
// manual unsubscribe footer in the welcome email and from any future
// transactional surface that needs a manual unsubscribe link.

import UnsubscribeClient from './UnsubscribeClient'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>
}) {
  const params = await searchParams
  const email = typeof params.email === 'string' ? params.email : ''
  const token = typeof params.token === 'string' ? params.token : ''

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
        <UnsubscribeClient email={email} token={token} />
      </div>
    </main>
  )
}
