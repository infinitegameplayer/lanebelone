import type { Metadata } from 'next'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'About',
  description: 'Lane Belone is a writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ, and practitioner of joyful sovereignty and the Infinite Game.',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://lanebelone.com/about#lane-belone',
  name: 'Lane Belone',
  url: 'https://lanebelone.com',
  jobTitle: 'Writer, Speaker and Guide',
  description:
    'Lane Belone is a writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ, and practitioner of joyful sovereignty and the Infinite Game.',
  sameAs: [
    'https://sidequesthq.co',
    'https://infinitegameos.io',
    'https://www.linkedin.com/in/lanebelone/',
    'https://www.instagram.com/increasefreedom/',
    'https://lanebelone.substack.com/',
  ],
}

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: { '@id': 'https://lanebelone.com/about#lane-belone' },
  url: 'https://lanebelone.com/about',
  name: 'About Lane Belone',
  description:
    'Lane Belone is a writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ, and practitioner of joyful sovereignty and the Infinite Game.',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lanebelone.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://lanebelone.com/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero portrait */}
      <section className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/lane-machu-picchu-rotated.webp"
          alt="Lane Belone at Machu Picchu"
          fill
          className="object-cover about-hero-img"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1510] via-[#0c1510]/50 to-transparent" />
        <div className="relative z-10 section pb-16 pt-40">
          <h1
            className="hero-line hero-line-1 text-5xl md:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lane Belone
          </h1>
        </div>
      </section>

      {/* Opening — two-column with portrait */}
      <section className="section">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-xl md:text-2xl text-parchment/90 leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
                Lane Belone is a writer, speaker and guide. Former U.S. Army Green
                Beret, author of <em>Unleash Your Humble Alpha</em>, and founder
                of Side Quest HQ, where he leads workshops, retreats and private
                advisory for founders and leaders playing an infinite game.
              </p>
              <p className="text-parchment/70">
                My work orbits a simple question: how can I flow with aliveness and allow the &ldquo;success&rdquo; to be the byproduct? In retrospect, that question has (often) silently been answered in every chapter of my story. It sent me to Germany. It led me into Special Forces. It brought me to Peru, to Panama, to mountain retreats and deep conversations on many continents. It keeps asking.
              </p>
              <p className="text-parchment/70">
                The through-line has always been the same. I&apos;m a curious explorer at heart, finding harmony in the co-creation of ideas, and telling the story of what happened along the way.
              </p>
            </div>

            {/* Portrait */}
            <div className="relative h-80 md:h-[480px] rounded-[8px] overflow-hidden">
              <Image
                src="/images/lane-headshot-collared.webp"
                alt="Lane Belone"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* The beginning */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-2xl md:text-3xl text-parchment/50 mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              The beginning
            </h2>
            <p>
              I came into the world in humble circumstances. My mother gave birth to me in an apartment and we spent our early years finding footing, loving each other and stumbling along the way. My father wasn&apos;t around growing up, but masculine guidance came through other channels: Boy Scouts, sports, small-town community and faith.
            </p>
            <p>
              I grew up resourceful, curious and quietly ambitious. A lot of drive and no clear map for where to point it.
            </p>
            <p>
              Little did that young boy know where he was heading.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* The call */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-2xl md:text-3xl text-parchment/50 mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              The call
            </h2>
            <p>
              The decision to join the military was part game (rock, paper, scissors lol) and excitement for something new. My first duty station was Germany and I found that the world was much larger than I knew. New environments, new friends, a growing sense that perspective shapes everything.
            </p>
            <p>
              Then a deeper pull arrived. Special Forces. I trained for two years and earned my Green Beret. I deployed internationally, explored dozens of countries. Over more than a decade of service, one insight kept compounding: the same reality reads completely differently depending on the lens you&apos;re looking through.
            </p>
            <p>
              When the call to close the military chapter arrived, subtle, unmistakable, clear, I listened.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* The becoming */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-2xl md:text-3xl text-parchment/50 mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              The becoming
            </h2>
            <p>
              After the military, moved to Panama and I launched business ventures. Most of them didn&apos;t grow the way I envisioned. Somewhere along the way, I flew to Peru for fun and exploration and was introduced to a realm I wasn&apos;t looking for. Plant medicine. Healing modalities. A reconnection with my native heritage. Wisdom traditions across the world. I was integrating life in leaps and bounds during this chapter. Learning to blend profound spiritual wisdom with practical, grounded, imperfect action.
            </p>
            <p>
              Along the way, I met Steven Kuhn. Together we built the Humble Alpha, a book, a community and a framework for leading with humility, depth and genuine strength. The work reached veterans, entrepreneurs and natural leaders navigating the intersection of inner life and outer impact.
            </p>
            <p>
              Toward the end of this chapter, a phrase kept surfacing. <a href="/joyful-sovereignty" className="underline underline-offset-4 transition-colors" style={{ color: 'rgba(232, 228, 240, 0.85)' }}>Joyful Sovereignty</a>. I let it find its shape on its own terms.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* The living */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-2xl md:text-3xl text-parchment/50 mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              The living
            </h2>
            <p>
              In 2022, the calling turned inward. Curiosity became devotion. The adventure shifted from external terrain to the territory of archetype, myth, energy and embodiment. I studied what I think of as the invisible systems: sacred timing, subtle magnetism, soul ecosystems, authentic expression.
            </p>
            <p>
              I redefined what power meant to me. Presence over performance. Depth over volume. Directed stillness over relentless drive.
            </p>
            <p>
              What emerged was Joyful Sovereignty expressed fully. A path, a frequency, a way of inhabiting every day. The whole game, played from the inside.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Today */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl flex flex-col gap-6 text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            <h2 className="text-2xl md:text-3xl text-parchment/50 mb-2" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
              Today
            </h2>
            <p>
              I write, speak and lead experiences from inside that game.
            </p>
            <p>
              My writings carries fresh ideas on joyful and sovereign living that moves through me like an Alive current. Speaking engagements bring the four territories: The Perception Upgrade, Sovereign Worldbuilding, Flow Intelligence and Guidance From Within, into rooms where something real needs to open.
            </p>
            <p>
              At Side Quest HQ, I lead retreats, workshops and advisory containers for founders and creators who want to operate from a deeper, more alive place.
            </p>
            <p>
              The intention has always been the same: help people move in a more beautiful direction.
            </p>
            <p className="text-parchment/60" style={{ fontFamily: 'var(--font-display)' }}>
              Lane
            </p>
            <p className="text-parchment/50 italic" style={{ fontFamily: 'var(--font-display)' }}>
              Enjoy the Journey
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Cross-links */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
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
                Bring this to your audience
              </p>
              <a href="/speaking" className="btn-ghost">
                Invite me to speak &rarr;
              </a>
            </div>
            <div>
              <p className="text-parchment/50 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Start a conversation
              </p>
              <a href="mailto:howdy@lanebelone.com" className="btn-ghost">
                Reach out &rarr;
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
