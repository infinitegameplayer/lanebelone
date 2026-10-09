import type { MetadataRoute } from 'next'
import { ALL_SLUGS, getAllPosts } from '@/lib/blog'
import routeDates from '@/lib/route-dates.json'

// Static-route lastModified comes from src/lib/route-dates.json, written by
// scripts/route-dates.mjs (prebuild) from the last commit that touched each page file.
const dates = routeDates as Record<string, string>
function dateFor(path: string): Date {
  const iso = dates[path]
  if (!iso) throw new Error(`sitemap: no date for ${path} in src/lib/route-dates.json (add it to scripts/route-dates.mjs ROUTES and run npm run route-dates)`)
  return new Date(iso)
}

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
    { url: base, changeFrequency: 'weekly', priority: 1.0, lastModified: dateFor('/') },
    { url: `${base}/speaking`, changeFrequency: 'monthly', priority: 0.9, lastModified: dateFor('/speaking') },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8, lastModified: dateFor('/about') },
    { url: `${base}/joyful-sovereignty`, changeFrequency: 'monthly', priority: 0.8, lastModified: dateFor('/joyful-sovereignty') },
    { url: `${base}/library`, changeFrequency: 'monthly', priority: 0.8, lastModified: dateFor('/library') },
    { url: `${base}/links`, changeFrequency: 'monthly', priority: 0.5, lastModified: dateFor('/links') },
    { url: `${base}/cite`, changeFrequency: 'monthly', priority: 0.6, lastModified: dateFor('/cite') },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.7, lastModified: dateFor('/blog') },
    ...blogEntries,
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3, lastModified: dateFor('/privacy') },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3, lastModified: dateFor('/terms') },
  ]
}
