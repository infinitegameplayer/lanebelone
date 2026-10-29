// Content-Security-Policy for lanebelone.com. One builder, two callers:
// next.config.ts sends it on the prerendered pages with a SHA-256 hash for each
// inline script (scripts/csp-hashes.mjs reads them out of the built HTML), and
// src/proxy.ts sends it on the server-rendered pages with a fresh nonce per
// request. Only script-src differs between the two. Every other directive is
// the same everywhere.
//
// Analytics hosts read from env at build time so changing the env var updates
// the policy without a code edit. Empty values are filtered out of the source
// lists. PostHog lazy-loads its session recorder from the assets host, so that
// origin is explicit. worker-src blob: is required by PostHog session
// recording. Fonts are self-hosted via @fontsource (served from 'self'), so no
// external font origin is needed. Cal.com appears only as outbound links in
// article bodies, not an on-page embed, so it needs no origin. The one embed
// the content carries is a Vimeo player, so frame-src names its origin;
// without frame-src, frames fall back to default-src 'self' and the player is
// refused. csp.test.ts reads every iframe out of src/content and fails on a
// host this policy does not allow, so the list stays true. JSON-LD blocks
// are data, not script, so CSP never blocks them and they need no hash.
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
const POSTHOG_ASSETS = 'https://us-assets.i.posthog.com'

export function buildCsp(scriptSources: string[]): string {
  return [
    "default-src 'self'",
    `script-src ${["'self'", ...scriptSources, POSTHOG_HOST, POSTHOG_ASSETS, UMAMI_URL].filter(Boolean).join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    `connect-src ${["'self'", POSTHOG_HOST, POSTHOG_ASSETS, UMAMI_URL].filter(Boolean).join(' ')}`,
    "worker-src 'self' blob:",
    "frame-src 'self' https://player.vimeo.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join('; ')
}

// The policy before hashes existed. It still serves `next dev` and any build
// that skipped the hash pass (a plain `next build`), where no manifest exists.
export const UNSAFE_INLINE_CSP = buildCsp(["'unsafe-inline'"])

export const hashSources = (hashes: string[]) => hashes.map((h) => `'sha256-${h}'`)
