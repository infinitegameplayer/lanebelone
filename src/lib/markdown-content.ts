// Content negotiation: markdown representations of site pages.
// Used by the /markdown/[[...path]] route handler when AI agents
// request Accept: text/markdown or text/plain.

import { getAllPosts, getPostBySlug } from './blog'

const SITE = 'https://www.lanebelone.com'

const pages: Record<string, string> = {
  '': `# Lane Belone

> Writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ, practitioner of joyful sovereignty and the Infinite Game.

## Paths

- **[Writing](https://lanebelone.substack.com/)** · Essays and breadcrumbs from the infinite game.
- **[Speaking](/speaking)** · Keynotes and talks on perception, flow and the long game.
- **[Joyful Sovereignty](/joyful-sovereignty)** · The core philosophy. Spacious, playful and at peace. The whole game, played from the inside.

## Books

- **[Humble Alpha](https://www.amazon.com/Unleash-Your-Humble-Alpha-Presence/dp/173525472X)** · A framework for leading with humility, depth and genuine strength. Written for veterans, entrepreneurs and natural leaders navigating inner life and outer impact.
- **[Your Infinite RPG](https://drive.google.com/file/d/1nlRYiD-T7K5HgorKe4VzgD-AiO7uZ1Fr/view?usp=sharing)** · A free ebook presenting personal growth as a customizable role-playing game. A gamified framework for designing an epic, authentic life.

## Side Quest HQ

The practical container within the Infinite Game. [sidequesthq.co](https://sidequesthq.co)

- **Workshops** · Immersive sessions for teams, communities and organizations seeking clarity, alignment and meaningful momentum.
- **Explorer Side Quests** · Adventure-based retreats that open new perception, real connection and memorable transformation.
- **Private Advisory** · A selective advisory container for founders, leaders and creators who want strategic depth and a grounded thought partner.

## Blog

Essays on the infinite game, sovereignty, flow and perception.

[Read the blog](${SITE}/blog)

---
*[Lane Belone](${SITE})*
`,

  about: `# About Lane Belone

> Lane Belone is a writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ, and practitioner of joyful sovereignty and the Infinite Game.

Lane Belone is a writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ and practitioner of joyful sovereignty and the Infinite Game.

## Ecosystem

- **[Side Quest HQ](https://sidequesthq.co)** · Playbooks, workshops and advisory
- **[Infinite Game OS](https://infinitegameos.io)** · The structured knowledge base
- **[Substack](https://lanebelone.substack.com/)** · Essays and breadcrumbs
- **[LinkedIn](https://www.linkedin.com/in/lanebelone/)**
- **[Instagram](https://www.instagram.com/increasefreedom/)**

---
*[Lane Belone](${SITE}) · [About](${SITE}/about)*
`,

  'joyful-sovereignty': `# Joyful Sovereignty

> Joyful Sovereignty is Lane Belone's approach to playing the Infinite Game through joy, sovereignty and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort.

## What is Joyful Sovereignty?

Joyful Sovereignty is a quality of presence in which life is inhabited fully, from the inside, with spaciousness, playfulness and genuine peace. It is not a destination but a way of moving. Sovereignty is understood as a birthright, not something to fight for. The phrase "the whole game, played from the inside" captures its essence.

## What is the Infinite Game?

The Infinite Game is life played to keep playing, not to win. Finite arcs, projects, quests, retreats, creative sprints, create structure and texture within the infinite whole. Challenges become worthy rivals, not enemies. Failures are growth obstacles, not permanent defeats. The infinite game never stops.

## What are Playgrounds of Exploration?

Lane Belone's framework for architecting each part of the day as a distinct playground with its own energy and essence. The morning, midday, afternoon, evening and night each move like tracks on a playlist. Designing these playgrounds is itself an expression of Joyful Sovereignty.

## What is the Perception Upgrade?

The recognition that reality is decoded, not given. Based on your internal orientation, life responds in kind. Perception upgrades are available every moment. Setting an internal orientation of aliveness and synchronicity lets life respond in kind.

## Related

- [Infinite Game OS](https://infinitegameos.io) · The structured knowledge base
- [Joyful Sovereignty concept](https://infinitegameos.io/concepts/joyful-sovereignty) · Deeper exploration
- [Side Quest HQ](https://sidequesthq.co) · The practical container

---
*[Lane Belone](${SITE}) · [Joyful Sovereignty](${SITE}/joyful-sovereignty)*
`,

  speaking: `# Speaking · Lane Belone

> Lane Belone speaks on the infinite game, perception, flow and leadership. Keynotes, workshops, retreats and private sessions.

Design. Play. Master.

Inviting leaders, creators and communities into experiences that spark clarity, presence, creativity and transformational insight.

## Topics

### The Perception Upgrade
Seeing reality through a more empowered lens. Guides audiences into renewed clarity through metaphor, perspective-shifts and practical tools. Covers the infinite game mindset, Side Quest psychology, pattern-recognition and expanding what you can perceive.

### Sovereign Worldbuilding
Designing the systems, environments and structures that shape your life and leadership. How to shape your world intentionally through personal rhythms, boundaries, team culture and organizational architecture.

### Flow Intelligence
Unlocking creative rhythm, nervous system balance and sustainable momentum. Reconnects people with creative energy through embodied rhythm and emotional awareness.

### Guidance From Within
Intuition, decision-making and moving through uncertainty with confidence. Teaches participants to interpret subtle signals and trust their inner compass.

## Formats

- Keynotes for conferences and summits
- Workshops for leadership teams
- Retreat sessions and multi-day experiences
- Nature-based activations and embodied adventures
- Private sessions for founders and visionaries

Contact: howdy@lanebelone.com

---
*[Lane Belone](${SITE}) · [Speaking](${SITE}/speaking)*
`,

  blog: '', // placeholder, generated dynamically below
}

function generateBlogIndexMarkdown(): string {
  const posts = getAllPosts()
  const entries = posts
    .map(p => `- [${p.title}](${SITE}/blog/f/${p.slug}) · ${p.description || p.category}`)
    .join('\n')

  return `# Blog · Lane Belone

> Essays on the infinite game, sovereignty, flow and perception.

${entries || 'No posts available.'}

---
*[Lane Belone](${SITE}) · [Blog](${SITE}/blog)*
`
}

function generateBlogPostMarkdown(slug: string): string | null {
  const post = getPostBySlug(slug)
  if (!post) return null

  // Blog posts are already in markdown. Return with metadata header.
  return `# ${post.title}

> ${post.description || post.category}

**Date:** ${post.date}
**Category:** ${post.category}

${post.content}

---
*[Lane Belone](${SITE}) · [Blog](${SITE}/blog) · [${post.title}](${SITE}/blog/f/${post.slug})*
`
}

export function getMarkdownForPath(path: string): string | null {
  // Blog index
  if (path === 'blog') return generateBlogIndexMarkdown()

  // Individual blog posts
  if (path.startsWith('blog/f/')) {
    const slug = path.replace('blog/f/', '')
    return generateBlogPostMarkdown(slug)
  }

  // Static pages
  return pages[path] ?? null
}
