import type { Metadata } from 'next'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import { jsSections, isLinkedPara, JS_DESCRIPTION, jsFaqs } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'Joyful Sovereignty',
  description: JS_DESCRIPTION,
  alternates: {
    canonical: 'https://www.lanebelone.com/joyful-sovereignty',
    types: {
      'text/markdown': 'https://www.lanebelone.com/markdown/joyful-sovereignty',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Joyful Sovereignty · Lane Belone',
    description: JS_DESCRIPTION,
    url: 'https://www.lanebelone.com/joyful-sovereignty',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joyful Sovereignty · Lane Belone',
    description: JS_DESCRIPTION,
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: jsFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lanebelone.com/' },
    { '@type': 'ListItem', position: 2, name: 'Joyful Sovereignty', item: 'https://www.lanebelone.com/joyful-sovereignty' },
  ],
}

export default function JoyfulSovereigntyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden grain-overlay">
        <Image
          src="/images/bg-sacred-valley.jpg"
          alt="Sacred Valley landscape in Peru"
          fill
          className="object-cover"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1510]/70 via-[#0c1510]/60 to-[#0c1510]" />
        <div className="relative z-10 section pt-32 pb-20">
          <h1
            className="hero-line hero-line-1 text-6xl md:text-8xl mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Joyful Sovereignty
          </h1>
          <p
            className="hero-line hero-line-2 text-xl md:text-2xl text-parchment/55 max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            Spacious. Playful. At peace. The whole game, played from the inside.
          </p>
        </div>
      </section>

      {/* Prose sections derived from page-data */}
      {jsSections.map((section, si) => (
        <section key={section.heading} className={si === 0 ? 'section' : 'section border-t border-white/5'}>
          <SectionReveal>
            <div className="max-w-2xl flex flex-col gap-6 text-parchment/75 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <h2 className="text-3xl md:text-4xl text-parchment mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {section.heading}
              </h2>
              {section.paras.map((para, pi) => (
                <p key={pi} {...(si === 0 && pi === 0 ? { className: 'text-parchment/90' } : {})}>
                  {isLinkedPara(para)
                    ? <>{para.before}<a href={para.linkHref} className="underline underline-offset-4 transition-colors" style={{ color: 'rgba(232, 228, 240, 0.85)' }}>{para.linkLabel}</a>{para.after}</>
                    : para}
                </p>
              ))}
            </div>
          </SectionReveal>
        </section>
      ))}

      {/* Cross-links */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
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
                Hear this live
              </p>
              <a href="/speaking" className="btn-ghost">
                Invite me to speak &rarr;
              </a>
            </div>
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                The work
              </p>
              <a
                href="https://sidequesthq.co"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Side Quest HQ &rarr;
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
