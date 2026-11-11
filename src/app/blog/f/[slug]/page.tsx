import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getAllPosts,
  getPostBySlug,
  CARRY_FORWARD_SLUGS,
  articleJsonLd as buildArticleJsonLd,
  articleBreadcrumbJsonLd,
  schemaDate,
} from '@/lib/blog'
import ReadingProgress from '@/components/ReadingProgress'
import ArticlesSubscribeForm from '@/components/ArticlesSubscribeForm'
import MobileBottomBar from '@/components/MobileBottomBar'
import GoldButton from '@/components/GoldButton'

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
  const metaTitle = post.seoTitle ?? post.title
  return {
    title: { absolute: metaTitle },
    description: post.description,
    alternates: {
      canonical: `https://www.lanebelone.com/blog/f/${slug}`,
      types: {
        'text/markdown': `https://www.lanebelone.com/markdown/blog/f/${slug}`,
        'application/rss+xml': 'https://www.lanebelone.com/rss.xml',
      },
    },
    openGraph: {
      siteName: 'Lane Belone',
      locale: 'en_US',
      title: metaTitle,
      description: post.description,
      type: 'article',
      url: `https://www.lanebelone.com/blog/f/${slug}`,
      authors: [post.authorUrl ?? 'https://www.lanebelone.com'],
      publishedTime: schemaDate(post.date),
      modifiedTime: schemaDate(post.dateModified || post.date),
      images: post.heroImage ? [{ url: post.heroImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : [],
    },
    other: {
      author: post.author ?? 'Lane Belone',
    },
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  // UTC, as in BlogCard: a date-only string is UTC midnight (2026-11-05).
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleJsonLd = buildArticleJsonLd(post)
  const breadcrumbJsonLd = articleBreadcrumbJsonLd(post)

  return (
    <article className="pt-32 pb-24">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero image (mobile): full-bleed at top */}
      {post.heroImage && (
        <div className="md:hidden relative w-full max-h-[480px] overflow-hidden mb-12">
          <div className="relative w-full aspect-16/7">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-forest-900" />
          </div>
        </div>
      )}

      {/* The column holds the post to about 67 characters a line at desktop width.
          `.section` sets max-width: 1100px outside any layer, which beat the
          max-w-2xl utility, so posts ran 121 to 136 a line at 1440 px until
          2026-11-05 (Site Update). The ! keeps the utility above it. */}
      <div className="section max-w-[38rem]! mx-auto">
        {/* Meta */}
        <p
          className="text-xs text-parchment/40 mb-4 tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {formatDate(post.date)}
        </p>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl leading-tight md:leading-none text-parchment mb-10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.title}
        </h1>

        {/* Hero image (desktop): contained below title */}
        {post.heroImage && (
          <div className="hidden md:block relative w-full mb-10 rounded-lg overflow-hidden">
            <div className="relative w-full aspect-16/7">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 768px) 672px, 100vw"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div
          id="article-body"
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Lead magnet CTA: One Alive Thing */}
        <div className="mt-16 pt-8 border-t border-parchment/10">
          <div className="rounded-xl border border-gold-from/30 bg-gold-from/5 p-6">
            <p
              className="text-parchment/85 mb-5 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Something in you that wants to move? One Alive Thing is a free mini side quest, a finite adventure you choose inside the Infinite Game. Find it, name it and make it real in under an hour.
            </p>
            <GoldButton href="https://www.sidequesthq.co/one-alive-thing" external>
              Start your One Alive Thing
            </GoldButton>
          </div>
        </div>

        {/* Subscribe embed */}
        <div className="mt-16 pt-8 border-t border-parchment/10">
          <ArticlesSubscribeForm />
        </div>

        {/* Mobile bottom bar: rises 70 percent through the essay, steps aside at the form above */}
        <MobileBottomBar
          kind="articles"
          formName="lanebelone-articles"
          triggerId="article-body"
          triggerRatio={0.7}
          avoidId="subscribe"
          line="Get new writing by email"
          button="Subscribe"
          placeholder="Your email"
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
