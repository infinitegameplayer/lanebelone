import { NextResponse, type NextRequest } from 'next/server'
import { buildCsp } from '@/lib/csp'

// Nonce CSP for the pages that already render on every request (each one is
// force-dynamic). Next reads the nonce out of the request's CSP header and
// stamps it on its own inline and framework scripts. The scripts those load
// (Next chunks, BotID's challenge script, Umami, the PostHog recorder) come
// from 'self' or the listed hosts. No 'strict-dynamic': it would trust any
// script created through the DOM, inline ones included. The prerendered pages
// are not matched here: they carry hashes from next.config.ts and stay static.
// Development adds 'unsafe-eval' because React rebuilds server error stacks
// with eval there.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const csp = buildCsp([
    `'nonce-${nonce}'`,
    ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : []),
  ])

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Content-Security-Policy', csp)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  matcher: ['/preferences', '/preferences/:path*', '/unsubscribe', '/articles-subscribed'],
}
