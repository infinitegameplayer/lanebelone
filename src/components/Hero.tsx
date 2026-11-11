'use client'

import { useRef } from 'react'
import { preload } from 'react-dom'
import Link from 'next/link'
import CursorParallax from '@/components/CursorParallax'

// Homepage Depth Touches (King-ruled 2026-11-10). Desktop: Colorado gold full
// width, its own sky kept, under a drawn forest dawn. Phones: Lane at Lobuche,
// his face held near a quarter of the way down. The picture is in the server
// HTML with a preload, so nothing of an older hero paints first. The old
// portrait column is gone from the markup. Layout and motion live in
// globals.css under "Homepage hero".
const PHONE = '(max-width: 760px)'
const DESKTOP = '(min-width: 761px)'
const HERO = {
  desktop: '/images/home/hero-colorado',
  phone: '/images/home/hero-lobuche',
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  // AVIF is the file every current browser takes; one preload per screen size.
  preload(`${HERO.desktop}.avif`, { as: 'image', type: 'image/avif', media: DESKTOP, fetchPriority: 'high' })
  preload(`${HERO.phone}.avif`, { as: 'image', type: 'image/avif', media: PHONE, fetchPriority: 'high' })

  return (
    <section
      ref={heroRef}
      className="home-hero grain-overlay"
      style={{ background: 'radial-gradient(ellipse at 65% -10%, #1d3a1e 0%, #081208 55%)' }}
    >
      <div className="home-hero-stage">
        <div className="home-hero-sky" />
        <picture className="home-hero-land">
          <source media={PHONE} type="image/avif" srcSet={`${HERO.phone}.avif`} />
          <source media={PHONE} type="image/webp" srcSet={`${HERO.phone}.webp`} />
          <source type="image/avif" srcSet={`${HERO.desktop}.avif`} />
          <img src={`${HERO.desktop}.webp`} alt="" fetchPriority="high" decoding="async" />
        </picture>
        <div className="home-hero-scrim" />
        <CursorParallax containerRef={heroRef} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 min-h-screen flex items-center">
          {/* Two columns on desktop with the words in the first: the photo now
              fills the whole hero, so the right column stays open over it. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full pt-28 pb-20 md:pt-0 md:pb-0">
            <div className="home-hero-words flex flex-col gap-6">
              <h1
                className="hero-line hero-line-1 text-5xl md:text-7xl leading-tight md:leading-none"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.025em' }}
              >
                Lane Belone
              </h1>
              <p
                className="hero-line hero-line-2 text-lg md:text-xl leading-relaxed md:leading-7 max-w-md"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
              >
                Exploring the Infinite Game. Writing, speaking and sharing breadcrumbs along the way.
              </p>
              <div className="hero-line hero-line-3 flex flex-wrap gap-4">
                <Link href="/joyful-sovereignty" className="btn-gold">
                  Explore Joyful Sovereignty
                </Link>
                <a href="#connect" className="btn-outline home-hero-connect">
                  Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
