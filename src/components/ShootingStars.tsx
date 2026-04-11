'use client'
import { useEffect, useRef } from 'react'

// durationSec: target time in seconds for a star to cross the full viewport width.
// Speed is computed per-fire from viewport width so the crossing time stays consistent
// on any screen size — desktop and mobile alike.
const STARS = [
  { delay: 2000,  angle: 28, rtl: false, durationSec: 2.8, color: '201,168,76',  maxOpacity: 0.68, tailLength: 180, lineWidth: 1.3 },
  { delay: 16000, angle: 15, rtl: true,  durationSec: 3.5, color: '240,208,128', maxOpacity: 0.42, tailLength: 240, lineWidth: 1.0 },
  { delay: 30000, angle: 42, rtl: false, durationSec: 2.4, color: '220,185,95',  maxOpacity: 0.80, tailLength: 150, lineWidth: 1.6 },
  { delay: 46000, angle: 32, rtl: true,  durationSec: 3.0, color: '201,168,76',  maxOpacity: 0.52, tailLength: 200, lineWidth: 1.1 },
]

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let rafId: number
    let startTime: number | null = null
    let finished = false

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    type StarState = typeof STARS[0] & { speed: number; x: number; y: number; vx: number; vy: number; traveled: number; totalDist: number; opacity: number; phase: 'waiting' | 'flying' | 'done' }
    const state: StarState[] = STARS.map(s => ({ ...s, speed: 0, x: 0, y: 0, vx: 0, vy: 0, traveled: 0, totalDist: 0, opacity: 0, phase: 'waiting' }))

    function fire(s: StarState) {
      const rad = (s.angle * Math.PI) / 180
      s.totalDist = (window.innerWidth / (Math.abs(Math.cos(rad)) || 0.1)) + s.tailLength * 2
      s.speed = s.totalDist / (s.durationSec * 60)
      s.vx = (s.rtl ? -1 : 1) * Math.cos(rad) * s.speed
      s.vy = Math.sin(rad) * s.speed
      s.x = s.rtl ? window.innerWidth + s.tailLength : -s.tailLength
      s.y = window.innerHeight * (0.05 + Math.random() * 0.40)
      s.traveled = 0; s.opacity = 0; s.phase = 'flying'
    }

    function draw(s: StarState) {
      const alpha = s.opacity * s.maxOpacity
      if (alpha < 0.005) return
      const tx = s.x - s.vx * (s.tailLength / s.speed)
      const ty = s.y - s.vy * (s.tailLength / s.speed)
      const g = ctx.createLinearGradient(tx, ty, s.x, s.y)
      g.addColorStop(0,    `rgba(${s.color},0)`)
      g.addColorStop(0.55, `rgba(${s.color},${alpha * 0.35})`)
      g.addColorStop(1,    `rgba(${s.color},${alpha})`)
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y)
      ctx.strokeStyle = g; ctx.lineWidth = s.lineWidth; ctx.lineCap = 'round'; ctx.stroke()
      const r = s.lineWidth * 4
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r)
      glow.addColorStop(0, `rgba(${s.color},${alpha})`)
      glow.addColorStop(1, `rgba(${s.color},0)`)
      ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill()
    }

    let prevTs: number | null = null

    function tick(ts: number) {
      if (!startTime) startTime = ts
      if (finished) return
      const dt = Math.min(prevTs !== null ? ts - prevTs : 1000 / 60, 50)
      prevTs = ts
      const scale = dt / (1000 / 60)
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      let allDone = true
      for (const s of state) {
        if (s.phase === 'waiting') {
          if (ts - startTime! >= s.delay) fire(s); else { allDone = false; continue }
        }
        if (s.phase === 'flying') {
          allDone = false
          s.x += s.vx * scale; s.y += s.vy * scale; s.traveled += s.speed * scale
          const p = s.traveled / s.totalDist
          s.opacity = p < 0.05 ? p / 0.05 : p > 0.80 ? (1 - p) / 0.20 : 1
          if (s.traveled >= s.totalDist) { s.phase = 'done'; s.opacity = 0 }
          draw(s)
        }
      }
      if (allDone) { finished = true; return }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}
    />
  )
}
