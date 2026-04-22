'use client'

import { useEffect, useRef } from 'react'

interface CursorParallaxProps {
  containerRef: React.RefObject<HTMLElement | null>
}

export default function CursorParallax({ containerRef }: CursorParallaxProps) {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const glow = glowRef.current
    if (!container || !glow) return

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      glow.style.left = `${e.clientX - rect.left}px`
      glow.style.top = `${e.clientY - rect.top}px`
      glow.style.opacity = '1'
    }

    const handleLeave = () => {
      glow.style.opacity = '0'
    }

    container.addEventListener('mousemove', handleMove)
    container.addEventListener('mouseleave', handleLeave)

    return () => {
      container.removeEventListener('mousemove', handleMove)
      container.removeEventListener('mouseleave', handleLeave)
    }
  }, [containerRef])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58, 112, 66, 0.08) 0%, rgba(201, 168, 76, 0.02) 40%, transparent 60%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}
