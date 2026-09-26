import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import InquiryForm from '@/components/InquiryForm'
import Hero from '@/components/Hero'
import { getAllPosts } from '@/lib/blog'
import {
  happeningNow,
  sqhqChips,
  aiBusinessArc,
  aiPersonalArc,
  libraryAliveBusiness,
  librarySlp,
  librarySqp,
  libraryCfp,
  libraryTrilogy,
  libraryFreeReading,
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
    'Lane Belone, writer on the Infinite Game, sharing breadcrumbs along the way.',
  publisher: { '@id': 'https://infinitegameos.io/#person' },
  inLanguage: 'en-US',
  // The footer, /terms and every per-article node already say CC BY 4.0.
  // The site-level node was the one place that stayed silent.
  license: 'https://creativecommons.org/licenses/by/4.0/',
}

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://www.lanebelone.com',
  name: 'Lane Belone',
  description:
    'Lane Belone, writer on the Infinite Game, sharing breadcrumbs along the way.',
  mainEntity: { '@id': 'https://infinitegameos.io/#person' },
}

// Portrait cover crop (4:5 cover-display) for the library-style shelves, matching
// the /library page. Shared page-data points image at the 4:3 landscape crop, so
// we swap to the portrait here without disturbing it.
const portrait = (img: string) => img.replace('cover-4x3', 'cover-display')

// "$37 to $77" from a list of "$NN" prices, or the single price when they agree.
function priceRange(prices: string[]): string {
  const n = prices.map((p) => Number(p.replace('$', '')))
  const lo = Math.min(...n)
  const hi = Math.max(...n)
  return lo === hi ? `$${lo}` : `$${lo} to $${hi}`
}

