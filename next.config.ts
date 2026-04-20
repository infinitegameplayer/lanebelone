import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  turbopack: {},
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
        ],
      },
    ]
  },
}

export default nextConfig
