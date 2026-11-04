import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import {
  ALL_SLUGS,
  LIVE_SLUGS,
  BLOG_ID,
  getAllPosts,
  getPostBySlug,
  articleJsonLd,
  articleBreadcrumbJsonLd,
  countWords,
  schemaDate,
} from './blog'
import { PERSON_ID, personJsonLd, personRef } from './identity'

// Discoverability Part A (audit 2026-11-03). Every article is read through
// src/lib/blog.ts and its schema checked against its own frontmatter.

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function frontmatter(slug: string): Record<string, unknown> {
  return matter(fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8')).data
}

describe('Article JSON-LD on every /blog/f/[slug] page', () => {
  it('reads every slug', () => {
    expect(getAllPosts()).toHaveLength(ALL_SLUGS.length)
  })

  for (const slug of ALL_SLUGS) {
    it(slug, () => {
      const post = getPostBySlug(slug)
      expect(post).not.toBeNull()
      const ld = articleJsonLd(post!)
      const fm = frontmatter(slug)
      const url = `https://www.lanebelone.com/blog/f/${slug}`

      expect(ld['@type']).toBe('BlogPosting')
      expect(ld.url).toBe(url)
      expect(ld.mainEntityOfPage).toBe(url)
      expect(ld.headline).toBe(fm.title)
      expect(ld.description).toBe(fm.description)

      // The author is the Person node from identity.ts.
      expect(ld.author).toEqual(personRef)
      expect((ld.author as { '@id': string })['@id']).toBe(PERSON_ID)

      // Dates come from frontmatter, never invented.
      expect(String(fm.date)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(ld.datePublished).toBe(`${fm.date}T12:00:00Z`)
      const modified = (fm.dateModified as string | undefined) || (fm.date as string)
      expect(ld.dateModified).toBe(`${modified}T12:00:00Z`)
      expect(ld.dateModified! >= ld.datePublished!).toBe(true)

      expect((ld.isPartOf as { '@id': string })['@id']).toBe(BLOG_ID)
      if (fm.heroImage) expect(ld.image).toBe(`https://www.lanebelone.com${fm.heroImage}`)

      const crumbs = articleBreadcrumbJsonLd(post!)
      expect(crumbs['@type']).toBe('BreadcrumbList')
      const items = crumbs.itemListElement as { position: number; item: string }[]
      expect(items.map(i => i.position)).toEqual([1, 2, 3])
      expect(items[2].item).toBe(url)
    })
  }
})

describe('one timestamp per frontmatter date', () => {
  it('schemaDate is noon UTC, matching Open Graph and RSS', () => {
    expect(schemaDate('2026-11-04')).toBe('2026-11-04T12:00:00Z')
  })

  it('the article page uses the shared builder and no midnight timestamps', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/app/blog/f/[slug]/page.tsx'), 'utf8')
    expect(src).not.toContain('T00:00:00Z')
    expect(src).not.toContain("'https://infinitegameos.io/#person'")
    expect(src).toContain('buildArticleJsonLd(post)')
    expect(src).toContain('articleBreadcrumbJsonLd(post)')
  })
})

describe('wordCount counts words a reader sees', () => {
  it('strips HTML tags and entities', () => {
    expect(countWords('<p class="x">Hello <strong>world</strong>&nbsp;</p><img src="a.png" alt="">')).toBe(2)
  })

  it('splits words joined by markup and drops attribute tokens', () => {
    expect(countWords('one<br>two <a href="https://x.y/z" class="c">three</a> <!-- note --> four')).toBe(4)
  })

  it('an html archive post counts its visible words (audit: about 316, raw tokens 293)', () => {
    const post = getPostBySlug('4-something-am-thoughts')!
    expect(post.format).toBe('html')
    expect(post.wordCount!).toBeGreaterThanOrEqual(305)
    expect(post.wordCount!).toBeLessThanOrEqual(330)
  })
})

describe('frontmatter', () => {
  it('every live post names its author', () => {
    for (const slug of LIVE_SLUGS) {
      const fm = frontmatter(slug)
      expect(fm.author, slug).toBe('Lane Belone')
      expect(fm.authorUrl, slug).toBe('https://www.lanebelone.com')
    }
  })

  it('every description is a clean preview (scripts/check-descriptions.mjs rule)', () => {
    for (const post of getAllPosts()) {
      expect(post.description, post.slug).not.toBe('')
      expect(post.description.length, post.slug).toBeLessThanOrEqual(160)
      expect(post.description, post.slug).not.toMatch(/(\.\.\.|…)$/)
    }
  })
})

describe('Person sameAs', () => {
  it('is a non-empty list of unique https URLs', () => {
    const sameAs = personJsonLd.sameAs
    expect(Array.isArray(sameAs)).toBe(true)
    expect(sameAs.length).toBeGreaterThan(0)
    expect(new Set(sameAs).size).toBe(sameAs.length)
    for (const u of sameAs) expect(u).toMatch(/^https:\/\//)
  })
})
