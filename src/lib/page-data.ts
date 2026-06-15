// Single source of truth for static page content consumed by both React components
// and the /markdown content-negotiation layer. Eliminates drift between surfaces.

export const LANE_BIO =
  'Lane Belone is a writer, speaker and guide. Former U.S. Army Green Beret, founder of Side Quest HQ and practitioner of Joyful Sovereignty and the Infinite Game.'

type InlinePara = string
type LinkedPara = { before: string; linkLabel: string; linkHref: string; after: string }
export type Para = InlinePara | LinkedPara

export function isLinkedPara(p: Para): p is LinkedPara {
  return typeof p === 'object'
}

export interface StorySection {
  heading: string
  paras: Para[]
  signature?: string
  tagline?: string
}

export const aboutStory: StorySection[] = [
  {
    heading: 'The beginning',
    paras: [
      "I came into the world in humble circumstances. My mother gave birth to me in an apartment and we spent our early years finding footing, loving each other and stumbling along the way. My father wasn't around growing up, but masculine guidance came through other channels: Boy Scouts, sports, small-town community and faith.",
      "I grew up resourceful, curious and quietly ambitious. A lot of drive and no clear map for where to point it.",
      "Little did that young boy know where he was heading.",
    ],
  },
  {
    heading: 'The call',
    paras: [
      "The decision to join the military was part game (rock, paper, scissors lol) and excitement for something new. My first duty station was Germany and I found that the world was much larger than I knew. New environments, new friends, a growing sense that perspective shapes everything.",
      "Then a deeper pull arrived. Special Forces. I trained for two years and earned my Green Beret. I deployed internationally, explored dozens of countries. Over more than a decade of service, one insight kept compounding: the same reality reads completely differently depending on the lens you're looking through.",
      "When the call to close the military chapter arrived, subtle, unmistakable, clear, I listened.",
    ],
  },
  {
    heading: 'The becoming',
    paras: [
      "After the military, I moved to Panama and launched business ventures. Most of them didn't grow the way I envisioned. Somewhere along the way, I flew to Peru for fun and exploration and was introduced to a realm I wasn't looking for. Plant medicine. Healing modalities. A reconnection with my native heritage. Wisdom traditions across the world. I was integrating life in leaps and bounds during this chapter. Learning to blend profound spiritual wisdom with practical, grounded, imperfect action.",
      "Along the way, I met Steven Kuhn. Together we built the Humble Alpha, a book, a community and a framework for leading with humility, depth and genuine strength. The work reached veterans, entrepreneurs and natural leaders navigating the intersection of inner life and outer impact.",
      { before: 'Toward the end of this chapter, a phrase kept surfacing. ', linkLabel: 'Joyful Sovereignty', linkHref: '/joyful-sovereignty', after: '. I let it find its shape on its own terms.' },
    ],
  },
  {
    heading: 'The living',
    paras: [
      "In 2022, the calling turned inward. Curiosity became devotion. The adventure shifted from external terrain to the territory of archetype, myth, energy and embodiment. I studied what I think of as the invisible systems: sacred timing, subtle magnetism, soul ecosystems, authentic expression.",
      "I redefined what power meant to me. Presence over performance. Depth over volume. Directed stillness over relentless drive.",
      "What emerged was Joyful Sovereignty expressed fully. A path, a frequency, a way of inhabiting every day. The whole game, played from the inside.",
    ],
  },
  {
    heading: 'Today',
    paras: [
      "I write, speak and lead experiences from inside that game.",
      "My writing carries fresh ideas on joyful and sovereign living that move through me like an Alive current. Speaking engagements bring the four territories: The Perception Upgrade, Sovereign Worldbuilding, Flow Intelligence and Guidance From Within, into rooms where something real needs to open.",
      "At Side Quest HQ, I lead retreats, workshops and advisory containers for founders and creators who want to operate from a deeper, more alive place.",
      "The intention has always been the same: help people move in a more beautiful direction.",
    ],
    signature: 'Lane',
    tagline: 'Enjoy the Journey',
  },
]

