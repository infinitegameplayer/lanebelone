import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import sitemap from './sitemap'
import { ALL_SLUGS } from '@/lib/blog'

// Discoverability Part A (audit 2026-11-03). Each check below guards one class
// of fix so it cannot quietly return.

const APP = path.join(process.cwd(), 'src/app')
const SITE = 'https://www.lanebelone.com'

function pages(dir = APP): string[] {
  const out: string[] = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...pages(p))
    else if (e.name === 'page.tsx') out.push(p)
  }
  return out
}

const rel = (p: string) => path.relative(APP, p).replace(/\\/g, '/')
const src = (p: string) => fs.readFileSync(p, 'utf8')
const isNoindex = (s: string) => /index:\s*false/.test(s) || /force-dynamic/.test(s)

const indexable = pages().filter(p => !isNoindex(src(p)))

// Pages this build may not edit (task rules): /links and /privacy. Their
// defects are recorded in the PR ledger. Remove an entry once it is fixed.
const HELD = new Set(['links/page.tsx', 'privacy/page.tsx'])

describe('indexable pages', () => {
  it('finds the indexable pages', () => {
    expect(indexable.map(rel).sort()).toEqual([
      'about/page.tsx',
      'blog/f/[slug]/page.tsx',
      'blog/page.tsx',
      'cite/page.tsx',
      'joyful-sovereignty/page.tsx',
      'library/page.tsx',
      'links/page.tsx',
      'page.tsx',
      'privacy/page.tsx',
      'speaking/page.tsx',
      'terms/page.tsx',
    ])
  })

  for (const p of indexable) {
    const name = rel(p)
    it(`${name} declares a www canonical`, () => {
      expect(src(p)).toMatch(/canonical:\s*[`']https:\/\/www\.lanebelone\.com/)
    })

    if (HELD.has(name)) continue

    // D1: a page-level alternates object replaces the root one, so each page
    // carries the RSS alternate itself.
    it(`${name} keeps the RSS alternate link`, () => {
      expect(src(p)).toContain("'application/rss+xml': 'https://www.lanebelone.com/rss.xml'")
    })

    // D6: a page-level openGraph replaces the root one, so a page with no
    // opengraph-image file of its own names an image.
    it(`${name} has a share image`, () => {
      const hasFile = fs.existsSync(path.join(path.dirname(p), 'opengraph-image.tsx'))
      const s = src(p)
      const ogImages = /openGraph:\s*\{[\s\S]*?images:/.test(s)
      const twImages = /twitter:\s*\{[\s\S]*?images:/.test(s)
      expect(hasFile || (ogImages && twImages)).toBe(true)
    })
  }
})

describe('JSON-LD identity', () => {
  // D16: the Person @id comes from src/lib/identity.ts, never a hardcoded copy.
  it('no page hardcodes the Person @id', () => {
    for (const p of pages()) {
      expect(src(p), rel(p)).not.toContain("'https://infinitegameos.io/#person'")
    }
  })

  // D15: one ProfilePage on the site, on /about.
  it('only /about is a ProfilePage', () => {
    const withProfile = pages().filter(p => /'@type':\s*'ProfilePage'/.test(src(p))).map(rel)
    expect(withProfile).toEqual(['about/page.tsx'])
  })

  // D20: the blog index carries a BreadcrumbList and ties Blog to its list.
  it('the blog index carries BreadcrumbList and links Blog to the post list', () => {
    const s = src(path.join(APP, 'blog/page.tsx'))
    expect(s).toContain("'@type': 'BreadcrumbList'")
    expect(s).toContain("mainEntity: { '@id': 'https://www.lanebelone.com/blog#posts' }")
    expect(s).toContain("'@id': 'https://www.lanebelone.com/blog#posts',")
    expect(s).toContain('blogPost:')
  })

  // D22: the Humble Alpha Book node carries its ISBN and where to buy it.
  it('the Humble Alpha Book node carries isbn and url', () => {
    const s = src(path.join(APP, 'cite/page.tsx'))
    const node = s.slice(s.indexOf("name: 'Unleash Your Humble Alpha',") - 200)
    expect(node.slice(0, 600)).toContain("isbn: '173525472X'")
    expect(node.slice(0, 600)).toContain("url: 'https://www.amazon.com/Unleash-Your-Humble-Alpha-Presence/dp/173525472X'")
  })
})

describe('sitemap', () => {
  const urls = sitemap().map(e => e.url)

  it('lists every article at /blog/f/[slug]', () => {
    for (const slug of ALL_SLUGS) expect(urls).toContain(`${SITE}/blog/f/${slug}`)
  })

  it('lists every indexable static page and no noindex page', () => {
    const statics = indexable
      .map(rel)
      .filter(n => !n.includes('['))
      .map(n => (n === 'page.tsx' ? SITE : `${SITE}/${n.replace(/\/page\.tsx$/, '')}`))
    for (const u of statics) expect(urls).toContain(u)
    for (const p of pages().filter(p => isNoindex(src(p)))) {
      expect(urls).not.toContain(`${SITE}/${rel(p).replace(/\/page\.tsx$/, '')}`)
    }
  })

  it('has no duplicates and stays on the www host', () => {
    expect(new Set(urls).size).toBe(urls.length)
    for (const u of urls) expect(u.startsWith(SITE)).toBe(true)
  })
})
