import type { MetadataRoute } from 'next'
import { ALL_SLUGS, getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.lanebelone.com'
  const now = new Date()

  const posts = getAllPosts()
  const postIndex = new Map(posts.map(p => [p.slug, p]))

  const blogEntries: MetadataRoute.Sitemap = ALL_SLUGS.map(slug => {
    const post = postIndex.get(slug)
    const lastModSource = post?.dateModified || post?.date
    const lastModified = lastModSource ? new Date(lastModSource) : now
    const ageInDays = (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24)
    const changeFrequency: 'weekly' | 'monthly' = ageInDays < 30 ? 'weekly' : 'monthly'

    return {
      url: `${base}/blog/f/${slug}`,
      lastModified,
      changeFrequency,
      priority: 0.6,
    }
  })

  return [
    { url: base, changeFrequency: 'weekly', priority: 1.0, lastModified: now },
    { url: `${base}/speaking`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${base}/joyful-sovereignty`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.7, lastModified: now },
    ...blogEntries,
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3, lastModified: now },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3, lastModified: now },
  ]
}
