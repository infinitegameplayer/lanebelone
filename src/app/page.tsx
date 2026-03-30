'use client'

import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import HubSpotForm from '@/components/HubSpotForm'

// TODO: Replace with actual HubSpot Contact form ID (portal 23478458)
const CONTACT_FORM_ID = 'TODO_CONTACT_FORM_ID'

const paths = [
  {
    title: 'Writing',
    body: 'Essays and breadcrumbs from the infinite game.',
    cta: { label: 'Go to Substack', href: 'https://lanebelone.substack.com/', external: true, variant: 'outline' as const },
  },
  {
    title: 'Speaking',
    body: 'Keynotes, workshops and retreats on perception, flow and the long game.',
    cta: { label: 'Invite me to speak', href: '/speaking', external: false, variant: 'outline' as const },
  },
  {
    title: 'Joyful Sovereignty',
    body: 'The core philosophy. Not freedom from difficulty. Freedom as a way of moving through it.',
    cta: { label: 'Explore the ideas', href: '/joyful-sovereignty', external: false, variant: 'gold' as const },
  },
]

const books = [
  {
    title: 'Humble Alpha',
    cover: '/images/book-humble-alpha.webp', // TODO: Drop book-humble-alpha.webp into public/images/
    description: 'Co-authored by Lane Belone and Steven Dyme. Decoding how to master your life, conquer what stands in your way and run towards greatness.',
    cta: { label: 'Get the Book', href: 'https://www.amazon.com/Unleash-Your-Humble-Alpha-Presence/dp/173525472X', external: true },
    badge: 'Book',
  },
  {
    title: 'Your Infinite RPG',
    cover: '/images/book-infinite-rpg.webp', // TODO: Drop book-infinite-rpg.webp into public/images/
    description: 'A free ebook presenting personal growth as a customizable role-playing game. A gamified framework for designing an epic, authentic life.',
    cta: { label: 'Download Free', href: 'https://drive.google.com/file/d/1nlRYiD-T7K5HgorKe4VzgD-AiO7uZ1Fr/view?usp=sharing', external: true },
    badge: 'Free',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="grain-overlay relative min-h-screen flex flex-col justify-center px-6"
        style={{ background: 'radial-gradient(ellipse at 60% -10%, #2a3a18 0%, #0c1510 55%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto w-full pt-32 pb-24">
          <h1
            className="hero-line hero-line-1 text-5xl md:text-7xl leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Lane Belone
          </h1>
          <p
            className="hero-line hero-line-2 text-lg md:text-xl text-parchment/65 leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Exploring the Infinite Game and sharing breadcrumbs along the way.
          </p>
          <div className="hero-line hero-line-3 flex flex-wrap gap-4">
            <a
              href="https://lanebelone.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Read the writing
            </a>
            <a href="#connect" className="btn-gold">
              Connect
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{ opacity: 0.4 }}>
          <span className="text-xs tracking-widest text-parchment/30 uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            scroll
          </span>
          <div className="w-px h-8 bg-parchment/20" />
        </div>
      </section>

      {/* Three-path grid */}
      <section className="section">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paths.map((p) => (
              <div key={p.title} className="dark-card p-8 flex flex-col gap-4">
                <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                  {p.title}
                </h2>
                <p className="text-parchment/65 text-sm leading-relaxed flex-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {p.body}
                </p>
                {p.cta.external ? (
                  <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className={`btn-${p.cta.variant} self-start`}>
                    {p.cta.label}
                  </a>
                ) : (
                  <a href={p.cta.href} className={`btn-${p.cta.variant} self-start`}>
                    {p.cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Books */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {books.map((book) => (
              <div key={book.title} className="flex gap-6 items-start">
                {/* Book cover */}
                <div className="relative w-28 h-40 shrink-0 rounded-[6px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                  {/* Cover image — drop file into public/images/ to activate */}
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                    onError={() => {}} // Silently show placeholder if image missing
                  />
                </div>
                {/* Details */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded border border-white/10 text-parchment/40 uppercase tracking-wider" style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem' }}>
                      {book.badge}
                    </span>
                  </div>
                  <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {book.title}
                  </h3>
                  <p className="text-parchment/60 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    {book.description}
                  </p>
                  <a
                    href={book.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost self-start"
                  >
                    {book.cta.label} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* About teaser */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-72 md:h-96 rounded-[8px] overflow-hidden order-2 md:order-1">
              <Image
                src="/images/lane-headshot-cowboy.webp"
                alt="Lane Belone"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-5 order-1 md:order-2">
              <p className="text-xl md:text-2xl text-parchment/85 leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
                I write, speak and guide at the edge of what we think is possible.
              </p>
              <p className="text-parchment/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                For fifteen years I&apos;ve been exploring what it looks like to inhabit your life fully and helping others do the same.
              </p>
              <a href="/about" className="btn-ghost self-start">
                About Lane &rarr;
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Connect CTA */}
      <section id="connect" className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Start a conversation
            </h2>
            <p className="text-parchment/60 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Whether it&apos;s about writing, speaking or something else entirely, reach out. I read every message.
            </p>
            <HubSpotForm formId={CONTACT_FORM_ID} />
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
