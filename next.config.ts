import type { NextConfig } from 'next'

// Content negotiation: when an AI agent requests text/markdown or text/plain,
// rewrite to the /markdown handler which returns clean markdown instead of HTML.
// Pattern: Vercel Feb 2026 — https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation
const markdownAcceptRegex =
  '(?=.*(?:text/plain|text/markdown))(?!.*text/html.*(?:text/plain|text/markdown)).*'

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
          // Content-Security-Policy requires per-site tuning for HubSpot and Luma.
          // Define and test before enabling.
          // RFC 8288 Link headers — point AI agents to structured resources
          {
            key: 'Link',
            value:
              '<https://lanebelone.com/llms.txt>; rel="ai-agent"; type="text/plain", <https://lanebelone.com/sitemap.xml>; rel="sitemap"; type="application/xml"',
          },
          {
            key: 'Content-Signal',
            value: 'ai-train=yes, search=yes, ai-input=yes',
          },
        ],
      },
    ]
  },
}

export default nextConfig
