// Content negotiation: markdown representations of site pages.
// Used by the /markdown/[[...path]] route handler when AI agents
// request Accept: text/markdown or text/plain.

import { getAllPosts, getPostBySlug } from './blog'
import {
  LANE_BIO,
  aboutStory,
  isLinkedPara,
  JS_DESCRIPTION,
  speakingTopics,
  speakingFormats,
  jsSections,
  happeningNow,
  books,
  sqhqChips,
} from './page-data'

const SITE = 'https://www.lanebelone.com'

const pages: Record<string, string> = {}

function generateHomeMarkdown(): string {
  const happeningNowMd = happeningNow
    .map(item => {
      const pricePart = item.price ? ` · ${item.price}` : ''
      return `- **${item.title}**${pricePart} · ${item.description} [${item.cta}](${item.ctaHref})`
    })
    .join('\n')

  const booksMd = books
    .map(b => `- **[${b.title}](${b.href})** · ${b.description}`)
    .join('\n')

  const sqhqMd = sqhqChips
    .map(c => `- **[${c.title}](${c.href})** · ${c.sub}`)
    .join('\n')

  return `# Lane Belone

> Writer, speaker and guide. Former U.S. Army Green Beret, author of Unleash Your Humble Alpha, founder of Side Quest HQ, practitioner of joyful sovereignty and the Infinite Game.

Exploring the Infinite Game. Writing, speaking and sharing breadcrumbs along the way.

## Happening Now

${happeningNowMd}

## Joyful Sovereignty

"Spacious. Playful. At peace. The whole game, played from the inside."

An approach to playing the Infinite Game through joy and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort. [Explore Joyful Sovereignty](${SITE}/joyful-sovereignty)

## Books

${booksMd}

## Recent Writing

Essays on the infinite game, sovereignty, flow and perception. [Read the full archive](${SITE}/blog)

## Work with Me at Side Quest HQ

Where the tools, events and one-on-one work live. Four ways to go deeper:

${sqhqMd}

## About Lane

I'm a former Green Beret turned life designer. Published author, retreat leader and advisor to founders and entrepreneurs navigating real transitions. [Read the full story](${SITE}/about)

## Speaking

Keynotes and talks on perception, flow, joyful sovereignty and the Infinite Game. [Invite me to speak](${SITE}/speaking)

## Connect

Personal updates and fresh ideas. Newsletter and contact at [${SITE}/#connect](${SITE}/#connect).

---
*[Lane Belone](${SITE})*
`
}

function generateJoyfulSovereigntyMarkdown(): string {
  const sectionsMd = jsSections
    .map(section => {
      const parasText = section.paras
        .map(p =>
          isLinkedPara(p)
            ? `${p.before}[${p.linkLabel}](${SITE}${p.linkHref})${p.after}`
            : p
        )
        .join('\n\n')
      return `## ${section.heading}\n\n${parasText}`
    })
    .join('\n\n')

  return `# Joyful Sovereignty

> ${JS_DESCRIPTION}

${sectionsMd}

## Related

- [Infinite Game OS](https://infinitegameos.io) · The structured knowledge base
- [Joyful Sovereignty concept](https://infinitegameos.io/concepts/joyful-sovereignty) · Deeper exploration
- [Side Quest HQ](https://sidequesthq.co) · The practical container

---
*[Lane Belone](${SITE}) · [Joyful Sovereignty](${SITE}/joyful-sovereignty)*
`
}

function generateSpeakingMarkdown(): string {
  const topicsMd = speakingTopics
    .map(t => `### ${t.title}\n${t.subtitle}\n\n${t.body}`)
    .join('\n\n')

  const formatsMd = speakingFormats.map(f => `- ${f}`).join('\n')

  return `# Speaking · Lane Belone

> Lane Belone speaks on the infinite game, perception, flow and leadership. Keynotes, workshops, retreats and private sessions.

Design. Play. Master.

Inviting leaders, creators and communities into experiences that spark clarity, presence, creativity and transformational insight.

## Topics

${topicsMd}

## Formats

${formatsMd}

Contact: howdy@lanebelone.com

---
*[Lane Belone](${SITE}) · [Speaking](${SITE}/speaking)*
`
}

function generateAboutMarkdown(): string {
  const storyMd = aboutStory
    .map(section => {
      const parasText = section.paras
        .map(p =>
          isLinkedPara(p)
            ? `${p.before}[${p.linkLabel}](${SITE}${p.linkHref})${p.after}`
            : p
        )
        .join('\n\n')
      return `## ${section.heading}\n\n${parasText}`
    })
    .join('\n\n')

  return `# About Lane Belone

> ${LANE_BIO}

${LANE_BIO}

${storyMd}

## Ecosystem

- **[Side Quest HQ](https://sidequesthq.co)** · Playbooks, workshops and advisory
- **[Infinite Game OS](https://infinitegameos.io)** · The structured knowledge base
- **[Substack](https://lanebelone.substack.com/)** · Essays and breadcrumbs
- **[LinkedIn](https://www.linkedin.com/in/lanebelone/)**
- **[Instagram](https://www.instagram.com/increasefreedom/)**

---
*[Lane Belone](${SITE}) · [About](${SITE}/about)*
`
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
  if (path === '') return generateHomeMarkdown()
  if (path === 'joyful-sovereignty') return generateJoyfulSovereigntyMarkdown()
  if (path === 'speaking') return generateSpeakingMarkdown()
  if (path === 'about') return generateAboutMarkdown()
  if (path === 'blog') return generateBlogIndexMarkdown()
  if (path.startsWith('blog/f/')) {
    const slug = path.replace('blog/f/', '')
    return generateBlogPostMarkdown(slug)
  }
  return pages[path] ?? null
}
