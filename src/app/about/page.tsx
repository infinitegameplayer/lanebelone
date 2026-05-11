import type { Metadata } from 'next'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import { LANE_BIO, aboutStory, isLinkedPara, type Para } from '@/lib/page-data'

export const metadata: Metadata = {
  title: {
    absolute: 'About Lane Belone | Writer and Guide of the Infinite Game',
  },
  description: LANE_BIO,
  alternates: {
    canonical: 'https://www.lanebelone.com/about',
    types: {
      'text/markdown': 'https://www.lanebelone.com/markdown/about',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'About Lane Belone | Writer and Guide of the Infinite Game',
    description: LANE_BIO,
    url: 'https://www.lanebelone.com/about',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Lane Belone | Writer and Guide of the Infinite Game',
    description: LANE_BIO,
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.lanebelone.com/about#lane-belone',
  name: 'Lane Belone',
  url: 'https://www.lanebelone.com',
  jobTitle: 'Writer, Speaker and Guide',
  description: LANE_BIO,
  sameAs: [
    'https://sidequesthq.co',
    'https://infinitegameos.io',
    'https://www.linkedin.com/in/lanebelone/',
    'https://www.instagram.com/increasefreedom/',
    'https://lanebelone.substack.com/',
  ],
}

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: { '@id': 'https://www.lanebelone.com/about#lane-belone' },
  url: 'https://www.lanebelone.com/about',
  name: 'About Lane Belone',
  description: LANE_BIO,
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lanebelone.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://www.lanebelone.com/about' },
  ],
}

function renderPara(para: Para, key: number) {
  if (!isLinkedPara(para)) {
    return <p key={key}>{para}</p>
  }
  return (
    <p key={key}>
      {para.before}
      <a href={para.linkHref} className="underline underline-offset-4 transition-colors" style={{ color: 'rgba(232, 228, 240, 0.85)' }}>
        {para.linkLabel}
      </a>
      {para.after}
    </p>
  )
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero portrait */}
      <section className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/lane-machu-picchu-rotated.webp"
          alt="Lane Belone at Machu Picchu"
          fill
          className="object-cover about-hero-img"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1510] via-[#0c1510]/50 to-transparent" />
        <div className="relative z-10 section pb-16 pt-40">
          <h1
            className="hero-line hero-line-1 text-5xl md:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lane Belone
          </h1>
        </div>
      </section>

      {/* Opening — two-column with portrait */}
      <section className="section">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-xl md:text-2xl text-parchment/90 leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
                Lane Belone is a writer, speaker and guide. Former U.S. Army Green
                Beret, author of <em>Unleash Your Humble Alpha</em> and founder
                of Side Quest HQ, where he leads workshops, retreats and private
                advisory for founders and leaders playing the Infinite Game.
              </p>
              <p className="text-parchment/70">
                My work orbits a simple question: how can I flow with aliveness and allow the &ldquo;success&rdquo; to be the byproduct? In retrospect, that question has (often) silently been answered in every chapter of my story. It sent me to Germany. It led me into Special Forces. It brought me to Peru, to Panama, to mountain retreats and deep conversations on many continents. It keeps asking.
              </p>
              <p className="text-parchment/70">
                The through-line has always been the same. I&apos;m a curious explorer at heart, finding harmony in the co-creation of ideas, and telling the story of what happened along the way.
              </p>
            </div>

            {/* Portrait */}
            <div className="relative h-80 md:h-[480px] rounded-[8px] overflow-hidden">
              <Image
                src="/images/lane-headshot-collared.webp"
                alt="Lane Belone"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Story sections derived from page-data */}
      {aboutStory.map((section) => (
        <section key={section.heading} className="section border-t border-white/5">
          <SectionReveal>
            <div className="max-w-2xl flex flex-col gap-6 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <h2 className="text-2xl md:text-3xl text-parchment/50 mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
                {section.heading}
              </h2>
              {section.paras.map((para, i) => renderPara(para, i))}
              {section.signature && (
                <p className="text-parchment/60" style={{ fontFamily: 'var(--font-display)' }}>
                  {section.signature}
                </p>
              )}
              {section.tagline && (
                <p className="text-parchment/50 italic" style={{ fontFamily: 'var(--font-display)' }}>
                  {section.tagline}
                </p>
              )}
            </div>
          </SectionReveal>
        </section>
      ))}

      {/* Cross-links */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                The writing
              </p>
              <a
                href="https://lanebelone.substack.com/"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the writing &rarr;
              </a>
            </div>
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Bring this to your audience
              </p>
              <a href="/speaking" className="btn-ghost">
                Invite me to speak &rarr;
              </a>
            </div>
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Start a conversation
              </p>
              <a href="mailto:howdy@lanebelone.com" className="btn-ghost">
                Reach out &rarr;
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
