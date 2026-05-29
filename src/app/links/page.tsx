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
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Links · Lane Belone',
    description: 'Every Lane Belone destination in one place.',
    images: ['/images/lane-machu-picchu-square.webp'],
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
            Writer, speaker and guide of the Infinite Game. Breadcrumbs along the way.
          </p>

          {/* Links */}
          <div className="w-full flex flex-col gap-3">
            {linkHub.map((item) => {
              const className =
                'group block w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.99]'
              const inner = (
                <>
                  <span className="block text-parchment" style={{ fontFamily: 'var(--font-body)' }}>
                    {item.label}
                  </span>
                  {item.sublabel && (
                    <span className="block text-parchment/45 text-sm mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                      {item.sublabel}
                    </span>
                  )}
                </>
              )
              return item.external ? (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {inner}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={className}>
                  {inner}
                </Link>
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
