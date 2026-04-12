import Link from 'next/link'
import Image from 'next/image'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/increasefreedom/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lanebelone/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/increasefreedom',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Substack',
    href: 'https://lanebelone.substack.com/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 5H2v3h20V5zM2 10v9l10-5.5L22 19v-9H2zm0-8h20v2H2V2z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="opacity-70 hover:opacity-100 transition-opacity">
            <Image
              src="/images/lane-belone-logo-white.png"
              alt="Lane Belone"
              width={100}
              height={30}
              className="h-6 w-auto"
            />
          </Link>
          <p className="text-xs text-parchment/30" style={{ fontFamily: 'var(--font-body)' }}>
            &copy; 2026 Lane Belone
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm text-parchment/50" style={{ fontFamily: 'var(--font-body)' }}>
          <Link href="/speaking" className="hover:text-parchment/80 transition-colors">Speaking</Link>
          <Link href="/about" className="hover:text-parchment/80 transition-colors">About</Link>
          <Link href="/joyful-sovereignty" className="hover:text-parchment/80 transition-colors">Joyful Sovereignty</Link>
          <a href="https://lanebelone.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-parchment/80 transition-colors">Writing</a>
          <Link href="/blog" className="hover:text-parchment/80 transition-colors">Blog</Link>
          <a href="https://infinitegameos.io" target="_blank" rel="noopener noreferrer" className="hover:text-parchment/80 transition-colors">Infinite Game OS</a>
          <a href="https://github.com/InfiniteGamePlayer/sovereign-ecosystem" target="_blank" rel="noopener noreferrer" className="hover:text-parchment/80 transition-colors">Sovereign Ecosystem</a>
          <Link href="/privacy" className="hover:text-parchment/80 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-parchment/80 transition-colors">Terms</Link>
        </nav>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-parchment/40 hover:text-parchment/80 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
