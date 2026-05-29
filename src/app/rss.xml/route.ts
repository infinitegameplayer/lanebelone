import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

const SITE = 'https://www.lanebelone.com'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()
  const buildDate = posts[0]?.date ? new Date(`${posts[0].date}T12:00:00Z`) : new Date(0)

  const items = posts
    .map(post => {
      const url = `${SITE}/blog/f/${post.slug}`
      const pubDate = new Date(`${post.date}T12:00:00Z`).toUTCString()
      const category = post.category ? `\n      <category>${escapeXml(post.category)}</category>` : ''
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description || '')}</description>${category}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lane Belone</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Essays and breadcrumbs on the Infinite Game, joyful sovereignty, flow and perception.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
