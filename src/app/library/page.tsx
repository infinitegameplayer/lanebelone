import type { Metadata } from 'next'
import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import {
  librarySlp,
  aiBusinessArc,
  aiPersonalArc,
  aiBundles,
} from '@/lib/page-data'

const DESCRIPTION =
  'The full library of Lane Belone digital products. The Sovereign Life Playbook, six AI Field Guides across the business and personal arcs and three bundles. Each one hosted on Side Quest HQ.'

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

// ItemList over the canonical SQHQ product pages. No Product schema here: the
// Product and Offer entities live canonically on Side Quest HQ. This page is
// the catalog index, so it carries CollectionPage plus a lightweight ItemList.
const itemListElement = [librarySlp, ...aiBusinessArc, ...aiPersonalArc, ...aiBundles].map(
  (item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.title,
    url: item.href,
  })
)

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.lanebelone.com/library#collection',
  url: 'https://www.lanebelone.com/library',
  name: 'Digital Product Library · Lane Belone',
  description: DESCRIPTION,
  isPartOf: { '@id': 'https://www.lanebelone.com/#website' },
  about: { '@id': 'https://infinitegameos.io/#person' },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Lane Belone Digital Products',
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

function LibraryCard({
  title,
  oneLiner,
  priceLabel,
  href,
  image,
}: {
  title: string
  oneLiner: string
  priceLabel: string
  href: string
  image: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <div className="bezel-card flex flex-col h-full">
        <div className="bezel-inner flex flex-col gap-2 flex-1" style={{ padding: '1.25rem 1.1rem' }}>
          <img
            src={image}
            alt={`${title} cover`}
            loading="lazy"
            width={400}
            height={300}
            style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.6rem' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-hover)',
              marginBottom: '0.2rem',
            }}
          >
            {priceLabel}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              lineHeight: 1.25,
              marginBottom: '0.4rem',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              lineHeight: 1.55,
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            {oneLiner}
          </p>
        </div>
      </div>
    </a>
  )
}

function ArcLabel({ children, marginTop }: { children: string; marginTop?: string }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.68rem',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-gold)',
        marginTop,
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </div>
  )
}

export default function LibraryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Intro */}
      <section className="section" style={{ paddingTop: '9rem' }}>
        <SectionReveal>
          <div className="section-label">— Library —</div>
        </SectionReveal>
        <SectionReveal>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '16em',
            }}
          >
            The whole catalog, in one place.
          </h1>
        </SectionReveal>
        <SectionReveal>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: 'var(--color-text-muted)',
              maxWidth: '38em',
              marginBottom: '3rem',
            }}
          >
            Every digital product in one index. The flagship Playbook. Six AI Field Guides across the business and personal arcs. Three bundles. Each one lives on Side Quest HQ. Start wherever you are.
          </p>
        </SectionReveal>

        {/* Flagship */}
        <SectionReveal>
          <ArcLabel>Flagship Playbook</ArcLabel>
        </SectionReveal>
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <LibraryCard
            title={librarySlp.title}
            oneLiner={librarySlp.oneLiner}
            priceLabel={librarySlp.price}
            href={librarySlp.href}
            image={librarySlp.image}
          />
        </SectionReveal>

        {/* Business Arc */}
        <SectionReveal>
          <ArcLabel marginTop="2.5rem">Business Arc</ArcLabel>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiBusinessArc.map(card => (
            <LibraryCard
              key={card.title}
              title={card.title}
              oneLiner={card.oneLiner}
              priceLabel={card.price}
              href={card.href}
              image={card.image}
            />
          ))}
        </SectionReveal>

        {/* Personal Arc */}
        <SectionReveal>
          <ArcLabel marginTop="2.5rem">Personal Arc</ArcLabel>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiPersonalArc.map(card => (
            <LibraryCard
              key={card.title}
              title={card.title}
              oneLiner={card.oneLiner}
              priceLabel={card.price}
              href={card.href}
              image={card.image}
            />
          ))}
        </SectionReveal>

        {/* Bundles */}
        <SectionReveal>
          <ArcLabel marginTop="2.5rem">Bundles</ArcLabel>
        </SectionReveal>
        <SectionReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiBundles.map(card => (
            <LibraryCard
              key={card.title}
              title={card.title}
              oneLiner={card.oneLiner}
              priceLabel={`${card.bundlePrice} · ${card.savings}`}
              href={card.href}
              image={card.image}
            />
          ))}
        </SectionReveal>

        {/* Close */}
        <SectionReveal>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
              maxWidth: '34em',
              marginTop: '3.5rem',
            }}
          >
            Prefer to wander first? The <Link href="/blog" style={{ color: 'var(--color-accent-hover)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>writing</Link> is the open door, and the products are where the practice deepens.
          </p>
        </SectionReveal>
      </section>
    </>
  )
}
