import type { Metadata } from 'next'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Joyful Sovereignty',
  description: "Joyful Sovereignty is Lane Belone's approach to playing the Infinite Game through joy, sovereignty and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort.",
  alternates: {
    canonical: 'https://www.lanebelone.com/joyful-sovereignty',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Joyful Sovereignty · Lane Belone',
    description: "Joyful Sovereignty is Lane Belone's approach to playing the Infinite Game through joy, sovereignty and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort.",
    url: 'https://www.lanebelone.com/joyful-sovereignty',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joyful Sovereignty · Lane Belone',
    description: "Joyful Sovereignty is Lane Belone's approach to playing the Infinite Game through joy, sovereignty and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort.",
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Joyful Sovereignty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Joyful Sovereignty is a quality of presence in which life is inhabited fully, from the inside, with spaciousness, playfulness and genuine peace. It is not a destination but a way of moving. Sovereignty is understood as a birthright, not something to fight for. The phrase "the whole game, played from the inside" captures its essence.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Infinite Game?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Infinite Game is life played to keep playing, not to win. Finite arcs — projects, quests, retreats, creative sprints — create structure and texture within the infinite whole. Challenges become worthy rivals, not enemies. Failures are growth obstacles, not permanent defeats. The infinite game never stops.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Playgrounds of Exploration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Playgrounds of Exploration is Lane Belone\'s framework for architecting each part of the day as a distinct playground with its own energy and essence. The morning, midday, afternoon, evening and night each move like tracks on a playlist. Designing these playgrounds is itself an expression of Joyful Sovereignty.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Perception Upgrade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Perception Upgrade is the recognition that reality is decoded, not given. Based on your internal orientation, life responds in kind. Perception upgrades are available every moment. Setting an internal orientation of aliveness and synchronicity lets life respond in kind.',
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lanebelone.com/' },
    { '@type': 'ListItem', position: 2, name: 'Joyful Sovereignty', item: 'https://www.lanebelone.com/joyful-sovereignty' },
  ],
}

