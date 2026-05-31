import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import {
  librarySlp,
  aiBusinessArc,
  aiPersonalArc,
  libraryBlurbs,
  libraryCollections,
  libraryFreeReading,
  libraryPrintBooks,
} from '@/lib/page-data'

const DESCRIPTION =
  'The library of Lane Belone. The Sovereign Life Playbook, six AI Field Guides across the business and personal arcs, three Collections, a free ebook and a book. Tools for playing the game of your life more beautifully.'

export const metadata: Metadata = {
  title: 'Library',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.lanebelone.com/library',
    types: {
      'text/markdown': 'https://www.lanebelone.com/markdown/library',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Library · Lane Belone',
    description: DESCRIPTION,
    url: 'https://www.lanebelone.com/library',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Library · Lane Belone',
    description: DESCRIPTION,
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}

// Every product carries four cover variants on the SQHQ blob. The library uses
// cover-display: the 4:5 portrait built for on-screen shelving (Product Cover
// Design Codex). The shared page-data image points at cover-4x3 for the home
// page's landscape cards, so we swap to the portrait here without disturbing it.
const portrait = (img: string) => img.replace('cover-4x3', 'cover-display')

// ItemList over the catalog. Product and Offer entities live canonically on
// Side Quest HQ; this page carries CollectionPage plus a lightweight ItemList.
const catalog = [
  { name: librarySlp.title, url: librarySlp.href },
  ...aiBusinessArc.map(c => ({ name: c.title, url: c.href })),
  ...aiPersonalArc.map(c => ({ name: c.title, url: c.href })),
  ...libraryCollections.map(c => ({ name: c.title, url: c.href })),
  { name: libraryFreeReading[0].title, url: 'https://www.lanebelone.com/files/your-infinite-rpg.pdf' },
  { name: libraryPrintBooks[0].title, url: libraryPrintBooks[0].href },
]

const itemListElement = catalog.map((item, i) => ({
  '@type': 'ListItem',
  position: i + 1,
  name: item.name,
  url: item.url,
}))

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.lanebelone.com/library#collection',
  url: 'https://www.lanebelone.com/library',
  name: 'The Library · Lane Belone',
  description: DESCRIPTION,
  isPartOf: { '@id': 'https://www.lanebelone.com/#website' },
  about: { '@id': 'https://infinitegameos.io/#person' },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Lane Belone Library',
    numberOfItems: itemListElement.length,
    itemListElement,
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lanebelone.com' },
    { '@type': 'ListItem', position: 2, name: 'Library', item: 'https://www.lanebelone.com/library' },
  ],
}

function BookCard({
  title,
  blurb,
  priceLabel,
  href,
  image,
  free,
  className,
}: {
  title: string
  blurb: string
  priceLabel: string
  href: string
  image: string
  free?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`lib-book${className ? ` ${className}` : ''}`}
    >
      <div className="lib-cover-frame">
        <img src={image} alt={`${title} cover`} loading="lazy" />
      </div>
      <div className="lib-meta">
        <span className={`lib-price${free ? ' lib-price--free' : ''}`}>{priceLabel}</span>
        <h3 className="lib-title">{title}</h3>
        <p className="lib-blurb">{blurb}</p>
      </div>
    </a>
  )
}

function CollectionCard({
  title,
  blurb,
  price,
  savings,
  href,
  members,
}: {
  title: string
  blurb: string
  price: string
  savings: string
  href: string
  members: { title: string; image: string }[]
}) {
  const six = members.length > 3
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="lib-collection">
      <div className={`lib-cover-cluster${six ? ' lib-cover-cluster--six' : ''}`}>
        {members.map(m => (
          <img key={m.title} src={portrait(m.image)} alt="" loading="lazy" />
        ))}
      </div>
      <div className="lib-meta">
        <span className="lib-price">
          {price} · <span className="lib-savings">{savings}</span>
        </span>
        <h3 className="lib-title">{title}</h3>
        <p className="lib-blurb">{blurb}</p>
      </div>
    </a>
  )
}

function ShelfLabel({ children }: { children: string }) {
  return <div className="lib-shelf-label">{children}</div>
}

