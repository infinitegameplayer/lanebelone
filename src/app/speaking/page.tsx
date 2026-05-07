import type { Metadata } from 'next'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import InquiryForm from '@/components/InquiryForm'
import { speakingTopics, speakingFormats } from '@/lib/page-data'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Lane Belone speaks on the infinite game, perception, flow and leadership. Keynotes, workshops, retreats and private sessions.',
  alternates: {
    canonical: 'https://www.lanebelone.com/speaking',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Speaking · Lane Belone',
    description: 'Lane Belone speaks on the infinite game, perception, flow and leadership. Keynotes, workshops, retreats and private sessions.',
    url: 'https://www.lanebelone.com/speaking',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speaking · Lane Belone',
    description: 'Lane Belone speaks on the infinite game, perception, flow and leadership. Keynotes, workshops, retreats and private sessions.',
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}


const speakingServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Speaking and Workshops',
  serviceType: 'Speaking, keynotes, workshops, retreats',
  description:
    'Lane Belone speaks on the infinite game, perception, flow and leadership. Keynotes, workshops, retreats and private sessions.',
  provider: { '@id': 'https://www.lanebelone.com/#person' },
  url: 'https://www.lanebelone.com/speaking',
  areaServed: 'Worldwide',
  audience: {
    '@type': 'Audience',
    audienceType: 'Leaders, founders, creators, communities',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lanebelone.com' },
    { '@type': 'ListItem', position: 2, name: 'Speaking', item: 'https://www.lanebelone.com/speaking' },
  ],
}

export default function SpeakingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingServiceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/lane-cowboy-action.webp"
          alt="Lane Belone speaking"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 30%' }}
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1510] via-[#0c1510]/40 to-transparent" />
        <div className="relative z-10 section pb-16 pt-40">
          <h1
            className="hero-line hero-line-1 text-5xl md:text-7xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Design. Play. Master.
          </h1>
          <p
            className="hero-line hero-line-2 text-lg md:text-xl text-parchment/70 max-w-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Inviting leaders, creators and communities into experiences that spark clarity, presence, creativity and transformational insight.
          </p>
        </div>
      </section>

      {/* What I speak about */}
      <section className="section">
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            What I speak about
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {speakingTopics.map((topic) => (
              <div key={topic.title} className="dark-card p-8">
                <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {topic.title}
                </h3>
                <p className="text-parchment/50 text-sm mb-4 italic" style={{ fontFamily: 'var(--font-body)' }}>
                  {topic.subtitle}
                </p>
                <p className="text-parchment/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {topic.body}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Formats */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                How I show up
              </h2>
              <ul className="flex flex-col gap-3" style={{ fontFamily: 'var(--font-body)' }}>
                {speakingFormats.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-parchment/70">
                    <span className="text-parchment/30 mt-1">&#xB7;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-parchment/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <p>
                Whether it&apos;s a keynote for five hundred people or an intimate session for a leadership team, the intention is the same: open something real, leave people with a clearer sense of what&apos;s possible.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* SQHQ cross-link */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl">
            <p className="text-parchment/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Looking for workshops, retreats or ongoing advisory work? That lives at{' '}
              <a
                href="https://sidequesthq.co"
                className="text-parchment/80 underline underline-offset-4 hover:text-parchment transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Side Quest HQ
              </a>
              .
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Inquiry CTA */}
      <section className="section border-t border-white/5" id="speak">
        <SectionReveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Invite me to speak
            </h2>
            <p className="text-parchment/60 mb-10 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Tell me about your event. The audience, the moment, what you&apos;re hoping to open. If there&apos;s a fit, we&apos;ll figure out the next step.
            </p>
            <InquiryForm
              formName="lanebelone-speaking"
              placeholders={{
                message: 'About your event: audience, moment, what you are hoping to open',
              }}
            />
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