export default function JoyfulSovereigntyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden grain-overlay">
        <Image
          src="/images/bg-sacred-valley.jpg"
          alt="Sacred Valley"
          fill
          className="object-cover"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1510]/70 via-[#0c1510]/60 to-[#0c1510]" />
        <div className="relative z-10 section pt-32 pb-20">
          <h1
            className="hero-line hero-line-1 text-6xl md:text-8xl mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Joyful Sovereignty
          </h1>
          <p
            className="hero-line hero-line-2 text-xl md:text-2xl text-parchment/55 max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            Spacious. Playful. At peace. The whole game, played from the inside.
          </p>
        </div>
      </section>

      {/* Section 1: What this is — Sovereign Worldbuilding */}
      <section className="section">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/75 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-3xl md:text-4xl text-parchment mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              What this is
            </h2>
            <p className="text-parchment/90">
              Joyful Sovereignty is Lane Belone&apos;s approach to playing the Infinite
              Game through joy, sovereignty and embodied play rather than strategy
              and optimization. It is a philosophy and a lived practice. When your
              choices come from genuine alignment rather than conditioned obligation,
              there is a felt quality: power without performance, aliveness without
              effort.
            </p>
            <p>
              The word sovereign carries a certain gravity. It points to something earned, fought for, liberated from. And there&apos;s truth in that direction.
            </p>
            <p>
              But when you add joyful to it, the whole energy shifts.
            </p>
            <p>
              What was serious becomes spacious. What was a battle becomes a game. What was a destination becomes a way of moving through life. Joyful Sovereignty is a quality of presence you can inhabit right now.
            </p>
            <p>
              The approach is something simpler and far more powerful: energize something so alive, so light, so deeply at peace, that the old paradigms simply become irrelevant. Made obsolete by the brightness of what replaces them.
            </p>
            <p>
              From the inside, it feels like spaciousness of flow. A subtle smile woven into the day. Rhythmic laughter. Playful mischief. And underneath all of it, a steady, quiet peace. Because you begin to understand that sovereignty is your birthright. It&apos;s what you already are.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Section 2: The infinite game — Flow Intelligence */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/75 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-3xl md:text-4xl text-parchment mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              The infinite game
            </h2>
            <p>
              There are two kinds of games. Finite games are played to win. Infinite games are played to keep the game going.
            </p>
            <p>
              Life is an infinite game.
            </p>
            <p>
              And you get to choose how you play it.
            </p>
            <p>
              The words need, should and have to carry a binding quality. They narrow. They flatten what&apos;s actually a wide-open playing field into something that feels more like an obligation. Joyful Sovereignty releases that. By recognizing that you were always free to choose.
            </p>
            <p>
              You can play the infinite game with joy. With playful mischief. With laughter, with levity, with a smirk at the edge of a challenge. And finite games are the texture of the infinite one. Start something, let it have chapters, let it reach its natural conclusion. Quest it. A retreat in the mountains. A book. A creative sprint. These finite arcs are how you experiment with life. They have structure, rules and a clear game board. And when the game ends, you&apos;re still playing. The infinite game never stops.
            </p>
            <p>
              Structure is the design of the playground.
            </p>
            <p>
              The lived expression of this is what I call Playgrounds of Exploration. Each part of the day is a distinct playground with its own energy and essence. The morning playground. The midday playground. The afternoon playground. The evening. The night. Each one moves like a track on a playlist, seamlessly, deliberately, alive. You architect these. You design them. And the act of that design is itself an expression of joyful sovereignty, because you&apos;re playing the day, not reacting to it.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Section 3: Perception and clarity — The Perception Upgrade */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/75 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-3xl md:text-4xl text-parchment mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Perception and clarity
            </h2>
            <p>
              Reality is not given. It&apos;s decoded.
            </p>
            <p>
              What you experience as your reality is rooted in how you perceive it. The electromagnetic spectrum that human senses can detect is a sliver of what&apos;s measurable. What&apos;s measurable is a sliver of what exists. And beyond the known, beyond the measurable, there are spectrums we don&apos;t have names for yet.
            </p>
            <p>
              Based on your internal orientation, life responds in kind. Set an internal world of struggle, of being at the mercy of the system, of things always being a challenge, and life confirms it. &ldquo;Yes, my dear. As you wish...&rdquo;
            </p>
            <p>
              But understand this mechanism, and something opens.
            </p>
            <p>
              Perception upgrades are available every second of every day. The invitation is always there. Set the intention of the coolest, most joyful, most synchronistic game of life you can imagine playing. Then begin to embody it. Take action from that place. Let the old conditioning, the old programming, release. By no longer feeding it your attention and energy.
            </p>
            <p>
              The intrinsic, radiant joy lives here, in the present moment, in the enjoying of the journey. Enjoy the journey is how I close every exchange. A perceptual declaration of where I&apos;ve chosen to live.
            </p>
            <p>
              When something unconscious surfaces, when a pattern you didn&apos;t know you were running gets illuminated, a choice opens. Do I keep this? Or do I choose something more alive? That moment of illumination is where Joyful Sovereignty becomes most practical. You can&apos;t play freely if you can&apos;t see clearly. And once you can see, the game shifts.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Section 4: How this shows up — Guidance From Within */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/75 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-3xl md:text-4xl text-parchment mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              How this shows up
            </h2>
            <p>
              This philosophy is lived, refined and shared from inside the game.
            </p>
            <p>
              The writing is where the threads surface. Essays and reflections from someone actively playing. Breadcrumbs from the field. Those live at the Substack.
            </p>
            <p>
              In speaking, it becomes an experience. The Perception Upgrade, Sovereign Worldbuilding, Flow Intelligence and Guidance From Within are all doorways into the same open field. Every room becomes an invitation to see more clearly and move more freely.
            </p>
            <p>
              The deeper work, the retreats, the advisory containers, the extended engagements, lives at Side Quest HQ. That&apos;s where Joyful Sovereignty meets real creative and strategic change.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Cross-links */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                The writing
              </p>
              <a
                href="https://lanebelone.substack.com/"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the writing &rarr;
              </a>
            </div>
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Hear this live
              </p>
              <a href="/speaking" className="btn-ghost">
                Invite me to speak &rarr;
              </a>
            </div>
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                The work
              </p>
              <a
                href="https://sidequesthq.co"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Side Quest HQ &rarr;
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