export default function LibraryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="section" style={{ paddingTop: '9rem' }}>
        {/* Intro */}
        <SectionReveal>
          <div className="section-label">— The Library —</div>
        </SectionReveal>
        <SectionReveal>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              lineHeight: 1.12,
              marginBottom: '1.6rem',
              maxWidth: '17em',
            }}
          >
            Your life is a game you get to co-create. With awareness, creativity and sovereignty, you play a more beautiful one.
          </h1>
        </SectionReveal>
        <SectionReveal>
          <p className="lib-cosmology">
            There&apos;s a way of seeing your life as a game you&apos;re already playing. These are tools for playing it a little more beautifully. With more awareness, more creativity and a little more freedom to choose your own way.
          </p>
        </SectionReveal>
        <SectionReveal>
          <p className="lib-host">
            So this is where the good stuff lives. Some are free, some carry a price. Open whatever catches your eye and stay as long as you like.
          </p>
        </SectionReveal>

        {/* Featured Playbook */}
        <SectionReveal>
          <ShelfLabel>Featured Playbook</ShelfLabel>
        </SectionReveal>
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BookCard
            title={librarySlp.title}
            blurb={libraryBlurbs[librarySlp.href]}
            priceLabel={librarySlp.price}
            href={librarySlp.href}
            image={portrait(librarySlp.image)}
            className="lib-featured"
          />
        </SectionReveal>

        {/* Business Arc */}
        <SectionReveal>
          <ShelfLabel>Business Arc</ShelfLabel>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiBusinessArc.map(card => (
            <BookCard
              key={card.title}
              title={card.title}
              blurb={libraryBlurbs[card.href]}
              priceLabel={card.price}
              href={card.href}
              image={portrait(card.image)}
            />
          ))}
        </SectionReveal>

        {/* Personal Arc */}
        <SectionReveal>
          <ShelfLabel>Personal Arc</ShelfLabel>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiPersonalArc.map(card => (
            <BookCard
              key={card.title}
              title={card.title}
              blurb={libraryBlurbs[card.href]}
              priceLabel={card.price}
              href={card.href}
              image={portrait(card.image)}
            />
          ))}
        </SectionReveal>

        {/* Collections */}
        <SectionReveal>
          <ShelfLabel>Collections</ShelfLabel>
        </SectionReveal>
        <SectionReveal className="flex flex-col gap-5">
          {libraryCollections.map(c => (
            <CollectionCard
              key={c.title}
              title={c.title}
              blurb={c.blurb}
              price={c.price}
              savings={c.savings}
              href={c.href}
              members={c.members}
            />
          ))}
        </SectionReveal>

        {/* Free Reading */}
        <SectionReveal>
          <ShelfLabel>Free Reading</ShelfLabel>
        </SectionReveal>
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {libraryFreeReading.map(b => (
            <BookCard
              key={b.title}
              title={b.title}
              blurb={b.blurb}
              priceLabel={b.priceLabel}
              href={b.href}
              image={b.image}
              free
            />
          ))}
        </SectionReveal>

        {/* Books */}
        <SectionReveal>
          <ShelfLabel>Books</ShelfLabel>
        </SectionReveal>
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {libraryPrintBooks.map(b => (
            <BookCard
              key={b.title}
              title={b.title}
              blurb={b.blurb}
              priceLabel={b.priceLabel}
              href={b.href}
              image={b.image}
            />
          ))}
        </SectionReveal>

        {/* Close */}
        <SectionReveal>
          <ShelfLabel>The Open Door</ShelfLabel>
        </SectionReveal>
        <SectionReveal>
          <p
            style={{
              fontFamily: 'var(--font-voice)',
              fontSize: '1.18rem',
              lineHeight: 1.7,
              color: 'var(--color-text)',
              maxWidth: '34em',
            }}
          >
            There&apos;s no rush to decide anything. The{' '}
            <Link href="/blog" style={{ color: 'var(--color-accent-hover)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>writing</Link>
            {' '}is free and always open, the easiest way to feel whether any of this is for you. The{' '}
            <a href="https://infinitegameos.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-hover)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Infinite Game OS</a>
            {' '}site is the larger room down the hall, a whole world to roam at no cost. The shelves grow as I make more, so come back whenever you like.
          </p>
        </SectionReveal>
      </section>
    </>
  )
}