// ── Speaking ──────────────────────────────────────────────────────────────────

export interface SpeakingTopic {
  title: string
  subtitle: string
  body: string
}

export const speakingTopics: SpeakingTopic[] = [
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
    body: "Teaches participants to read the subtle cues and trust their inner compass. Topics include next-move sensing, reading what's surfacing and making clear decisions in complex environments.",
  },
]

export const speakingFormats: string[] = [
  'Keynotes for conferences and summits',
  'Workshops for leadership teams',
  'Retreat sessions and multi-day experiences',
  'Nature-based activations and embodied adventures',
  'Private sessions for founders and visionaries',
]

// ── Joyful Sovereignty ────────────────────────────────────────────────────────

export const JS_DESCRIPTION =
  "Joyful Sovereignty is Lane Belone's approach to playing the Infinite Game through joy, sovereignty and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort."

export const jsSections: StorySection[] = [
  {
    heading: 'What this is',
    paras: [
      "Joyful Sovereignty is Lane Belone's approach to playing the Infinite Game through joy, sovereignty and embodied play rather than strategy and optimization. It is a philosophy and a lived practice. When your choices come from genuine alignment rather than conditioned obligation, there is a felt quality: power without performance, aliveness without effort.",
      "The word sovereign carries a certain gravity. It points to something earned, fought for, liberated from. And there's truth in that direction.",
      'But when you add joyful to it, the whole energy shifts.',
      "What was serious becomes spacious. What was a battle becomes a game. What was a destination becomes a way of moving through life. Joyful Sovereignty is a quality of presence you can inhabit right now.",
      'The approach is something simpler and far more powerful: energize something so alive, so light, so deeply at peace, that the old paradigms simply become irrelevant. Made obsolete by the brightness of what replaces them.',
      "From the inside, it feels like spaciousness of flow. A subtle smile woven into the day. Rhythmic laughter. Playful mischief. And underneath all of it, a steady, quiet peace. Because you begin to understand that sovereignty is your birthright. It's what you already are.",
    ],
  },
  {
    heading: 'The infinite game',
    paras: [
      'There are two kinds of games. Finite games are played to win. Infinite games are played to keep the game going.',
      'Life is an infinite game.',
      'And you get to choose how you play it.',
      "The words need, should and have to carry a binding quality. They narrow. They flatten what's actually a wide-open playing field into something that feels more like an obligation. Joyful Sovereignty releases that. By recognizing that you were always free to choose.",
      "You can play the infinite game with joy. With playful mischief. With laughter, with levity, with a smirk at the edge of a challenge. And finite games are the texture of the infinite one. Start something, let it have chapters, let it reach its natural conclusion. Quest it. A retreat in the mountains. A book. A creative sprint. These finite arcs are how you experiment with life. They have structure, rules and a clear game board. And when the game ends, you're still playing. The infinite game never stops.",
      'Structure is the design of the playground.',
      "The lived expression of this is what I call Playgrounds of Exploration. Each part of the day is a distinct playground with its own energy and essence. The morning playground. The midday playground. The afternoon playground. The evening. The night. Each one moves like a track on a playlist, seamlessly, deliberately, alive. You architect these. You design them. And the act of that design is itself an expression of joyful sovereignty, because you're playing the day, not reacting to it.",
    ],
  },
  {
    heading: 'Perception and clarity',
    paras: [
      "Reality is not given. It's decoded.",
      "What you experience as your reality is rooted in how you perceive it. The electromagnetic spectrum that human senses can detect is a sliver of what's measurable. What's measurable is a sliver of what exists. And beyond the known, beyond the measurable, there are spectrums we don't have names for yet.",
      'Based on your internal orientation, life responds in kind. Set an internal world of struggle, of being at the mercy of the system, of things always being a challenge, and life confirms it. "Yes, my dear. As you wish..."',
      'But understand this mechanism, and something opens.',
      "Perception upgrades are available every second of every day. The invitation is always there. Set the intention of the coolest, most joyful, most synchronistic game of life you can imagine playing. Then begin to embody it. Take action from that place. Let the old conditioning, the old programming, release. By no longer feeding it your attention and energy.",
      "The intrinsic, radiant joy lives here, in the present moment, in the enjoying of the journey. Enjoy the journey is how I close every exchange. A perceptual declaration of where I've chosen to live.",
      "When something unconscious surfaces, when a pattern you didn't know you were running gets illuminated, a choice opens. Do I keep this? Or do I choose something more alive? That moment of illumination is where Joyful Sovereignty becomes most practical. You can't play freely if you can't see clearly. And once you can see, the game shifts.",
    ],
  },
  {
    heading: 'How this shows up',
    paras: [
      'This philosophy is lived, refined and shared from inside the game.',
      'The writing is where the threads surface. Essays and reflections from someone actively playing. Breadcrumbs from the field. Those live at the Substack.',
      'In speaking, it becomes an experience. The Perception Upgrade, Sovereign Worldbuilding, Flow Intelligence and Guidance From Within are all doorways into the same open field. Every room becomes an invitation to see more clearly and move more freely.',
      "The deeper work, the retreats, the advisory containers, the extended engagements, lives at Side Quest HQ. That's where Joyful Sovereignty meets real creative and strategic change.",
    ],
  },
]

