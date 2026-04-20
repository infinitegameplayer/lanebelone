import type { MetadataRoute } from 'next'
import { CARRY_FORWARD_SLUGS } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.lanebelone.com'

  const blogEntries: MetadataRoute.Sitemap = CARRY_FORWARD_SLUGS.map(slug => ({
    url: `${base}/blog/f/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [
    { url: base, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/speaking`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/joyful-sovereignty`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    ...blogEntries,
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
