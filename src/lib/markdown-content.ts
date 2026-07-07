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
  sqhqChips,
  libraryAliveBusiness,
  librarySlp,
  librarySqp,
  libraryCfp,
  libraryTrilogy,
  aiBusinessArc,
  aiPersonalArc,
  libraryBlurbs,
  libraryCollections,
  libraryFreeReading,
  libraryPrintBooks,
  linkHub,
  socialLinks,
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

  const fieldGuidesMd = [...aiBusinessArc, ...aiPersonalArc]
    .map(c => `- **[${c.title}](${c.href})** (${c.price}) · ${c.oneLiner}`)
    .join('\n')

  const homeCollectionsMd = libraryCollections
    .map(c => `- **[${c.title}](${c.href})** (${c.price}, ${c.savings}) · ${c.blurb}`)
    .join('\n')

  const oat = libraryFreeReading.find(b => b.title === 'One Alive Thing')!

  const sqhqMd = sqhqChips
    .map(c => `- **[${c.title}](${c.href})** · ${c.sub}`)
    .join('\n')

  return `# Lane Belone

> Writer, speaker and guide. Former U.S. Army Green Beret, co-author of Unleash Your Humble Alpha, founder of Side Quest HQ, practitioner of joyful sovereignty and the Infinite Game.

Exploring the Infinite Game. Writing, speaking and sharing breadcrumbs along the way.

## Happening Now

${happeningNowMd}

## Joyful Sovereignty

"Spacious. Playful. At peace. The whole game, played from the inside."

An approach to playing the Infinite Game through joy and embodied play rather than strategy and optimization. Power without performance. Aliveness without effort. [Explore Joyful Sovereignty](${SITE}/joyful-sovereignty)

## A Library Preview

A small shelf of tools for playing the game of your life more beautifully. Start free, go as deep as you like. Each one meets you where you are and opens a door to where you're headed. [Browse the full library](${SITE}/library)

### The Operating System

- **[${libraryAliveBusiness.title}](${libraryAliveBusiness.href})** (${libraryAliveBusiness.price}) · ${libraryAliveBusiness.oneLiner}

### Playbooks

- **[${librarySlp.title}](${librarySlp.href})** (${librarySlp.price}) · ${librarySlp.oneLiner}
- **[${librarySqp.title}](${librarySqp.href})** (${librarySqp.price}) · ${librarySqp.oneLiner}
- **[${libraryCfp.title}](${libraryCfp.href})** (${libraryCfp.price}) · ${libraryCfp.oneLiner}
- **[${libraryTrilogy.title}](${libraryTrilogy.href})** (${libraryTrilogy.price}, ${libraryTrilogy.savings}) · Take all three as one arc.

### Field Guides

Six short reads, $9 each. Start anywhere.

${fieldGuidesMd}

### Collections

${homeCollectionsMd}

### Start Free

- **[${oat.title}](${oat.href})** (${oat.priceLabel}) · ${oat.blurb}

## Recent Writing

Essays on the infinite game, sovereignty, flow and perception. [Read the full archive](${SITE}/blog)

## Work with Me at Side Quest HQ

This is where the tools, events and one-on-one work live. Four doors, all open:

${sqhqMd}

## About Lane

I'm a former Green Beret turned life designer. Published author, retreat leader and advisor to founders and entrepreneurs navigating real transitions. [Read the full story](${SITE}/about)

## Speaking

Keynotes and talks on perception, flow, joyful sovereignty and the Infinite Game. [Invite me to speak](${SITE}/speaking)

## Connect

Start a conversation. Reach out at [${SITE}/#connect](${SITE}/#connect).

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

Inviting leaders, creators and communities into experiences that spark clarity, presence and genuine insight.

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

## Stay Connected

If the story resonated, this is the personal list. Updates and fresh ideas, the kind you'll actually open. Subscribe at [${SITE}/about#stay-connected](${SITE}/about#stay-connected).

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

function generateLibraryMarkdown(): string {
  const aliveBusiness = `- **[${libraryAliveBusiness.title}](${libraryAliveBusiness.href})** (${libraryAliveBusiness.price}) · ${libraryBlurbs[libraryAliveBusiness.href]}`
  const slp = `- **[${librarySlp.title}](${librarySlp.href})** (${librarySlp.price}) · ${libraryBlurbs[librarySlp.href]}`
  const sqp = `- **[${librarySqp.title}](${librarySqp.href})** (${librarySqp.price}) · ${libraryBlurbs[librarySqp.href]}`
  const cfp = `- **[${libraryCfp.title}](${libraryCfp.href})** (${libraryCfp.price}) · ${libraryBlurbs[libraryCfp.href]}`
  const trilogy = `- **[${libraryTrilogy.title}](${libraryTrilogy.href})** (${libraryTrilogy.price}, ${libraryTrilogy.savings}) · ${libraryTrilogy.blurb}`
  const business = aiBusinessArc
    .map(c => `- **[${c.title}](${c.href})** (${c.price}) · ${libraryBlurbs[c.href]}`)
    .join('\n')
  const personal = aiPersonalArc
    .map(c => `- **[${c.title}](${c.href})** (${c.price}) · ${libraryBlurbs[c.href]}`)
    .join('\n')
  const collections = libraryCollections
    .map(c => `- **[${c.title}](${c.href})** (${c.price}, ${c.savings}) · ${c.blurb}`)
    .join('\n')
  const free = libraryFreeReading
    .map(b => `- **[${b.title}](${b.href.startsWith('http') ? b.href : `${SITE}${b.href}`})** (Free) · ${b.blurb}`)
    .join('\n')
  const print = libraryPrintBooks
    .map(b => `- **[${b.title}](${b.href})** · ${b.blurb}`)
    .join('\n')

  return `# The Library · Lane Belone

