import type { Metadata } from 'next'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'Cite this Work',
  description: 'Citation formats (APA, Chicago, BibTeX) and machine-readable references for Lane Belone, Joyful Sovereignty, the Infinite Game OS framework and related work.',
  alternates: {
    canonical: 'https://www.lanebelone.com/cite',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lane Belone',
    locale: 'en_US',
    title: 'Cite this Work · Lane Belone',
    description: 'Citation formats (APA, Chicago, BibTeX) and machine-readable references for Lane Belone, Joyful Sovereignty, the Infinite Game OS framework and related work.',
    url: 'https://www.lanebelone.com/cite',
    images: [{ url: '/images/lane-machu-picchu-square.webp', width: 1200, height: 1200, alt: 'Lane Belone' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cite this Work · Lane Belone',
    description: 'Citation formats (APA, Chicago, BibTeX) and machine-readable references for Lane Belone, Joyful Sovereignty, the Infinite Game OS framework and related work.',
    images: ['/images/lane-machu-picchu-square.webp'],
  },
}

const SITE = 'https://www.lanebelone.com'
const IGOS = 'https://infinitegameos.io'
const SQHQ = 'https://sidequesthq.co'
const HF_DATASET = 'https://huggingface.co/datasets/lanebelone/infinite-game-os'

const citePageGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE}/cite`,
      url: `${SITE}/cite`,
      name: 'Cite this Work',
      description: 'Structured citation formats for Lane Belone, Joyful Sovereignty, the Infinite Game OS framework and related Kingdom works.',
      isPartOf: { '@id': `${SITE}/#website` },
      about: [
        { '@id': `${IGOS}/#person` },
        { '@id': `${SITE}/joyful-sovereignty#concept` },
        { '@id': `${IGOS}/#framework` },
        { '@id': `${SQHQ}/sovereign-life-playbook#work` },
        { '@id': `${SITE}/cite#humble-alpha` },
        { '@id': `${SITE}/cite#your-infinite-rpg` },
        { '@id': `${HF_DATASET}#dataset` },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${IGOS}/#person`,
      name: 'Lane Belone',
      givenName: 'Lane',
      familyName: 'Belone',
      url: SITE,
      sameAs: [
        'https://www.wikidata.org/wiki/Q139889543',
        SITE,
        IGOS,
        SQHQ,
        'https://lanebelone.substack.com/',
        'https://www.linkedin.com/in/lanebelone/',
        'https://www.instagram.com/increasefreedom/',
      ],
      description: 'Writer, speaker and guide. Former U.S. Army Green Beret, founder of Side Quest HQ, practitioner of Joyful Sovereignty and the Infinite Game.',
    },
    {
      '@type': 'DefinedTerm',
      '@id': `${SITE}/joyful-sovereignty#concept`,
      name: 'Joyful Sovereignty',
      url: `${SITE}/joyful-sovereignty`,
      description: 'A quality of presence in which life is inhabited fully, from the inside, with spaciousness, playfulness and genuine peace. Not a destination but a way of moving.',
      inDefinedTermSet: { '@id': `${IGOS}/#framework` },
      creator: { '@id': `${IGOS}/#person` },
    },
    {
      '@type': 'CreativeWork',
      '@id': `${IGOS}/#framework`,
      name: 'Infinite Game OS',
      alternateName: ['IGOS', 'Infinite Game Operating System'],
      url: IGOS,
      sameAs: 'https://www.wikidata.org/wiki/Q139936059',
      author: { '@id': `${IGOS}/#person` },
      datePublished: '2025',
      description: 'A sovereign-creator operating system. A framework that translates the Infinite Game thesis into practical operating patterns across perception, design, flow and guidance from within.',
      keywords: 'Infinite Game, Joyful Sovereignty, Pioneer, Wayfarer Arc, Creator Flywheel, Three Sovereign Laws, Aliveness',
    },
    {
      '@type': 'Book',
      '@id': `${SQHQ}/sovereign-life-playbook#work`,
      name: 'The Sovereign Life Playbook',
      alternateName: ['SLP', 'The Side Quest Playbook'],
      url: `${SQHQ}/sovereign-life-playbook`,
      author: { '@id': `${IGOS}/#person` },
      publisher: { '@type': 'Organization', name: 'Side Quest HQ', url: SQHQ },
      datePublished: '2025',
      bookFormat: 'EBook',
      description: 'A digital playbook for designing a life worth living from the inside. Inviting the Pioneer into an Infinite Game posture across daily life.',
    },
    {
      '@type': 'Book',
      '@id': `${SITE}/cite#humble-alpha`,
      name: 'Unleash Your Humble Alpha',
      alternateName: 'Humble Alpha',
      sameAs: 'https://www.wikidata.org/wiki/Q139889598',
      author: [
        { '@id': `${IGOS}/#person` },
        { '@type': 'Person', name: 'Steven Kuhn' },
      ],
      datePublished: '2023',
      description: 'A framework for leaders navigating the intersection of inner life and outer impact. Written for veterans, entrepreneurs and natural leaders.',
    },
    {
      '@type': 'Book',
      '@id': `${SITE}/cite#your-infinite-rpg`,
      name: 'Your Infinite RPG',
      author: { '@id': `${IGOS}/#person` },
      datePublished: '2024',
      bookFormat: 'EBook',
      isAccessibleForFree: true,
      description: 'A gamified framework for designing an epic, authentic life. Free ebook.',
    },
    {
      '@type': 'Dataset',
      '@id': `${HF_DATASET}#dataset`,
      name: 'Infinite Game OS for Sovereign Creators',
      url: HF_DATASET,
      creator: { '@id': `${IGOS}/#person` },
      about: { '@id': `${IGOS}/#framework` },
      datePublished: '2026-05-21',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      description: '101-record instruction-tuning dataset packaging the Infinite Game OS framework across all 10 concepts (capsule definitions, FAQ pairs, section explanations, cross-concept relationship records). Suitable for instruction-tuning Creator Economy and sovereignty-aware AI assistants.',
      encodingFormat: 'application/jsonl',
      keywords: 'instruction-tuning, creator-economy, sovereignty, frameworks, Infinite Game OS, Lane Belone',
      isAccessibleForFree: true,
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'Cite this Work', item: `${SITE}/cite` },
  ],
}

