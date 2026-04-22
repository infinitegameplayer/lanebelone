'use client'

export default function AmbientPulse() {
  return (
    <>
      {/* Green pulse — upper left (forest accent) */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: '-15%',
          left: '-8%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58, 112, 66, 0.14) 0%, rgba(201, 168, 76, 0.03) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'ambientPulse 14s ease-in-out infinite',
        }}
      />
      {/* Gold pulse — lower right, offset */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          bottom: '-10%',
          right: '-8%',
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'ambientPulse 18s ease-in-out infinite',
          animationDelay: '-7s',
        }}
      />
    </>
  )
}
