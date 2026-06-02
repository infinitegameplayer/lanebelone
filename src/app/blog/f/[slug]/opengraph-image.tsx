import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { getPostBySlug, CARRY_FORWARD_SLUGS } from '@/lib/blog'

export const alt = 'Lane Belone'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const dynamicParams = false

export function generateStaticParams() {
  return CARRY_FORWARD_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return ogCard({
    eyebrow: post?.category || 'Writing',
    title: post?.title ?? 'Lane Belone',
    footer: 'Lane Belone · lanebelone.com',
  })
}
