import type { NextConfig } from 'next'

// Content negotiation: when an AI agent requests text/markdown or text/plain,
// rewrite to the /markdown handler which returns clean markdown instead of HTML.
// Pattern: Vercel Feb 2026 — https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation
const markdownAcceptRegex =
  '(?=.*(?:text/plain|text/markdown))(?!.*text/html.*(?:text/plain|text/markdown)).*'

// CSP allowlist origins. Analytics hosts read from env at build time so changing
// the env var updates the policy without a code edit. Empty values are filtered
// out of the source lists. PostHog lazy-loads its session recorder from the assets
// host, so that origin is explicit. Fonts are self-hosted via @fontsource (served
// from 'self'), so no external font origin is needed. Cal.com appears only as
// outbound links in article bodies, not an on-page embed, so it needs no origin.
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
const POSTHOG_ASSETS = 'https://us-assets.i.posthog.com'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  turbopack: {},
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          destination: '/markdown/:path*',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: markdownAcceptRegex,
            },
          ],
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // CSP tuned to lanebelone's client-side third parties: PostHog
            // (analytics + session recording) and Umami (env-sourced analytics).
            // unsafe-inline on script-src is required for Next.js hydration and the
            // JSON-LD blocks in the document head. worker-src blob: is required by
            // PostHog session recording. Fonts are self-hosted (@fontsource), so
            // font-src needs no external origin. HubSpot and Luma are fully removed.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src ${["'self'", "'unsafe-inline'", POSTHOG_HOST, POSTHOG_ASSETS, UMAMI_URL].filter(Boolean).join(' ')}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              `connect-src ${["'self'", POSTHOG_HOST, POSTHOG_ASSETS, UMAMI_URL].filter(Boolean).join(' ')}`,
              "worker-src 'self' blob:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; '),
          },
          // RFC 8288 Link headers — point AI agents to structured resources
          {
            key: 'Link',
            value:
              '<https://www.lanebelone.com/llms.txt>; rel="ai-agent"; type="text/plain", <https://www.lanebelone.com/sitemap.xml>; rel="sitemap"; type="application/xml"',
          },
          {
            key: 'Content-Signal',
            value: 'ai-train=yes, search=yes, ai-input=yes',
          },
          // Vary: Accept — required because /markdown rewrite is content-negotiated.
          // Prevents CDN cache poisoning between text/html and text/markdown responses.
          { key: 'Vary', value: 'Accept' },
        ],
      },
    ]
  },
}

export default nextConfig