export interface FaqItem { q: string; a: string }

export const jsFaqs: FaqItem[] = [
  {
    q: 'What is Joyful Sovereignty?',
    a: 'Joyful Sovereignty is a quality of presence in which life is inhabited fully, from the inside, with spaciousness, playfulness and genuine peace. It is not a destination but a way of moving. Sovereignty is understood as a birthright, not something to fight for. The phrase "the whole game, played from the inside" captures its essence.',
  },
  {
    q: 'What is the Infinite Game?',
    a: 'The Infinite Game is life played to keep playing, not to win. Finite arcs like projects, quests, retreats and creative sprints create structure and texture within the infinite whole. Challenges become worthy rivals, not enemies. Failures become growth obstacles, not permanent defeats. The Infinite Game never stops.',
  },
  {
    q: 'What are Playgrounds of Exploration?',
    a: "Playgrounds of Exploration is Lane Belone's framework for architecting each part of the day as a distinct playground with its own energy and essence. The morning, midday, afternoon, evening and night each move like tracks on a playlist. Designing these playgrounds is itself an expression of Joyful Sovereignty.",
  },
  {
    q: 'What is the Perception Upgrade?',
    a: 'The Perception Upgrade is the recognition that reality is decoded, not given. Based on your internal orientation, life responds in kind. Perception upgrades are available every moment. Setting an internal orientation of aliveness and synchronicity lets life respond in kind.',
  },
]

// ── Home ──────────────────────────────────────────────────────────────────────

export interface HappeningNowItem {
  badge: string
  title: string
  description: string
  cta: string
  ctaHref: string
  price?: string
  featured?: boolean
}

export const happeningNow: HappeningNowItem[] = [
  {
    badge: 'Install Session',
    title: 'Sovereign Ecosystem Install',
    description: 'Two sixty-minute sessions with Lane. Your AI workspace standing on its own legs by the end. $247.',
    cta: 'Book the Install',
    ctaHref: 'https://www.sidequesthq.co/sovereign-ecosystem-install',
    featured: true,
  },
  {
    badge: 'Playbook',
    title: 'The Sovereign Life Playbook',
    description: "A framework for peeling away the inherited game and designing what's actually yours. Built to be revisited. A book you return to.",
    cta: 'Get the Playbook',
    ctaHref: 'https://www.sidequesthq.co/products/sovereign-life-playbook',
    price: '$37',
  },
]

export interface BookEntry {
  badge: string
  title: string
  description: string
  cta: string
  href: string
}

