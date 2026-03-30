import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Essays and articles by Lane Belone on the infinite game, clearer perception and the art of living freely.',
}

export default function BlogIndexPage() {
  return (
    <section className="section pt-40">
      <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Writing
      </h1>
      <p className="text-parchment/60 text-lg max-w-xl mb-8" style={{ fontFamily: 'var(--font-body)' }}>
        {/* TODO Session C: render article index here */}
        Essays and breadcrumbs from the infinite game.
      </p>
      <a
        href="https://lanebelone.substack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline"
      >
        Read on Substack
      </a>
    </section>
  )
}
