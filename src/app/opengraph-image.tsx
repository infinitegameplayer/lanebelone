import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Lane Belone'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          Lane Belone
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: '#e8e4d0',
            lineHeight: 1.15,
            maxWidth: '20ch',
            marginBottom: 32,
          }}
        >
          Writer, speaker and guide.
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(232, 228, 208, 0.65)',
            lineHeight: 1.5,
            maxWidth: '50ch',
          }}
        >
          Exploring the infinite game and sharing breadcrumbs along the way.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            fontSize: 18,
            color: 'rgba(232, 228, 208, 0.45)',
          }}
        >
          lanebelone.com
        </div>
      </div>
    ),
    { ...size }
  )
}