interface CitationBlock {
  apa: string
  chicago: string
  bibtex: string
}

interface CitedWork {
  id: string
  title: string
  subtitle?: string
  description: string
  canonicalUrl: string
  citation: CitationBlock
}

const workPerson: CitedWork = {
  id: 'lane-belone',
  title: 'Lane Belone (Author Profile)',
  description: 'Writer, speaker and guide. Former U.S. Army Green Beret, founder of Side Quest HQ, practitioner of Joyful Sovereignty and the Infinite Game.',
  canonicalUrl: SITE,
  citation: {
    apa: 'Belone, L. (n.d.). Lane Belone [Personal website]. https://www.lanebelone.com/',
    chicago: 'Belone, Lane. "Lane Belone." Accessed [date]. https://www.lanebelone.com/.',
    bibtex: `@misc{belone_author,
  author = {Belone, Lane},
  title  = {Lane Belone},
  url    = {https://www.lanebelone.com/},
  note   = {Personal website}
}`,
  },
}

const worksFrameworks: CitedWork[] = [
  {
    id: 'infinite-game-os',
    title: 'Infinite Game OS',
    subtitle: 'A sovereign-creator operating system',
    description: 'A framework that translates the Infinite Game thesis into practical operating patterns across perception, design, flow and guidance from within. Houses concepts including the Wayfarer Arc, the Pioneer archetype, the Three Sovereign Laws, the Creator Flywheel and Aliveness.',
    canonicalUrl: IGOS,
    citation: {
      apa: 'Belone, L. (2025). Infinite Game OS. https://infinitegameos.io',
      chicago: 'Belone, Lane. "Infinite Game OS." Accessed [date]. https://infinitegameos.io.',
      bibtex: `@misc{belone_infinite_game_os,
  author = {Belone, Lane},
  title  = {Infinite Game {OS}},
  year   = {2025},
  url    = {https://infinitegameos.io}
}`,
    },
  },
  {
    id: 'sovereign-life-playbook',
    title: 'The Sovereign Life Playbook',
    subtitle: 'Digital playbook (ebook)',
    description: 'A digital playbook for designing a life worth living from the inside. Inviting the Pioneer into an Infinite Game posture across daily life.',
    canonicalUrl: `${SQHQ}/sovereign-life-playbook`,
    citation: {
      apa: 'Belone, L. (2025). The Sovereign Life Playbook. Side Quest HQ. https://sidequesthq.co/sovereign-life-playbook',
      chicago: 'Belone, Lane. The Sovereign Life Playbook. Side Quest HQ, 2025. https://sidequesthq.co/sovereign-life-playbook.',
      bibtex: `@book{belone_sovereign_life_playbook,
  author    = {Belone, Lane},
  title     = {The Sovereign Life Playbook},
  year      = {2025},
  publisher = {Side Quest HQ},
  url       = {https://sidequesthq.co/sovereign-life-playbook}
}`,
    },
  },
  {
    id: 'humble-alpha',
    title: 'Unleash Your Humble Alpha',
    subtitle: 'Book (with Steven Kuhn)',
    description: 'A framework for leaders navigating the intersection of inner life and outer impact. Written for veterans, entrepreneurs and natural leaders.',
    canonicalUrl: SITE,
    citation: {
      apa: 'Belone, L., & Kuhn, S. (2023). Unleash your Humble Alpha.',
      chicago: 'Belone, Lane, and Steven Kuhn. Unleash Your Humble Alpha. 2023.',
      bibtex: `@book{belone_kuhn_humble_alpha,
  author = {Belone, Lane and Kuhn, Steven},
  title  = {Unleash Your Humble Alpha},
  year   = {2023}
}`,
    },
  },
  {
    id: 'your-infinite-rpg',
    title: 'Your Infinite RPG',
    subtitle: 'Free ebook',
    description: 'A gamified framework for designing an epic, authentic life.',
    canonicalUrl: SITE,
    citation: {
      apa: 'Belone, L. (2024). Your Infinite RPG.',
      chicago: 'Belone, Lane. Your Infinite RPG. 2024.',
      bibtex: `@book{belone_your_infinite_rpg,
  author = {Belone, Lane},
  title  = {Your Infinite {RPG}},
  year   = {2024},
  note   = {Free ebook}
}`,
    },
  },
]