export default function HomePage() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.filter(p => p.featured).slice(0, 2).reverse()
  const latestPosts = allPosts.slice(0, 2)

  // The free door, and the two prices the compact Library module quotes.
  // Both are computed from the shelf data, so they move when a price does.
  const oat = libraryFreeReading.find((b) => b.title === 'One Alive Thing')!
  const playbookRange = priceRange([librarySlp, librarySqp, libraryCfp].map((p) => p.price))
  const fieldGuideFloor = priceRange([...aiBusinessArc, ...aiPersonalArc].map((c) => c.price)).split(' to ')[0]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />
      {/* 1. Hero (client component for useRef + CursorParallax) */}
      <Hero />

      <div className="section-divider" />

      {/* 2. Start Free: One Alive Thing, the free door */}
      <section className="section">
        <SectionReveal>
          <div className="section-label">· Start Free ·</div>
        </SectionReveal>
        <SectionReveal>
          <a href={oat.href} target="_blank" rel="noopener" className="oat-feature">
            <div className="oat-cover">
              <img src={oat.image} alt={`${oat.title} cover`} loading="lazy" />
            </div>
            <div>
              <span className="free-pill">{oat.priceLabel}</span>
              <div className="oat-title">{oat.title}</div>
              <p className="oat-sub">
                The easiest door in, and a real one. In under an hour you find what&rsquo;s alive in you and make one small thing real. You finish holding something that wasn&rsquo;t there when you sat down, and the path keeps unfolding from there at your own pace.
              </p>
              <span className="btn-gold" style={{ fontSize: '0.8rem', padding: '0.6rem 1.3rem' }}>
                Begin the side quest
              </span>
            </div>
          </a>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* Happening Now: an option, empty by default (see page-data). When an item
          has a real window it renders here, after the free door, which holds
          position two either way. */}
      {happeningNow.length > 0 && (
        <>
          <section className="section">
            <SectionReveal>
              <div className="section-label">· Happening Now ·</div>
            </SectionReveal>
            <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {happeningNow.map((item) => (
                <div key={item.title} className={`bezel-card${item.featured ? ' featured' : ''} flex flex-col`}>
                  {item.featured && <div className="shimmer-border" />}
                  <div className="bezel-inner flex flex-col gap-3 flex-1">
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.62rem',
                        fontWeight: 500,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: item.featured ? 'var(--color-gold)' : 'var(--color-accent-hover)',
                        display: 'inline-block',
                        padding: '0.3rem 0.7rem',
                        border: item.featured ? '1px solid rgba(201, 168, 76, 0.3)' : '1px solid rgba(90, 160, 96, 0.3)',
                        borderRadius: '3px',
                        alignSelf: 'flex-start',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.badge}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                      {item.description}
                    </p>
                    <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
                      <a
                        href={item.ctaHref}
                        target="_blank"
                        rel={/(?:lanebelone\.com|sidequesthq\.co|infinitegameos\.io)/.test(item.ctaHref) ? 'noopener' : 'noopener noreferrer'}
                        className={item.featured ? 'btn-gold' : 'btn-outline'}
                        style={{ fontSize: '0.8rem', padding: '0.6rem 1.3rem' }}
                      >
                        {item.cta}{item.price ? ` · ${item.price}` : ''}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </SectionReveal>
          </section>

          <div className="section-divider" />
        </>
      )}

      {/* 3. Joyful Sovereignty (full-width contemplative break) */}
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
              A way of playing the Infinite Game from within: purposeful, playful and free. Power that arrives with ease. Aliveness that moves on its own.
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

      {/* 4. Recent Writing */}
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
                className="latest-card"
                style={{
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem',
                  borderTop: '1px solid rgba(232, 232, 216, 0.06)',
                  borderBottom: '1px solid rgba(232, 232, 216, 0.06)',
                }}
              >
                <div className="latest-thumb">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    style={{ transition: 'transform 0.3s ease' }}
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

      {/* 5. The Library, one compact module. The full shelf lives at /library
          and every product is sold on Side Quest HQ, so the home carries the
          flagship, one line for the playbooks and one for the Field Guides. */}
      <section className="section">
        <SectionReveal>
          <div className="section-label">· The Library ·</div>
        </SectionReveal>
        <SectionReveal>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: 'var(--color-text-muted)',
              maxWidth: '38em',
              marginBottom: '2rem',
            }}
          >
            A small shelf of tools for playing the game of your life more beautifully. Go as deep as you like. Each one meets you where you are and opens a door to where you&rsquo;re headed.
          </p>
        </SectionReveal>
        <SectionReveal>
          <a href={libraryAliveBusiness.href} target="_blank" rel="noopener" style={{ display: 'block' }}>
            <div className="os-marquee">
              <div className="os-cover">
                <img src={portrait(libraryAliveBusiness.image)} alt={`${libraryAliveBusiness.title} cover`} loading="lazy" />
              </div>
              <div>
                <div className="os-eyebrow">Where the whole business lives</div>
                <div className="os-title">{libraryAliveBusiness.title}</div>
                <p className="os-blurb">{libraryAliveBusiness.oneLiner}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.3rem', flexWrap: 'wrap' }}>
                  <span className="btn-gold" style={{ fontSize: '0.8rem', padding: '0.6rem 1.3rem' }}>
                    Explore The Alive Business
                  </span>
                  <span className="os-price">{libraryAliveBusiness.price}</span>
                </div>
              </div>
            </div>
          </a>
        </SectionReveal>
        <SectionReveal>
          <p className="home-collection-line">
            Three playbooks for the life, the motion and the engine, {playbookRange} each. Or{' '}
            <a href={libraryTrilogy.href} target="_blank" rel="noopener">
              all three as {libraryTrilogy.title}, {libraryTrilogy.price} &rarr;
            </a>
          </p>
        </SectionReveal>
        <SectionReveal>
          <p className="home-collection-line">
            Field Guides on AI, the practice underneath the tool, from {fieldGuideFloor}.{' '}
            <Link href="/library">All of them in the library &rarr;</Link>
          </p>
        </SectionReveal>
        <SectionReveal>
          <div
            style={{
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            <div className="text-right">
              <Link href="/library" className="btn-ghost">
                Browse the full library &rarr;
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="section-divider" />

      {/* 6. Work with me at Side Quest HQ, with Speaking beside it */}
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
            This is where the tools, events and one-on-one work live. Three doors, all open.
          </p>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sqhqChips.map((chip) => (
            <a
              key={chip.title}
              href={chip.href}
              target="_blank"
              rel={/(?:lanebelone\.com|sidequesthq\.co|infinitegameos\.io)/.test(chip.href) ? 'noopener' : 'noopener noreferrer'}
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
            href="https://www.sidequesthq.co"
            target="_blank"
            rel="noopener"
            className="btn-ghost"
          >
            Visit Side Quest HQ &rarr;
          </a>
        </SectionReveal>
        <SectionReveal>
          <div className="bezel-card" style={{ marginTop: '2.5rem' }}>
            <div className="bezel-inner">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center" style={{ padding: '0.5rem 0.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                    Want me on your stage?
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>
                    Keynotes, workshops and Side Quests on The Infinite Player: who you are when the role ends and how you author what comes next.
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

      {/* 7. About */}
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
                    I&rsquo;m a writer on the Infinite Game, a former Green Beret and co-author of <em>Unleash Your Humble Alpha</em>. My work centers on the <a href="https://www.sidequesthq.co/infinite-player" className="underline underline-offset-4 transition-colors" style={{ color: 'rgba(232, 228, 240, 0.85)' }}>Infinite Player</a>, the player underneath every role. At Side Quest HQ I build The Alive Business and the playbooks, and at Infinite Game OS I keep an open library of the ideas beneath them.
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

      {/* 8. Contact */}
      <section id="connect" className="section">
        <SectionReveal>
          <div className="bezel-card" style={{ maxWidth: '36rem', margin: '0 auto' }}>
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