export const books: BookEntry[] = [
  {
    badge: 'Free',
    title: 'Your Infinite RPG',
    description: 'A free ebook presenting personal growth as a customizable role-playing game. A gamified framework for designing an epic, authentic life.',
    cta: 'Instant download',
    href: '/files/your-infinite-rpg.pdf',
  },
  {
    badge: 'Book',
    title: 'Humble Alpha',
    description: 'A framework for leading with humility, depth and genuine strength. Written for veterans, entrepreneurs and natural leaders navigating inner life and outer impact.',
    cta: 'Get the book',
    href: 'https://www.amazon.com/Unleash-Your-Humble-Alpha-Presence/dp/173525472X',
  },
]

export interface SQHQChip {
  title: string
  sub: string
  href: string
}

export const sqhqChips: SQHQChip[] = [
  { title: 'Digital Products', sub: 'Playbooks · Guides', href: 'https://www.sidequesthq.co/products' },
  { title: 'Workshops', sub: 'One-day intensives', href: 'https://www.sidequesthq.co/workshop' },
  { title: 'Retreats', sub: 'Multi-day immersions', href: 'https://www.sidequesthq.co/explorers-side-quest' },
  { title: 'Private Advisory', sub: 'One-on-one', href: 'https://www.sidequesthq.co/one-on-one' },
]

// ── AI for Business ───────────────────────────────────────────────────────────
// New section on the homepage (added 2026-05-22). Surfaces the six-product AI
// slate hosted on Side Quest HQ. Card data is scaffolded with placeholders
// pending Phase 2 manuscript drafting. Wave 1 cards are live-eligible once
// Stripe and Resend wiring complete; Wave 2 cards ship with "coming soon" tags
// until Phase 7. Outbound links point at SQHQ checkout pages.

// Card and /library imagery is hosted on the SQHQ Vercel Blob store (the
// canonical product surface). Field Guides use the single 4:3 cover crop,
// bundles use the fanned 4:3 bundle crop. Rendered with plain <img> since
// next.config carries no remote-image allowlist.
const SQHQ_BLOB = 'https://5xfilrcirjl3skmn.public.blob.vercel-storage.com'

export interface AIProductCard {
  badge: string                    // "Business Arc" | "Personal Arc" | "Bundle"
  title: string
  oneLiner: string                 // single sentence positioning
  price: string                    // "$9" | "$7" | "$13" | "$14" | "$27"
  href: string                     // SQHQ checkout URL
  image: string                    // SQHQ blob 4:3 cover crop
  wave: 1 | 2
  status: 'live' | 'coming-soon'
}

export const aiForBusinessFrame =
  "The Field Guides begin where you are. Six short reads across two arcs, each built around the questions productivity skips."

export const aiBusinessArc: AIProductCard[] = [
  {
    badge: 'Business Arc',
    title: 'AI for the Business You Actually Want',
    oneLiner:
      "Return to the question underneath the tools. What's the business you actually want?",
    price: '$9',
    href: 'https://www.sidequesthq.co/products/ai-for-the-business-you-actually-want',
    image: `${SQHQ_BLOB}/ai-for-the-business-you-actually-want/cover-4x3.png`,
    wave: 1,
    status: 'live',
  },
  {
    badge: 'Business Arc',
    title: 'Stack Calm',
    oneLiner:
      'The minimum viable AI setup. What to keep, what to cancel, what to add when.',
    price: '$9',
    href: 'https://www.sidequesthq.co/products/stack-calm',
    image: `${SQHQ_BLOB}/stack-calm/cover-4x3.png`,
    wave: 1,
    status: 'live',
  },
  {
    badge: 'Business Arc',
    title: 'Earn the Right to Automate',
    oneLiner:
      'Prove the workflow by hand first. Automate once it has earned the trust.',
    price: '$9',
    href: 'https://www.sidequesthq.co/products/earn-the-right-to-automate',
    image: `${SQHQ_BLOB}/earn-the-right-to-automate/cover-4x3.png`,
    wave: 1,
    status: 'live',
  },
]

