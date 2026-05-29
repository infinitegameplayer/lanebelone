import { ImageResponse } from 'next/og'
import { getPostBySlug, CARRY_FORWARD_SLUGS } from '@/lib/blog'

export const alt = 'Lane Belone'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamicParams = false

export function generateStaticParams() {
  return CARRY_FORWARD_SLUGS.map(slug => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.title ?? 'Lane Belone'
  const eyebrow = post?.category || 'Writing'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0c1510 0%, #1a2820 50%, #0c1510 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: '#c9a84c',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 58,
            fontWeight: 700,
            color: '#e8e4d0',
            lineHeight: 1.15,
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            fontSize: 20,
            color: 'rgba(232, 228, 208, 0.55)',
            letterSpacing: '0.04em',
          }}
        >
          Lane Belone · lanebelone.com
        </div>
      </div>
    ),
    { ...size }
  )
}
