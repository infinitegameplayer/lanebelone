import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { linkHub, socialLinks } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'Links',
  description: 'Every Lane Belone destination in one place. Writing, the Infinite Game OS, the Sovereign Life Playbook, speaking and more.',
  alternates: {
    canonical: 'https://www.lanebelone.com/links',
    types: {
      'text/markdown': 'https://www.lanebelone.com/markdown/links',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Links · Lane Belone',
    description: 'Every Lane Belone destination in one place. Writing, the Infinite Game OS, the Sovereign Life Playbook, speaking and more.',
    url: 'https://www.lanebelone.com/links',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links · Lane Belone',
    description: 'Every Lane Belone destination in one place.',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lanebelone.com' },
    { '@type': 'ListItem', position: 2, name: 'Links', item: 'https://www.lanebelone.com/links' },
  ],
}

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Substack: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5H2v3h20V5zM2 10v9l10-5.5L22 19v-9H2zm0-8h20v2H2V2z" />
    </svg>
  ),
}

const linkIcons: Record<string, React.ReactNode> = {
  writing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  infinity: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="4" />
      <circle cx="15" cy="12" r="4" />
    </svg>
  ),
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H2z" />
      <path d="M22 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z" />
    </svg>
  ),
  spark: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z" />
    </svg>
  ),
  compass: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5" />
    </svg>
  ),
  mic: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  library: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="4" height="18" rx="1" />
      <rect x="10" y="3" width="4" height="18" rx="1" />
      <path d="M16.5 4.5l3.2.9-3.6 13.2-3.2-.9z" />
    </svg>
  ),
}

export default function LinksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="min-h-screen px-6 pt-28 pb-20 flex flex-col items-center">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Profile */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/10 mb-5">
            <Image
              src="/images/lane-machu-picchu-square.webp"
              alt="Lane Belone"
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>
          <h1 className="text-3xl mb-2 text-parchment" style={{ fontFamily: 'var(--font-display)' }}>
            Lane Belone
          </h1>
          <p
            className="text-parchment/55 text-sm text-center mb-10 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Writer, speaker and guide of the Infinite Game. Everything worth pointing you to, in one place.
          </p>

          {/* Links */}
          <div className="w-full flex flex-col gap-3">
            {linkHub.map((item) => {
              const className = item.featured
                ? 'group block w-full rounded-xl border border-[#c9a84c]/40 bg-[#c9a84c]/[0.07] px-5 py-4 text-left transition-all duration-200 hover:bg-[#c9a84c]/[0.12] hover:border-[#c9a84c]/60 hover:shadow-[0_0_24px_rgba(201,168,76,0.18)] active:scale-[0.99]'
                : 'group block w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.99]'
              const inner = (
                <span className="flex items-center gap-4">
                  <span className={`shrink-0 transition-colors ${item.featured ? 'text-[#c9a84c]' : 'text-parchment/50 group-hover:text-parchment/90'}`}>
                    {linkIcons[item.icon]}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-parchment" style={{ fontFamily: 'var(--font-body)' }}>
                      {item.label}
                      {item.pill && (
                        <span className="shrink-0 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30">
                          {item.pill}
                        </span>
                      )}
                    </span>
                    {item.sublabel && (
                      <span className="block text-parchment/45 text-sm mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                        {item.sublabel}
                      </span>
                    )}
                  </span>
                </span>
              )
              const isRoute = item.href.startsWith('/') && !item.href.startsWith('/files/')
              if (isRoute) {
                return (
                  <Link key={item.href} href={item.href} className={className}>
                    {inner}
                  </Link>
                )
              }
              const isFile = item.href.startsWith('/files/')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  {...(isFile ? { download: true } : { target: '_blank', rel: /(?:lanebelone\.com|sidequesthq\.co|infinitegameos\.io)/.test(item.href) ? 'noopener' : 'noopener noreferrer' })}
                  className={className}
                >
                  {inner}
                </a>
              )
            })}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6 mt-10">
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-parchment/40 hover:text-parchment/80 transition-colors"
              >
                {socialIcons[s.label]}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