export const aiPersonalArc: AIProductCard[] = [
  {
    badge: 'Personal Arc',
    title: 'Whose Game Are You Playing with AI?',
    oneLiner:
      'A few honest questions to keep the tools carrying your direction, not the other way around.',
    price: '$9',
    href: 'https://www.sidequesthq.co/products/whose-game-are-you-playing-with-ai',
    image: `${SQHQ_BLOB}/whose-game-are-you-playing-with-ai/cover-4x3.png`,
    wave: 2,
    status: 'live',
  },
  {
    badge: 'Personal Arc',
    title: 'Yours to Make',
    oneLiner:
      'Keep your fingerprints on the work, so what you ship still sounds like you.',
    price: '$9',
    href: 'https://www.sidequesthq.co/products/yours-to-make',
    image: `${SQHQ_BLOB}/yours-to-make/cover-4x3.png`,
    wave: 2,
    status: 'live',
  },
  {
    badge: 'Personal Arc',
    title: 'Sovereign Capture',
    oneLiner:
      'One trusted place for every idea, so your best thinking stops evaporating.',
    price: '$7',
    href: 'https://www.sidequesthq.co/products/sovereign-capture',
    image: `${SQHQ_BLOB}/sovereign-capture/cover-4x3.png`,
    wave: 2,
    status: 'live',
  },
]

export interface AIBundleCard {
  badge: 'Bundle'
  title: string
  oneLiner: string
  bundlePrice: string              // displayed price, e.g. "$13"
  savings: string                  // "Save $12"
  href: string
  image: string                    // SQHQ blob 4:3 fanned bundle crop
  wave: 1 | 2
  status: 'live' | 'coming-soon'
}

export const aiBundles: AIBundleCard[] = [
  {
    badge: 'Bundle',
    title: 'The Business Collection',
    oneLiner: 'B1, B2 and B3 together. The full business arc.',
    bundlePrice: '$14',
    savings: 'Save $13',
    href: 'https://www.sidequesthq.co/products/business-bundle',
    image: `${SQHQ_BLOB}/business-bundle/bundle-4x3.png`,
    wave: 1,
    status: 'live',
  },
  {
    badge: 'Bundle',
    title: 'The Personal Collection',
    oneLiner: 'P1, P2 and P3 together. The full personal arc.',
    bundlePrice: '$13',
    savings: 'Save $12',
    href: 'https://www.sidequesthq.co/products/personal-bundle',
    image: `${SQHQ_BLOB}/personal-bundle/bundle-4x3.png`,
    wave: 2,
    status: 'live',
  },
  {
    badge: 'Bundle',
    title: 'The Foundation Collection',
    oneLiner: 'All six Field Guides. The business axis and the personal axis.',
    bundlePrice: '$27',
    savings: 'Save $25',
    href: 'https://www.sidequesthq.co/products/foundation-bundle',
    image: `${SQHQ_BLOB}/foundation-bundle/bundle-4x3.png`,
    wave: 2,
    status: 'live',
  },
]

// ── Digital product library ─────────────────────────────────────────────────
// The /library aggregator page. The flagship Playbook sits above the AI slate
// (aiBusinessArc + aiPersonalArc + aiBundles). Every product is hosted and sold
// on Side Quest HQ; this page is the catalog index, not a second storefront.

export interface LibraryFlagship {
  title: string
  oneLiner: string
  price: string
  href: string
  image: string
}

export const librarySlp: LibraryFlagship = {
  title: 'The Sovereign Life Playbook',
  oneLiner:
    'A framework for designing your life from the inside out. Seven chapters, six exercises, eight files including an AI Companion Guide and Session Guide.',
  price: '$37',
  href: 'https://www.sidequesthq.co/products/sovereign-life-playbook',
  image: `${SQHQ_BLOB}/sovereign-life-playbook/cover-4x3.png`,
}

// Second playbook on the shelf. Live 2026-06-11.
export const libraryCfp: LibraryFlagship = {
  title: 'Creator Flywheel Playbook',
  oneLiner:
    'Install the machine that compounds your creative work. The flywheel anatomy, the Three Laws and your AI running the system with you.',
  price: '$77',
  href: 'https://www.sidequesthq.co/products/creator-flywheel-playbook',
  image: `${SQHQ_BLOB}/creator-flywheel-playbook/cover-4x3.png`,
}

