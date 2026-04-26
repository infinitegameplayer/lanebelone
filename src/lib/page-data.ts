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
