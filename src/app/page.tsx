import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import NewsletterForm from '@/components/NewsletterForm'
import InquiryForm from '@/components/InquiryForm'
import Hero from '@/components/Hero'
import { getAllPosts } from '@/lib/blog'
import {
  happeningNow,
  sqhqChips,
  aiForBusinessFrame,
  aiBusinessArc,
  aiPersonalArc,
  libraryCollections,
} from '@/lib/page-data'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.lanebelone.com',
    types: {
      'text/markdown': 'https://www.lanebelone.com/markdown',
    },
  },
}


const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.lanebelone.com/#website',
  url: 'https://www.lanebelone.com',
  name: 'Lane Belone',
  description:
    'Writer, speaker and guide. Exploring the infinite game and sharing breadcrumbs along the way.',
  publisher: { '@id': 'https://infinitegameos.io/#person' },
  inLanguage: 'en-US',
}

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://www.lanebelone.com',
  name: 'Lane Belone',
  description:
    'Writer, speaker and guide. Exploring the infinite game and sharing breadcrumbs along the way.',
  mainEntity: { '@id': 'https://infinitegameos.io/#person' },
}

// Portrait cover crop (4:5 cover-display) for the library-style shelves, matching
// the /library page. Shared page-data points image at the 4:3 landscape crop, so
// we swap to the portrait here without disturbing it.
const portrait = (img: string) => img.replace('cover-4x3', 'cover-display')

// A single Field Guide on the home shelves. Reuses the lib- classes from the
// /library page so the two surfaces read as one room.
function ShelfCard({ title, hook, price, href, image }: {
  title: string
  hook: string
  price: string
  href: string
  image: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="lib-book">
      <div className="lib-cover-frame">
        <img src={portrait(image)} alt={`${title} cover`} loading="lazy" />
      </div>
      <div className="lib-meta">
        <span className="lib-price">{price}</span>
        <h3 className="lib-title">{title}</h3>
        <p className="lib-blurb">{hook}</p>
      </div>
    </a>
  )
}

