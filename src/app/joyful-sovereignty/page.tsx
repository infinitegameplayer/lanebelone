import type { Metadata } from 'next'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Joyful Sovereignty',
  description: "Lane Belone's core philosophy: joyful sovereignty, clearer perception and the art of playing an infinite game.",
}

// Session B: This page is a scaffold. Three-engagement build process completes the copy.
// Engagement 1: Structure
// Engagement 2: Copy (Lane present)
// Engagement 3: Detail and polish

export default function JoyfulSovereigntyPage() {
  return (
    <>
      {/* Hero — text only, forest green bloom */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden grain-overlay"
        style={{ background: 'radial-gradient(ellipse at 50% -20%, #2a3a18 0%, #0c1510 60%)' }}
      >
        <div className="section pt-32 pb-20">
          <h1
            className="hero-line hero-line-1 text-6xl md:text-8xl mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Joyful Sovereignty
          </h1>
          <p
            className="hero-line hero-line-2 text-2xl md:text-3xl text-parchment/50"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            Not freedom from. Freedom as.
          </p>
        </div>
      </section>

      {/* Section 1: What this is — Session B */}
      <section className="section">
        <SectionReveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              What this is
            </h2>
            {/* Session B: Replace with Lane's copy on sovereignty as a way of inhabiting your life, not a state to achieve. The "joyful" qualifier — light, expansive, alive. */}
            <p className="text-parchment/40 italic" style={{ fontFamily: 'var(--font-body)' }}>
              [Session B: copy coming]
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Section 2: The infinite game — Session B */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              The infinite game
            </h2>
            {/* Session B: Replace with Lane's copy on the Carse connection — playing to keep the game going, not to win a finite round. Life as a game played for its own sake. */}
            <p className="text-parchment/40 italic" style={{ fontFamily: 'var(--font-body)' }}>
              [Session B: copy coming]
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Section 3: Perception and clarity — Session B */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Perception and clarity
            </h2>
            {/* Session B: Replace with Lane's copy on perception as the foundation of freedom. You can't play freely if you can't see clearly. The ongoing practice of expanding what you can perceive. */}
            <p className="text-parchment/40 italic" style={{ fontFamily: 'var(--font-body)' }}>
              [Session B: copy coming]
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Section 4: How this shows up — Session B */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              How this shows up
            </h2>
            {/* Session B: Replace with Lane's copy on where these ideas meet real life — in writing, in speaking, in the conversations Lane has. Bridge from philosophy to practice. */}
            <p className="text-parchment/40 italic" style={{ fontFamily: 'var(--font-body)' }}>
              [Session B: copy coming]
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
                Hear me speak on this
              </p>
              <a href="/speaking" className="btn-ghost">
                Invite me to speak &rarr;
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