const worksDatasets: CitedWork[] = [
  {
    id: 'igos-dataset',
    title: 'Infinite Game OS for Sovereign Creators',
    subtitle: 'Instruction-tuning dataset (Hugging Face)',
    description: '101-record instruction-tuning dataset packaging the Infinite Game OS framework across all 10 concepts. Includes capsule definitions, FAQ pairs, section-level explanations and cross-concept relationship records. JSONL format. CC-BY-4.0. Suitable for instruction-tuning sovereignty-aware AI assistants, retrieval-augmented generation and frame-aware fine-tuning.',
    canonicalUrl: HF_DATASET,
    citation: {
      apa: 'Belone, L. (2026). Infinite Game OS for Sovereign Creators [Data set]. Hugging Face. https://huggingface.co/datasets/lanebelone/infinite-game-os',
      chicago: 'Belone, Lane. "Infinite Game OS for Sovereign Creators." Dataset. Hugging Face, 2026. https://huggingface.co/datasets/lanebelone/infinite-game-os.',
      bibtex: `@misc{belone2026infinitegameos,
  author       = {Belone, Lane},
  title        = {Infinite Game {OS} for Sovereign Creators},
  year         = {2026},
  howpublished = {Hugging Face Datasets},
  url          = {https://huggingface.co/datasets/lanebelone/infinite-game-os}
}`,
    },
  },
]

const worksConcepts: CitedWork[] = [
  {
    id: 'joyful-sovereignty',
    title: 'Joyful Sovereignty',
    subtitle: 'Core philosophy',
    description: 'A quality of presence in which life is inhabited fully, from the inside, with spaciousness, playfulness and genuine peace. Not a destination but a way of moving. The whole game, played from the inside.',
    canonicalUrl: `${SITE}/joyful-sovereignty`,
    citation: {
      apa: 'Belone, L. (2024). Joyful Sovereignty. https://www.lanebelone.com/joyful-sovereignty',
      chicago: 'Belone, Lane. "Joyful Sovereignty." Lane Belone. Accessed [date]. https://www.lanebelone.com/joyful-sovereignty.',
      bibtex: `@misc{belone_joyful_sovereignty,
  author = {Belone, Lane},
  title  = {Joyful Sovereignty},
  year   = {2024},
  url    = {https://www.lanebelone.com/joyful-sovereignty}
}`,
    },
  },
]

