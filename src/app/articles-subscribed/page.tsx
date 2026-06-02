import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "You're on the list",
  robots: { index: false, follow: false },
}

export default async function ArticlesSubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const status = typeof params.status === 'string' ? params.status : ''

  let heading = "You're on the list."
  let body = 'New writing will land in your inbox, the whole piece, with a breadcrumb at the bottom. Glad you\'re in.'

  if (status === 'unknown') {
    heading = 'Hmm, we hit a snag.'
    body = "We could not find that email. You can subscribe from any article page."
  } else if (status === 'invalid') {
    heading = 'Something went wrong.'
    body = "That link did not check out. You can subscribe from any article page."
  }

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
        <h1
          style={{
            fontSize: '1.75rem',
            marginBottom: '1rem',
            color: '#f5f0e8',
            fontFamily: 'var(--font-display)',
          }}
        >
          {heading}
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          {body}
        </p>
        <Link
          href="/blog"
          style={{
            color: '#c9a84c',
            fontSize: '0.9rem',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Back to the writing
        </Link>
      </div>
    </main>
  )
}
