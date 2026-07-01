'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-[#081208]/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
          <Image
            src="/images/lane-belone-logo-white.png"
            alt="Lane Belone home"
            width={120}
            height={36}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/speaking"
            className={`nav-link${isActive('/speaking') ? ' active' : ''}`}
            aria-current={isActive('/speaking') ? 'page' : undefined}
          >
            Speaking
          </Link>
          <Link
            href="/about"
            className={`nav-link${isActive('/about') ? ' active' : ''}`}
            aria-current={isActive('/about') ? 'page' : undefined}
          >
            About
          </Link>
          <Link
            href="/joyful-sovereignty"
            className={`nav-link${isActive('/joyful-sovereignty') ? ' active' : ''}`}
            aria-current={isActive('/joyful-sovereignty') ? 'page' : undefined}
          >
            Joyful Sovereignty
          </Link>
          <Link
            href="/blog"
            className={`nav-link${isActive('/blog') ? ' active' : ''}`}
            aria-current={isActive('/blog') ? 'page' : undefined}
          >
            Writing
          </Link>
          <Link
            href="/library"
            className={`nav-link${isActive('/library') ? ' active' : ''}`}
            aria-current={isActive('/library') ? 'page' : undefined}
          >
            Library
          </Link>
          <a
            href="#connect"
            className="btn-ghost text-parchment/60 hover:text-parchment"
          >
            Connect
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ minWidth: '44px', minHeight: '44px', justifyContent: 'center', alignItems: 'center' }}
        >
          <span className={`block w-6 h-px bg-parchment/80 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-parchment/80 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-parchment/80 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {[
            { href: '/speaking', label: 'Speaking', external: false },
            { href: '/about', label: 'About', external: false },
            { href: '/joyful-sovereignty', label: 'Joyful Sovereignty', external: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base text-parchment/80 hover:text-parchment transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              style={{
                fontFamily: 'var(--font-body)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '12px',
                borderLeft: isActive(item.href) ? '2px solid var(--color-accent-hover)' : '2px solid transparent',
                color: isActive(item.href) ? '#f5f0e8' : undefined,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/blog"
            className="text-base text-parchment/80 hover:text-parchment transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-current={isActive('/blog') ? 'page' : undefined}
            style={{
              fontFamily: 'var(--font-body)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              borderLeft: isActive('/blog') ? '2px solid var(--color-accent-hover)' : '2px solid transparent',
              color: isActive('/blog') ? '#f5f0e8' : undefined,
            }}
          >
            Writing
          </Link>
          <Link
            href="/library"
            className="text-base text-parchment/80 hover:text-parchment transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-current={isActive('/library') ? 'page' : undefined}
            style={{
              fontFamily: 'var(--font-body)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              borderLeft: isActive('/library') ? '2px solid var(--color-accent-hover)' : '2px solid transparent',
              color: isActive('/library') ? '#f5f0e8' : undefined,
            }}
          >
            Library
          </Link>
          <a
            href="#connect"
            className="text-base text-parchment/60 hover:text-parchment transition-colors"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-body)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '12px',
              borderLeft: '2px solid transparent',
            }}
          >
            Connect
          </a>
        </div>
      )}
    </header>
  )
}
