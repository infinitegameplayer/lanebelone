import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Article',
}

// TODO Session C: Implement full article page
// Route: /blog/f/[slug]
// This route preserves SEO continuity with the existing lanebelone.com URL structure
// All 37 carry-forward articles must be served at this path

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <section className="section pt-40">
      <p className="text-parchment/40 italic" style={{ fontFamily: 'var(--font-body)' }}>
        {/* TODO Session C: render article for {params.slug} */}
        Article loading...
      </p>
    </section>
  )
}
