'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CursorParallax from '@/components/CursorParallax'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={heroRef}
      className="grain-overlay relative min-h-screen overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 65% -10%, #1d3a1e 0%, #081208 55%)' }}
    >
      <CursorParallax containerRef={heroRef} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full pt-28 pb-20 md:pt-0 md:pb-0">
          <div className="flex flex-col gap-6">
            <h1
              className="hero-line hero-line-1 text-5xl md:text-7xl leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.025em' }}
            >
              Lane Belone
            </h1>
            <p
              className="hero-line hero-line-2 text-lg md:text-xl leading-relaxed max-w-md"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}
            >
              Exploring the Infinite Game. Writing, speaking and sharing breadcrumbs along the way.
            </p>
            <div className="hero-line hero-line-3 flex flex-wrap gap-4">
              <Link href="/joyful-sovereignty" className="btn-gold">
                Explore Joyful Sovereignty
              </Link>
              <a href="#connect" className="btn-outline">
                Connect
              </a>
            </div>
          </div>
          <div className="hero-line hero-line-4 relative h-[420px] md:h-[580px] rounded-[8px] overflow-hidden order-first md:order-last">
            <Image
              src="/images/lane-machu-picchu-square.webp"
              alt="Lane Belone"
              fill
              quality={100}
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
