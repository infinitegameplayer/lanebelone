import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { buildCsp } from './csp'

// A header that restricts framing names its casualties. The policy shipped on
// 2026-06-02 with no frame-src, so frames fell back to default-src 'self' and
// the replay post's Vimeo player was refused in every browser for four months.
// The header comment had listed the embeds by hand and missed it. This test
// reads the embeds out of the content instead, so a new iframe host fails here
// before it fails on the page (craft harvest 2026-10-29, item 1).

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content')

function contentFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return contentFiles(full)
    return /\.(md|mdx|html)$/.test(entry.name) ? [full] : []
  })
}

// Every iframe origin the content carries. A protocol-relative src resolves to
// https, since the site is served over https only.
function iframeOrigins(): Map<string, string[]> {
  const origins = new Map<string, string[]>()
  for (const file of contentFiles(CONTENT_DIR)) {
    const text = fs.readFileSync(file, 'utf8')
    for (const match of text.matchAll(/<iframe[^>]*\ssrc=["']([^"']+)["']/gi)) {
      const src = match[1].startsWith('//') ? `https:${match[1]}` : match[1]
      if (!/^https?:\/\//.test(src)) continue
      const origin = new URL(src).origin
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

describe('the CSP lets every embedded frame load', () => {
  const origins = iframeOrigins()

  it('finds the embeds it guards, so an empty scan cannot pass', () => {
    expect(origins.size).toBeGreaterThan(0)
  })

  for (const [origin, files] of origins) {
    it(`allows ${origin} (${files.join(', ')})`, () => {
      expect(frameSources(buildCsp([]))).toContain(origin)
    })
  }
})
