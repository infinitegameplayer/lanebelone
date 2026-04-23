import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

// 30 GoDaddy-migrated archive slugs. Frozen; do not modify.
export const ARCHIVE_SLUGS = [
  // Core philosophy / infinite game
  'intrinsic-joy-the-game-within-the-game',
  'developing-a-playbook-for-the-infinite-game',
  'the-structure-flow-of-creativity',
  'ancient-wisdom-meets-pioneering-technology',
  'the-true-message-of-your-heart',
  'an-ancient-path-to-wisdom',
  '4-something-am-thoughts',
  'architect-your-life-for-curiosity-excitement',
  'truths-that-shift-our-perspective',
  // Performance / flow / self-mastery
  'transmuting-pressure-cultivating-the-anti-fragility-mindset',
  'restoration-revolution-redefining-rest-for-optimal-living',
  'navigating-lifes-rhythms-unveiling-the-hidden-wisdom-of-breath',
  'the-sweet-spot-of-self-mastery-strategy-flow-play',
  'synergy-leveraging-self-organization-to-elevate-your-life',
  'crafting-clarity-5-alignment-factors-for-project-initiation',
  'inviting-the-sweet-spot-a-gentle-approach-to-lifes-flow',
  'micro-mastery-is-the-gateway-to-universal-mastery',
  '7-aligned-strategies-to-gamify-self-mastery',
  'self-mastery-the-antidote-to-distraction-regret-uncertainty',
  'anchoring-purpose-peace-and-play-while-navigating-3-challenges',
  // Joyful Sovereignty
  'the-key-to-joyful-sovereignty-is-gratitude',
  'we-the-people-will-create-a-joyful-sovereign-society',
  'the-joyful-sovereignty-infinite-game',
  'self-society-integrating-sovereignty-with-leadership-support',
  // Broader personal development
  'the-people-process-and-trajectory-to-change-the-world',
  'overcome-transition-by-deciding-powerfully',
  'the-full-spectrum-dance-of-life-2-of-3',
  'a-precise-trajectory-is-the-answer',
  'replay-transitioning-from-overwhelm-to-realizing-your-potential',
  // Esoteric
  'rainbow-warriors-and-the-emerging-golden-age',
]

// Slugs for posts published through the Article Publishing skill.
// The skill appends here as new posts ship.
export const LIVE_SLUGS: string[] = []

// Combined set used for static generation and URL resolution.
export const ALL_SLUGS = [...ARCHIVE_SLUGS, ...LIVE_SLUGS]

// Backward-compat alias. Will be removed once no consumers reference it.
export const CARRY_FORWARD_SLUGS = ALL_SLUGS

export interface BlogPost {
  slug: string
  title: string
  date: string
  dateModified?: string
  category: string
  heroImage: string
  description: string
  content: string
  format?: 'markdown' | 'html'
  about?: string[]
  mentions?: string[]
  wordCount?: number
  articleSection?: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))

  const posts = files
    .map(filename => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug: data.slug || filename.replace('.md', ''),
        title: data.title || '',
        date: data.date || '',
        category: data.category || '',
        heroImage: data.heroImage || '',
        description: data.description || '',
        content,
      } as BlogPost
    })
    .filter(post => ALL_SLUGS.includes(post.slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!ALL_SLUGS.includes(slug)) return null

  const filename = `${slug}.md`
  const filepath = path.join(BLOG_DIR, filename)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug: data.slug || slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || '',
    heroImage: data.heroImage || '',
    description: data.description || '',
    content,
  }
}
