import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, CARRY_FORWARD_SLUGS } from '@/lib/blog'

// Only statically generate carry-forward slugs. Expired slugs are handled by
// Vercel redirects in vercel.json before this route is reached.
export const dynamicParams = false

export async function generateStaticParams() {
  return CARRY_FORWARD_SLUGS.map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article' }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.heroImage ? [{ url: post.heroImage }] : [],
    },
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: `${post.date}T00:00:00Z`,
    author: {
      '@type': 'Person',
      '@id': 'https://lanebelone.com/#person',
      name: 'Lane Belone',
      url: 'https://lanebelone.com',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://lanebelone.com/#organization',
      name: 'Lane Belone',
    },
    url: `https://lanebelone.com/blog/f/${slug}`,
    ...(post.heroImage && { image: `https://lanebelone.com${post.heroImage}` }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lanebelone.com/' },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://lanebelone.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://lanebelone.com/blog/f/${slug}` },
    ],
  }

  return (
    <article className="pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero image */}
      {post.heroImage && (
        <div className="relative w-full max-h-[480px] overflow-hidden mb-12">
          <div className="relative w-full aspect-[16/7]">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c1510]" />
          </div>
        </div>
      )}

      <div className="section max-w-2xl mx-auto">
        {/* Meta */}
        <p
          className="text-xs text-parchment/40 mb-4 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {formatDate(post.date)}
        </p>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl leading-tight text-parchment mb-10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h1>

        {/* Body */}
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-parchment/10">
          <a
            href="/blog"
            className="text-sm text-parchment/40 hover:text-parchment/70 transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Back to Writing
          </a>
        </div>
      </div>
    </article>
  )
}
