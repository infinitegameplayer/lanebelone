// Single source of truth for static page content consumed by both React components
// and the /markdown content-negotiation layer. Eliminates drift between surfaces.

export const LANE_BIO =
  'Lane Belone is a writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ, and practitioner of joyful sovereignty and the Infinite Game.'

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
      "After the military, moved to Panama and I launched business ventures. Most of them didn't grow the way I envisioned. Somewhere along the way, I flew to Peru for fun and exploration and was introduced to a realm I wasn't looking for. Plant medicine. Healing modalities. A reconnection with my native heritage. Wisdom traditions across the world. I was integrating life in leaps and bounds during this chapter. Learning to blend profound spiritual wisdom with practical, grounded, imperfect action.",
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
      "My writings carries fresh ideas on joyful and sovereign living that moves through me like an Alive current. Speaking engagements bring the four territories: The Perception Upgrade, Sovereign Worldbuilding, Flow Intelligence and Guidance From Within, into rooms where something real needs to open.",
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
    body: 'Teaches participants to interpret subtle signals and trust their inner compass. Topics include next-move sensing, signal interpretation and making clear decisions in complex environments.',
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
    a: 'The Infinite Game is life played to keep playing, not to win. Finite arcs — projects, quests, retreats, creative sprints — create structure and texture within the infinite whole. Challenges become worthy rivals, not enemies. Failures become growth obstacles, not permanent defeats. The infinite game never stops.',
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
    badge: 'Workshop',
    title: "AI for Livin' Workshop",
    description: 'May 2. Colorado Springs. A 3-hour in-person workshop on Claude Code and designing your own digital OS. Small group. Real conversation.',
    cta: 'Register Now',
    ctaHref: 'https://sidequesthq.co/workshop',
    featured: true,
  },
  {
    badge: 'Playbook',
    title: 'The Sovereign Life Playbook',
    description: "A framework for peeling away the inherited game and designing what's actually yours. Built to be revisited, not just read once.",
    cta: 'Get the Playbook',
    ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
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
    href: 'https://drive.google.com/file/d/1nlRYiD-T7K5HgorKe4VzgD-AiO7uZ1Fr/view?usp=sharing',
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
  { title: 'Digital Products', sub: 'Playbooks · Guides', href: 'https://sidequesthq.co/products' },
  { title: 'Workshops', sub: 'One-day intensives', href: 'https://sidequesthq.co/workshop' },
  { title: 'Retreats', sub: 'Multi-day immersions', href: 'https://sidequesthq.co/explorers-side-quest' },
  { title: 'Private Advisory', sub: 'One-on-one', href: 'https://sidequesthq.co/one-on-one' },
]
