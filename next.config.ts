import fs from 'node:fs'
import type { NextConfig } from 'next'
import { buildCsp, hashSources, UNSAFE_INLINE_CSP } from './src/lib/csp'

// Content negotiation: when an AI agent requests text/markdown or text/plain,
// rewrite to the /markdown handler which returns clean markdown instead of HTML.
// Pattern: Vercel Feb 2026 — https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation
const markdownAcceptRegex =
  '(?=.*(?:text/plain|text/markdown))(?!.*text/html.*(?:text/plain|text/markdown)).*'

// CSP. The prerendered pages each get a policy listing the SHA-256 of their own
// inline scripts (Next hydration and the Turbopack runtime), read from the
// manifest scripts/build-with-csp.mjs writes between its two build passes. The
// catch-all keeps the 404 and global error hashes for paths with no page of
// their own. Server-rendered pages get a nonce policy from src/proxy.ts, which
// replaces this header there. Without a manifest (next dev, or a plain
// `next build`) every path falls back to the 'unsafe-inline' policy.
type CspHashes = { fallback: string[]; pages: Record<string, string[]> }
const cspHashes: CspHashes | null = process.env.CSP_HASH_MANIFEST
  ? JSON.parse(fs.readFileSync(process.env.CSP_HASH_MANIFEST, 'utf8'))
  : null
const pageCsp = (hashes: string[]) =>
  buildCsp(hashSources([...new Set([...hashes, ...(cspHashes?.fallback ?? [])])]))

const nextConfig: NextConfig = {
  // Both CSP build passes share one build ID so their pages are byte-identical.
  // null keeps Next's own random ID for any other build.
  generateBuildId: async () => process.env.CSP_BUILD_ID ?? null,
  images: {
    formats: ['image/webp'],
  },
  turbopack: {},
  async redirects() {
    return [
      // The project's own vercel.app host served the whole site as a duplicate
      // (Brand Audit Sitting A, 2026-09-25). Exact host only, so preview
      // deployment URLs still answer. 308, path kept.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lanebelone.vercel.app' }],
        destination: 'https://www.lanebelone.com/:path*',
        permanent: true,
      },
      // The two policy paths the rest of the web assumes. Search Console
      // reported both as 404s, /privacy-policy crawled as recently as
      // 2026-07-23. The site serves /privacy and /terms, so the long forms
      // redirect rather than dead-end.
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      // Legacy blog URL structure. Posts lived at /f/:slug before the move to
      // /blog/f/:slug, and inbound links from the old platform era still point
      // there. Bing Site Scan 2026-07-29 reported 11 pages affected by 4xx on
      // this site; every one traced to a /f/ link. The internal links were
      // repointed in the same pass, so this rule exists for external inbound
      // traffic, which no content edit can reach.
      { source: '/f/:slug', destination: '/blog/f/:slug', permanent: true },
      // The podcast page from the GoDaddy site builder years. Brave's index still serves it (2026-09-28)
      // and it ended in a 404. The show is no longer hosted, so the King sent
      // it to /about, where the work it belonged to is told.
      { source: '/podcast', destination: '/about', permanent: true },
    ]
  },
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHashes ? pageCsp([]) : UNSAFE_INLINE_CSP,
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
          // Content-Usage mirrors Content-Signal in the converging IETF aipref vocabulary
          // (draft-ietf-aipref-attach / vocab-06). Early-align insurance, draft not yet ratified.
          // train-ai and search are the two standardized tokens. ai-input has no standard equivalent yet.
          {
            key: 'Content-Usage',
            // ai-use (draft-ietf-aipref-vocab-08) covers use in AI answers, the same
            // permission Content-Signal states as ai-input=yes. King-ruled 2026-09-28.
            value: 'train-ai=y, ai-use=y, search=y',
          },
          // Vary: Accept — required because /markdown rewrite is content-negotiated.
          // Prevents CDN cache poisoning between text/html and text/markdown responses.
          { key: 'Vary', value: 'Accept' },
        ],
      },
      // Per-page hash CSP. Listed after the catch-all so it replaces that value.
      ...Object.entries(cspHashes?.pages ?? {}).map(([source, hashes]) => ({
        source,
        headers: [{ key: 'Content-Security-Policy', value: pageCsp(hashes) }],
      })),
      // Referrer-Policy is split out of the global block. The /preferences URL
      // carries the subscriber email and a live token, so that route family must
      // leak no referrer even on a same-origin click. Every other path keeps the
      // site default. The two sources are mutually exclusive, so exactly one
      // Referrer-Policy header lands per path (Next emits every matching source).
      {
        source: '/((?!preferences).*)',
        headers: [{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }],
      },
      {
        source: '/preferences',
        headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }],
      },
      {
        source: '/preferences/:path*',
        headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }],
      },
    ]
  },
}

export default nextConfig