export default function HomePage() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.filter(p => p.featured).slice(0, 2).reverse()
  const latestPosts = allPosts.slice(0, 2)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />
      {/* 1 — Hero (client component for useRef + CursorParallax) */}
      <Hero />

      <div className="section-divider" />

      {/* 2 — Happening Now */}
      <section className="section">
        <SectionReveal>
          <div className="section-label">· Happening Now ·</div>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured: Install Session (gold shimmer bezel) */}
          <div className="bezel-card featured flex flex-col">
            <div className="shimmer-border" />
            <div className="bezel-inner flex flex-col gap-3 flex-1">
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.62rem',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  display: 'inline-block',
                  padding: '0.3rem 0.7rem',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  borderRadius: '3px',
                  alignSelf: 'flex-start',
                  marginBottom: '0.5rem',
                }}
              >
                Install Session
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                {happeningNow[0].title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                {happeningNow[0].description}
              </p>
              <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <a
                  href={happeningNow[0].ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ fontSize: '0.8rem', padding: '0.6rem 1.3rem' }}
                >
                  {happeningNow[0].cta}
                </a>
              </div>
            </div>
          </div>

          {/* Playbook (plain bezel) */}
          <div className="bezel-card flex flex-col">
            <div className="bezel-inner flex flex-col gap-3 flex-1">
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.62rem',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-hover)',
                  display: 'inline-block',
                  padding: '0.3rem 0.7rem',
                  border: '1px solid rgba(90, 160, 96, 0.3)',
                  borderRadius: '3px',
                  alignSelf: 'flex-start',
                  marginBottom: '0.5rem',
                }}
              >
                Playbook
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                {happeningNow[1].title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                {happeningNow[1].description}
              </p>
              <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                <a
                  href={happeningNow[1].ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.6rem 1.3rem' }}
                >
                  {happeningNow[1].cta}{happeningNow[1].price ? ` · ${happeningNow[1].price}` : ''}
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* 3 — Joyful Sovereignty (full-width contemplative break) */}
      <section
        className="relative"
        style={{
          padding: '8rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #081208 0%, #0c1a0e 50%, #081208 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '4rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #c9a84c 50%, transparent)',
          }}
        />
        <SectionReveal>
          <div className="max-w-3xl mx-auto">
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '2.5rem',
              }}
            >
              Joyful Sovereignty
            </div>
            <blockquote
              style={{
                fontFamily: 'var(--font-voice)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
                lineHeight: 1.3,
                color: 'var(--color-text)',
                maxWidth: '22em',
                margin: '0 auto 2.25rem',
                letterSpacing: '-0.005em',
              }}
            >
              &ldquo;Spacious. Playful. At peace. The whole game, played from the inside.&rdquo;
            </blockquote>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--color-text-muted)',
                maxWidth: '36em',
                margin: '0 auto 3rem',
              }}
            >
              An approach to playing the Infinite Game through joy and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort.
            </p>
            <Link href="/joyful-sovereignty" className="btn-ghost">
              Explore Joyful Sovereignty &rarr;
            </Link>
          </div>
        </SectionReveal>
        <div
          style={{
            position: 'absolute',
            bottom: '4rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #c9a84c 50%, transparent)',
          }}
        />
      </section>

      <div className="section-divider" />

      {/* 4 — A Library Preview */}
      <section className="section">
        <SectionReveal>
          <div className="section-label">· A Library Preview ·</div>
        </SectionReveal>
        <SectionReveal>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: 'var(--color-text-muted)',
              maxWidth: '38em',
              marginBottom: '1rem',
            }}
          >
            {aiForBusinessFrame} Six short reads across two arcs, each built around the questions productivity AI skips.
          </p>
        </SectionReveal>
        <SectionReveal>
          <div style={{ marginBottom: '1.5rem' }}>
            <Link href="/library" className="btn-ghost">
              Browse the full library &rarr;
            </Link>
          </div>
        </SectionReveal>

        {/* Business Arc */}
        <SectionReveal>
          <div className="lib-shelf-label">Business Arc</div>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiBusinessArc.map((card) => (
            <ShelfCard
              key={card.title}
              title={card.title}
              hook={card.oneLiner}
              price={card.price}
              href={card.href}
              image={card.image}
            />
          ))}
        </SectionReveal>
        <SectionReveal>
          <p className="home-collection-line">
            Get all three.{' '}
            <a href={libraryCollections[0].href} target="_blank" rel="noopener noreferrer">
              {libraryCollections[0].title}, {libraryCollections[0].price}, {libraryCollections[0].savings.replace('Save ', 'saves you ')} &rarr;
            </a>
          </p>
        </SectionReveal>

        {/* Personal Arc */}
        <SectionReveal>
          <div className="lib-shelf-label">Personal Arc</div>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiPersonalArc.map((card) => (
            <ShelfCard
              key={card.title}
              title={card.title}
              hook={card.oneLiner}
              price={card.price}
              href={card.href}
              image={card.image}
            />
          ))}
        </SectionReveal>
        <SectionReveal>
          <p className="home-collection-line">
            Get all three.{' '}
            <a href={libraryCollections[1].href} target="_blank" rel="noopener noreferrer">
              {libraryCollections[1].title}, {libraryCollections[1].price}, {libraryCollections[1].savings.replace('Save ', 'saves you ')} &rarr;
            </a>
          </p>
        </SectionReveal>

        {/* Closer: Foundation Collection + library doorway */}
        <SectionReveal>
          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <p className="home-collection-line" style={{ marginTop: 0, marginBottom: '1.5rem' }}>
              Or take the whole shelf.{' '}
              <a href={libraryCollections[2].href} target="_blank" rel="noopener noreferrer">
                {libraryCollections[2].title}, all six, {libraryCollections[2].savings.replace('Save ', 'saves you ')} &rarr;
              </a>
            </p>
            <div className="text-right">
              <Link href="/library" className="btn-ghost">
                Browse the full library &rarr;
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* 6 — Recent Writing */}
      <section className="section">
        <SectionReveal>
          <div className="section-label">· Recent Writing ·</div>
        </SectionReveal>

        {/* Featured row */}
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/f/${post.slug}`} className="group block" style={{ textDecoration: 'none' }}>
              <article style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ overflow: 'hidden', marginBottom: '1.1rem' }}>
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                      display: 'block',
                      border: '1px solid rgba(232, 232, 216, 0.10)',
                      transition: 'transform 0.3s ease',
                    }}
                    className="group-hover:scale-[1.03]"
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    marginBottom: '0.25rem',
                    display: 'block',
                  }}
                >
                  Featured
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-voice)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                    fontWeight: 400,
                    color: 'var(--color-text)',
                    lineHeight: 1.35,
                    marginBottom: '0.5rem',
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                  {post.description}
                </p>
              </article>
            </Link>
          ))}
        </SectionReveal>

        {/* Hairline divider between rows */}
        <hr
          style={{
            width: '200px',
            height: '1px',
            background: 'var(--color-gold)',
            opacity: 0.3,
            border: 'none',
            margin: '3rem auto',
          }}
        />

        {/* Latest row */}
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/f/${post.slug}`} className="group block" style={{ textDecoration: 'none' }}>
              <article
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem',
                  borderTop: '1px solid rgba(232, 232, 216, 0.06)',
                  borderBottom: '1px solid rgba(232, 232, 216, 0.06)',
                }}
              >
                <div style={{ flexShrink: 0, width: '120px', overflow: 'hidden', borderRadius: '2px' }}>
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    style={{
                      width: '120px',
                      height: '68px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.3s ease',
                      aspectRatio: '16/9',
                    }}
                    className="group-hover:scale-[1.03]"
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-voice)',
                      fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                      fontWeight: 400,
                      color: 'var(--color-text)',
                      lineHeight: 1.35,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.65,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </SectionReveal>

        <SectionReveal className="text-center mt-10">
          <Link href="/blog" className="btn-ghost">
            Read the full archive &rarr;
          </Link>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* 6 — Work with me at Side Quest HQ */}
      <section className="section">
        <SectionReveal>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Work with me at Side Quest HQ.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
              marginBottom: '2.5rem',
              maxWidth: '40em',
            }}
          >
            This is where the tools, events and one-on-one work live. Four doors, all open.
          </p>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sqhqChips.map((chip) => (
            <a
              key={chip.title}
              href={chip.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              style={{ textDecoration: 'none' }}
            >
              <div className="bezel-card">
                <div className="bezel-inner" style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text)', display: 'block', marginBottom: '0.3rem' }}>
                    {chip.title}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-accent-hover)', letterSpacing: '0.04em', display: 'block' }}>
                    {chip.sub}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </SectionReveal>
        <SectionReveal className="text-right mt-8">
          <a
            href="https://sidequesthq.co"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Visit Side Quest HQ &rarr;
          </a>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* 7 — About */}
      <section className="section">
        <SectionReveal>
          <div className="bezel-card">
            <div className="bezel-inner">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-6 md:gap-10 items-center">
                <div className="relative w-44 aspect-square rounded-[8px] overflow-hidden border mx-auto md:mx-0" style={{ borderColor: 'rgba(90, 160, 96, 0.3)' }}>
                  <Image src="/images/lane-headshot-cowboy.webp" alt="Lane Belone" fill className="object-cover" style={{ objectPosition: 'top' }} sizes="180px" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-voice)', fontSize: '1.7rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                    About Lane
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text-muted)', margin: 0, maxWidth: '40em' }}>
                    I&rsquo;m a former Green Beret turned life designer. Published author, retreat leader and advisor to founders and entrepreneurs navigating real transitions.
                  </p>
                </div>
                <Link href="/about" className="btn-ghost self-end md:self-center">
                  Read the full story &rarr;
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* 8 — Speaking */}
      <section className="section">
        <SectionReveal>
          <div className="bezel-card">
            <div className="bezel-inner">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center" style={{ padding: '0.5rem 0.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                    Want me on your stage?
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>
                    Keynotes and talks on perception, flow, joyful sovereignty and the Infinite Game.
                  </p>
                </div>
                <Link href="/speaking" className="btn-outline">
                  Invite me to speak &rarr;
                </Link>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* 9 — Newsletter / Contact */}
      <section id="connect" className="section">
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="bezel-card">
            <div className="bezel-inner">
              <h3 style={{ fontFamily: 'var(--font-voice)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.6rem' }}>
                Stay connected
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Personal updates and fresh ideas. The kind you&rsquo;ll actually open.
              </p>
              <NewsletterForm />
            </div>
          </div>
          <div className="bezel-card">
            <div className="bezel-inner">
              <h3 style={{ fontFamily: 'var(--font-voice)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.6rem' }}>
                Start a conversation
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Whether it&rsquo;s about writing, speaking or something else entirely, reach out. I read every message.
              </p>
              <InquiryForm
                formName="lanebelone-contact"
                placeholders={{
                  message: 'A few lines about what brings you here',
                }}
              />
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
