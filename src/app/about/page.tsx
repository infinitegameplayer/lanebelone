import type { Metadata } from 'next'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'About',
  description: 'Lane Belone — writer, speaker and guide. Exploring the infinite game and what it looks like to live freely.',
}

export default function AboutPage() {
  return (
    <>
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

      {/* Voice copy */}
      <section className="section">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-xl text-parchment/85" style={{ fontFamily: 'var(--font-display)' }}>
                I write, speak and guide at the edge of what we think is possible.
              </p>
              <p>
                My work orbits a single question: what does a life look like when it&apos;s genuinely free? Not free from difficulty. Free to move with full awareness, full choice, full presence. That question shows up in everything I do.
              </p>
              <p>
                I write about the infinite game and share breadcrumbs along the way. A life oriented around growth, meaning and the long view rather than winning a finite round.
              </p>
              <p>
                I&apos;ve led groups through high-altitude terrain in Peru, spoken to audiences about freedom and presence, and sat with individuals navigating their most meaningful transitions. The through-line is always the same: what becomes possible when you stop playing by someone else&apos;s rules?
              </p>
            </div>

            {/* Secondary portrait */}
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