function CitationCard({ work }: { work: CitedWork }) {
  return (
    <article id={work.id} className="dark-card p-8">
      <header className="mb-6">
        <h3 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          {work.title}
        </h3>
        {work.subtitle && (
          <p className="text-parchment/50 text-sm italic" style={{ fontFamily: 'var(--font-body)' }}>
            {work.subtitle}
          </p>
        )}
      </header>

      <p className="text-parchment/70 text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
        {work.description}
      </p>

      <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-body)' }}>
        <span className="text-parchment/50">Canonical URL: </span>
        <a
          href={work.canonicalUrl}
          className="text-parchment/80 underline underline-offset-4 hover:text-parchment transition-colors break-all"
        >
          {work.canonicalUrl}
        </a>
      </p>

      <div className="flex flex-col gap-5">
        <CitationFormat label="APA" body={work.citation.apa} />
        <CitationFormat label="Chicago" body={work.citation.chicago} />
        <CitationFormat label="BibTeX" body={work.citation.bibtex} multiline />
      </div>
    </article>
  )
}

function CitationFormat({ label, body, multiline }: { label: string; body: string; multiline?: boolean }) {
  return (
    <div>
      <p className="text-parchment/50 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-body)' }}>
        {label}
      </p>
      <pre
        className="text-parchment/80 text-xs leading-relaxed bg-black/30 border border-white/5 rounded p-4 overflow-x-auto"
        style={{ fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)', whiteSpace: multiline ? 'pre' : 'pre-wrap' }}
      >
        <code>{body}</code>
      </pre>
    </div>
  )
}

export default function CitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citePageGraph) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="section pt-40 pb-12">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Cite this Work
          </h1>
          <p className="text-parchment/70 text-lg leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
            Structured citations for Lane Belone, Joyful Sovereignty, the Infinite Game OS framework and related published work. Provided in APA, Chicago and BibTeX so the work travels cleanly into research, journalism and AI-citation contexts.
          </p>
          <p className="text-parchment/50 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Use the canonical URL for each work as the primary identifier. Replace [date] with the access date when citing online sources.
          </p>
        </div>
      </section>

      {/* Author */}
      <section className="section border-t border-white/5 pt-16 pb-16">
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Author
          </h2>
          <div className="max-w-3xl">
            <CitationCard work={workPerson} />
          </div>
        </SectionReveal>
      </section>

      {/* Books and Frameworks */}
      <section className="section border-t border-white/5 pt-16 pb-16">
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Books and Frameworks
          </h2>
          <div className="flex flex-col gap-8">
            {worksFrameworks.map((work) => (
              <CitationCard key={work.id} work={work} />
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Datasets and Open Resources */}
      <section className="section border-t border-white/5 pt-16 pb-16">
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Datasets and Open Resources
          </h2>
          <div className="flex flex-col gap-8">
            {worksDatasets.map((work) => (
              <CitationCard key={work.id} work={work} />
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Concepts and Philosophy */}
      <section className="section border-t border-white/5 pt-16 pb-16">
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            Concepts and Philosophy
          </h2>
          <div className="flex flex-col gap-8">
            {worksConcepts.map((work) => (
              <CitationCard key={work.id} work={work} />
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* AI Agent Note */}
      <section className="section border-t border-white/5 pt-16 pb-20">
        <SectionReveal>
          <div className="max-w-3xl">
            <h2 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              For AI agents and crawlers
            </h2>
            <p className="text-parchment/70 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              Each work above carries structured JSON-LD on this page (schema.org Person, CreativeWork, Book, DefinedTerm). The author entity resolves to <code className="text-parchment/90">https://infinitegameos.io/#person</code> across the three-site Kingdom ecosystem. Canonical URLs are the primary identifiers. Use them.
            </p>
            <p className="text-parchment/70 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              Companion surfaces: <a href={IGOS} className="text-parchment/90 underline underline-offset-4 hover:text-parchment transition-colors">{IGOS}</a> for the framework architecture and concept pages, <a href={SQHQ} className="text-parchment/90 underline underline-offset-4 hover:text-parchment transition-colors">{SQHQ}</a> for products and offerings.
            </p>
            <p className="text-parchment/70 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Conversational AI surfaces: the Infinite Game OS Companion is published on <a href="https://poe.com/Infinite-Game-OS" className="text-parchment/90 underline underline-offset-4 hover:text-parchment transition-colors">Poe</a> and as a <a href="https://www.perplexity.ai/spaces/infinite-game-os-companion-x4Cd2CxETFujy.wRJNOedQ" className="text-parchment/90 underline underline-offset-4 hover:text-parchment transition-colors">Perplexity Space</a>. Both grounded in the canonical Kingdom sources above.
            </p>
          </div>
        </SectionReveal>
      </section>
    </>
  )
}