// ── Library shelf copy ──────────────────────────────────────────────────────
// The /library page and its /markdown twin both read from here, so the two
// surfaces never drift. Shelf copy carries the transformation, not chapter
// counts (those live on the SQHQ landing pages). Keyed by canonical SQHQ href.
export const libraryBlurbs: Record<string, string> = {
  'https://www.sidequesthq.co/products/sovereign-life-playbook':
    "The flagship, and the deepest single work in the library. A framework for designing your life from the inside out, from what you actually want to how you live it day to day. It comes with an AI Companion to walk the whole thing beside you. The place to go when you're ready to go all in.",
  'https://www.sidequesthq.co/products/creator-flywheel-playbook':
    "The machine under your creative work. Where the free kit makes your flywheel visible, this one installs it: a working system that compounds, with your AI running it beside you. For the Creator who's done starting over every season.",
  'https://www.sidequesthq.co/products/ai-for-the-business-you-actually-want':
    "A first-principles starter for the owner who's already using AI and still feels a little off. It returns to the question underneath the tools. What's the business you actually want, and what's AI for inside it. A clear place to begin when the stack is busy but the direction has gone fuzzy.",
  'https://www.sidequesthq.co/products/stack-calm':
    'Your minimum viable AI setup, made calm. What to keep, what to cancel and what to add only when you truly need it. For anyone whose subscriptions and open tabs have quietly multiplied past the point of usefulness, and who wants a stack that finally feels light.',
  'https://www.sidequesthq.co/products/earn-the-right-to-automate':
    'A timing guide for automation. Prove the workflow by hand first, then let the machine carry it once it has earned the trust. For the builder tempted to automate everything at once, and feeling the wobble that tends to follow.',
  'https://www.sidequesthq.co/products/whose-game-are-you-playing-with-ai':
    'A contemplative practice for the reader who uses AI well and still wonders, quietly, whose game it serves. A handful of honest questions to make sure the tools are carrying your direction and not the other way around.',
  'https://www.sidequesthq.co/products/yours-to-make':
    'A creative practice for the maker whose AI output is prolific and somehow not quite theirs. How to keep your fingerprints on the work, so what you ship still sounds like you. For anyone producing a lot lately and recognizing themselves in it a little less.',
  'https://www.sidequesthq.co/products/sovereign-capture':
    'A capture container and a simple weekly rhythm to hold it, so your best thinking stops evaporating. For the reader whose ideas arrive faster than they can keep them, and who wants one trusted place for all of it.',
}

export interface LibraryCollection {
  title: string
  price: string
  savings: string
  href: string
  members: AIProductCard[]
  blurb: string
}

// Collections show only their member book covers. The display name is
// "Collection", now matching the SQHQ product display titles (slugs stay business-bundle).
export const libraryCollections: LibraryCollection[] = [
  {
    title: 'The Business Collection',
    price: aiBundles[0].bundlePrice,
    savings: aiBundles[0].savings,
    href: aiBundles[0].href,
    members: aiBusinessArc,
    blurb:
      'The full business arc in one collection. Three Field Guides for building a company with AI that still feels like yours. Where to begin, how to keep your stack light and how to know when automation has earned its place.',
  },
  {
    title: 'The Personal Collection',
    price: aiBundles[1].bundlePrice,
    savings: aiBundles[1].savings,
    href: aiBundles[1].href,
    members: aiPersonalArc,
    blurb:
      "The full personal arc in one collection. Three Field Guides for staying the author of your own life as AI moves into it. Whose game you're really playing, how to keep your creative work yours and a way to stop losing your best ideas.",
  },
  {
    title: 'The Foundation Collection',
    price: aiBundles[2].bundlePrice,
    savings: aiBundles[2].savings,
    href: aiBundles[2].href,
    members: [...aiBusinessArc, ...aiPersonalArc],
    blurb:
      'All six Field Guides, the business axis and the personal axis together. The complete practice for working with AI on your own terms, in your company and in your own mind both. The widest doorway into the whole approach.',
  },
]

export interface LibraryBook {
  title: string
  priceLabel: string
  href: string
  image: string
  blurb: string
}

