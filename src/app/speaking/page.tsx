import type { Metadata } from 'next'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import HubSpotForm from '@/components/HubSpotForm'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Lane Belone speaks on the infinite game, perception, flow and leadership. Keynotes, workshops, retreats and private sessions.',
}

const topics = [
  {
    title: 'The Perception Upgrade',
    subtitle: 'Seeing reality through a more empowered lens',
    body: 'Guides audiences into renewed clarity through metaphor, perspective-shifts and practical tools. Covers the infinite game mindset, Side Quest psychology, pattern-recognition and expanding what you can perceive.',
  },
  {
    title: 'Sovereign Worldbuilding',
    subtitle: 'Designing the systems, environments and structures that shape your life and leadership',
    body: 'How to shape your world intentionally through personal rhythms, boundaries, team culture and organizational architecture. Explores reality design frameworks, natural law and structural coherence.',
  },
  {
    title: 'Flow Intelligence',
    subtitle: 'Unlocking creative rhythm, nervous system balance and sustainable momentum',
    body: 'Reconnects people with creative energy through embodied rhythm and emotional awareness. Covers flow science, archetypal flow states and the practical mechanics of staying in motion.',
  },
  {
    title: 'Guidance From Within',
    subtitle: 'Intuition, decision-making and moving through uncertainty with confidence',
    body: 'Teaches participants to interpret subtle signals and trust their inner compass. Topics include next-move sensing, signal interpretation and making clear decisions in complex environments.',
  },
]

const formats = [
  'Keynotes for conferences and summits',
  'Workshops for leadership teams',
  'Retreat sessions and multi-day experiences',
  'Nature-based activations and embodied adventures',
  'Private sessions for founders and visionaries',
]

// TODO: Replace with actual HubSpot Speaking Inquiry form ID (portal 23478458)
const SPEAKING_FORM_ID = 'TODO_SPEAKING_FORM_ID'

export default function SpeakingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/lane-cowboy-action.webp"
          alt="Lane Belone speaking"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 30%' }}
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1510] via-[#0c1510]/40 to-transparent" />
        <div className="relative z-10 section pb-16 pt-40">
          <h1
            className="hero-line hero-line-1 text-5xl md:text-7xl mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Design. Play. Master.
          </h1>
          <p
            className="hero-line hero-line-2 text-lg md:text-xl text-parchment/70 max-w-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Inviting leaders, creators and communities into experiences that spark clarity, presence, creativity and transformational insight.
          </p>
        </div>
      </section>

      {/* What I speak about */}
      <section className="section">
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: 'var(--font-display)' }}>
            What I speak about
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic) => (
              <div key={topic.title} className="dark-card p-8">
                <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {topic.title}
                </h3>
                <p className="text-parchment/50 text-sm mb-4 italic" style={{ fontFamily: 'var(--font-body)' }}>
                  {topic.subtitle}
                </p>
                <p className="text-parchment/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {topic.body}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Formats */}
      <section className="section border-t border-white/5">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                How I show up
              </h2>
              <ul className="flex flex-col gap-3" style={{ fontFamily: 'var(--font-body)' }}>
                {formats.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-parchment/70">
                    <span className="text-parchment/30 mt-1">&#x2014;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-parchment/60 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              <p>
                Whether it&apos;s a keynote for five hundred people or an intimate session for a leadership team, the intention is the same: open something real, leave people with a clearer sense of what&apos;s possible.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Inquiry CTA */}
      <section className="section border-t border-white/5" id="speak">
        <SectionReveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Invite me to speak
            </h2>
            <p className="text-parchment/60 mb-10 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Tell me about your event — the audience, the moment, what you&apos;re hoping to open. If there&apos;s a fit, we&apos;ll figure out the next step.
            </p>
            <HubSpotForm formId={SPEAKING_FORM_ID} />
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
