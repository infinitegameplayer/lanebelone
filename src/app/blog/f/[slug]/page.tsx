import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, CARRY_FORWARD_SLUGS } from '@/lib/blog'
import ReadingProgress from '@/components/ReadingProgress'
import SubstackSubscribeEmbed from '@/components/SubstackSubscribeEmbed'

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
    alternates: {
      canonical: `https://www.lanebelone.com/blog/f/${slug}`,
    },
    openGraph: {
      siteName: 'Lane Belone',
      locale: 'en_US',
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://www.lanebelone.com/blog/f/${slug}`,
      publishedTime: `${post.date}T00:00:00Z`,
      modifiedTime: `${post.dateModified || post.date}T00:00:00Z`,
      images: post.heroImage ? [{ url: post.heroImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : [],
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

  const articleJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://www.lanebelone.com/blog/f/${slug}#article`,
    mainEntityOfPage: `https://www.lanebelone.com/blog/f/${slug}`,
    headline: post.title,
    description: post.description,
    datePublished: `${post.date}T00:00:00Z`,
    dateModified: `${post.dateModified || post.date}T00:00:00Z`,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      '@id': 'https://www.lanebelone.com/#person',
      name: 'Lane Belone',
      url: 'https://www.lanebelone.com',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.lanebelone.com/#organization',
      name: 'Lane Belone',
    },
    url: `https://www.lanebelone.com/blog/f/${slug}`,
    ...(post.heroImage && { image: `https://www.lanebelone.com${post.heroImage}` }),
    ...(post.wordCount && { wordCount: post.wordCount }),
    ...(post.articleSection && { articleSection: post.articleSection }),
    ...(post.about && post.about.length > 0 && {
      about: post.about.map(id => ({ '@id': id })),
    }),
    ...(post.mentions && post.mentions.length > 0 && {
      mentions: post.mentions.map(id => ({ '@id': id })),
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lanebelone.com/' },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://www.lanebelone.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.lanebelone.com/blog/f/${slug}` },
    ],
  }

  return (
    <article className="pt-32 pb-24">
      <ReadingProgress />
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

        {/* Subscribe embed */}
        <div className="mt-16 pt-8 border-t border-parchment/10">
          <SubstackSubscribeEmbed variant="full" />
        </div>

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