// Free instant downloads. Grows into its own shelf near the top once it holds
// three or more titles.
export const libraryFreeReading: LibraryBook[] = [
  {
    title: 'Your Infinite RPG',
    priceLabel: 'Free · Instant download',
    href: '/files/your-infinite-rpg.pdf',
    image: '/images/book-infinite-rpg.png',
    blurb:
      'A free ebook presenting personal growth as a customizable role-playing game. A gamified framework for designing an epic, authentic life, one quest at a time. Yours to download and keep, no cost.',
  },
]

// Print and purchase-elsewhere titles. The Infinite Game OS book joins here
// when it ships.
export const libraryPrintBooks: LibraryBook[] = [
  {
    title: 'Humble Alpha',
    priceLabel: 'Book · On Amazon',
    href: 'https://www.amazon.com/Unleash-Your-Humble-Alpha-Presence/dp/173525472X',
    image: '/images/book-humble-alpha.jpg',
    blurb:
      'A framework for leading with humility, depth and genuine strength. Written for veterans, entrepreneurs and natural leaders navigating the meeting place of inner life and outer impact. A print book, available on Amazon.',
  },
]

// ── Link hub (/links) ─────────────────────────────────────────────────────────
// Sovereign replacement for the Linktree bio link. One branded destination for
// every social profile. Edit this array to reorder, add or remove links.

export interface LinkHubItem {
  label: string
  sublabel?: string
  href: string
  icon: string
  // Distinguished featured treatment: gold border, soft gold tint, a Free pill
  // and a hover glow. Reserved for the current funnel mouth.
  featured?: boolean
  // Small accent pill rendered next to the label (e.g. "Free").
  pill?: string
}

export const linkHub: LinkHubItem[] = [
  // Featured funnel mouth. The free lead magnet, distinguished with the gold
  // treatment so the eye lands here first.
  {
    label: 'The Creator Flywheel Starter Kit',
    sublabel: 'A guide and worksheet for Creators who are done performing',
    href: 'https://www.sidequesthq.co/creator-flywheel',
    icon: 'spark',
    featured: true,
    pill: 'Free',
  },
  // Rotating episode slot. Open Studio Episode 3 (2026-06-15) points it at the
  // B1 Field Guide spotlighted that week. Resting default is the Creator
  // Flywheel Playbook; a future episode swaps it again.
  {
    label: 'AI for the Business You Actually Want',
    sublabel: 'A Field Guide for owners who want their business, their voice, their terms · $9',
    href: 'https://www.sidequesthq.co/products/ai-for-the-business-you-actually-want',
    icon: 'book',
  },
  {
    label: 'The Full Library',
    sublabel: 'Start here · every playbook and field guide in one place',
    href: '/library',
    icon: 'compass',
  },
  {
    label: 'Read the Writing',
    sublabel: 'Essays and breadcrumbs from inside the game',
    href: 'https://lanebelone.substack.com/',
    icon: 'writing',
  },
  {
    label: 'Infinite Game OS',
    sublabel: 'The framework, mapped',
    href: 'https://infinitegameos.io',
    icon: 'infinity',
  },
  {
    label: 'The Sovereign Life Playbook',
    sublabel: 'Design your life from the inside out · $37',
    href: 'https://www.sidequesthq.co/products/sovereign-life-playbook',
    icon: 'book',
  },
  {
    label: 'Sovereign Ecosystem Install',
    sublabel: 'Two sessions. Your sovereign workspace, standing on its own.',
    href: 'https://www.sidequesthq.co/sovereign-ecosystem-install',
    icon: 'spark',
  },
  {
    label: 'Invite Me to Speak',
    sublabel: 'Keynotes, workshops and retreats',
    href: '/speaking',
    icon: 'mic',
  },
]

export interface SocialLink {
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/increasefreedom/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lanebelone/' },
  { label: 'Facebook', href: 'https://www.facebook.com/increasefreedom' },
  { label: 'Substack', href: 'https://lanebelone.substack.com/' },
]
