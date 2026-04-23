import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogCard from '@/components/BlogCard'
import SubstackSubscribeEmbed from '@/components/SubstackSubscribeEmbed'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays and articles by Lane Belone on the infinite game, clearer perception and the art of living freely.',
  alternates: {
    canonical: 'https://www.lanebelone.com/blog',
  },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://www.lanebelone.com/blog#blog',
    url: 'https://www.lanebelone.com/blog',
    name: 'Lane Belone — Writing',
    description: 'Essays on the infinite game, sovereignty, flow and perception.',
    author: { '@id': 'https://www.lanebelone.com/#person' },
    publisher: { '@id': 'https://www.lanebelone.com/#organization' },
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.lanebelone.com/blog/f/${post.slug}`,
      name: post.title,
    })),
  }

  return (
    <section className="section pt-40 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="max-w-5xl mx-auto">
        <h1
          className="text-5xl md:text-7xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Writing
        </h1>
        <p
          className="text-parchment/60 text-lg max-w-xl mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Essays and breadcrumbs from the infinite game.
        </p>
        <div className="mb-12">
          <SubstackSubscribeEmbed variant="slim" />
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-parchment/40" style={{ fontFamily: 'var(--font-body)' }}>
            No articles found.
          </p>
        )}
      </div>
    </section>
  )
}