> Tools for playing the game of your life more beautifully. An operating system, three playbooks and the Trilogy that binds them, six AI Field Guides across the business and personal arcs, three Collections, two free reads and a book.

Your life is a game you get to co-create. With awareness, creativity and sovereignty, you play a more beautiful one. So this is where the good stuff lives. Some of it is free, some carries a price. The operating system, playbooks, Field Guides and Collections are hosted on Side Quest HQ (https://sidequesthq.co).

## The Operating System

${aliveBusiness}

## Playbooks

${slp}
${sqp}
${cfp}
${trilogy}

## Business Arc

${business}

## Personal Arc

${personal}

## Collections

${collections}

## Free Reading

${free}

## Books

${print}

---
*[Lane Belone](${SITE}) · [Library](${SITE}/library)*
`
}

function generateLinksMarkdown(): string {
  const linksMd = linkHub
    .map(item => {
      const href = item.href.startsWith('http') ? item.href : `${SITE}${item.href}`
      const sub = item.sublabel ? ` · ${item.sublabel}` : ''
      return `- **[${item.label}](${href})**${sub}`
    })
    .join('\n')

  const socialsMd = socialLinks
    .map(s => `- [${s.label}](${s.href})`)
    .join('\n')

  return `# Links · Lane Belone

> Every Lane Belone destination in one place.

Writer, speaker and guide of the Infinite Game. Everything worth pointing you to, in one place.

## Destinations

${linksMd}

## Social

${socialsMd}

---
*[Lane Belone](${SITE}) · [Links](${SITE}/links)*
`
}

export function getMarkdownForPath(path: string): string | null {
  if (path === '') return generateHomeMarkdown()
  if (path === 'joyful-sovereignty') return generateJoyfulSovereigntyMarkdown()
  if (path === 'speaking') return generateSpeakingMarkdown()
  if (path === 'about') return generateAboutMarkdown()
  if (path === 'library') return generateLibraryMarkdown()
  if (path === 'links') return generateLinksMarkdown()
  if (path === 'blog') return generateBlogIndexMarkdown()
  if (path.startsWith('blog/f/')) {
    const slug = path.replace('blog/f/', '')
    return generateBlogPostMarkdown(slug)
  }
  return pages[path] ?? null
}
