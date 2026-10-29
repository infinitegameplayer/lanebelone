import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { buildCsp } from './csp'

// A header that restricts framing names its casualties. The policy shipped on
// 2026-06-02 with no frame-src, so frames fell back to default-src 'self' and
// the replay post's Vimeo player was refused in every browser for four months.
// The header comment had listed the embeds by hand and missed it. This test
// reads the embeds out of the content instead, so a new iframe host fails here
// before it fails on the page, and a host left in the policy after its embed
// is gone fails too (craft harvest 2026-10-29, item 1).

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content')

function contentFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return contentFiles(full)
    return /\.(md|mdx|html)$/.test(entry.name) ? [full] : []
  })
}

// The iframe origins in one piece of text. A protocol-relative src resolves to
// https, since the site is served over https only.
function originsIn(text: string): string[] {
  const found: string[] = []
  for (const match of text.matchAll(/<iframe[^>]*\ssrc=["']([^"']+)["']/gi)) {
    const src = match[1].startsWith('//') ? `https:${match[1]}` : match[1]
    if (/^https?:\/\//.test(src)) found.push(new URL(src).origin)
  }
  return found
}

// Every iframe origin the content carries, with the files that carry it.
function iframeOrigins(): Map<string, string[]> {
  const origins = new Map<string, string[]>()
  for (const file of contentFiles(CONTENT_DIR)) {
    for (const origin of originsIn(fs.readFileSync(file, 'utf8'))) {
      origins.set(origin, [...(origins.get(origin) ?? []), path.relative(CONTENT_DIR, file)])
    }
  }
  return origins
}

// The sources that govern a frame, in the browser's fallback order:
// frame-src, then child-src, then default-src.
function frameSources(policy: string): string[] {
  const directives = new Map(
    policy.split(';').map((d) => {
      const [name, ...sources] = d.trim().split(/\s+/)
      return [name, sources] as const
    }),
  )
  return directives.get('frame-src') ?? directives.get('child-src') ?? directives.get('default-src') ?? []
}

describe('the CSP lets every embedded frame load, and no other', () => {
  const origins = iframeOrigins()

  // The content may carry no iframe at all (the Vimeo replay was removed on
  // 2026-10-29, its video gone), so the scanner proves it can see one on a
  // fixed sample instead. A scanner that found nothing anywhere would
  // otherwise pass every check below.
  it('finds an iframe in a sample, so an empty scan of the content means none, not blindness', () => {
    expect(originsIn('<p></p><div><iframe src="//player.example.com/v/1" allowfullscreen=""></iframe></div>')).toEqual([
      'https://player.example.com',
    ])
  })

  for (const [origin, files] of origins) {
    it(`allows ${origin} (${files.join(', ')})`, () => {
      expect(frameSources(buildCsp([]))).toContain(origin)
    })
  }

  // Least privilege: a host in frame-src that no content embeds is a door left
  // open after the guest has gone.
  it('names no frame host the content does not embed', () => {
    const extra = frameSources(buildCsp([])).filter((s) => s !== "'self'" && !origins.has(s))
    expect(extra).toEqual([])
  })
})
