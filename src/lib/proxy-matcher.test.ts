import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join, sep } from 'node:path'

// Every page that renders on each request (force-dynamic) needs the nonce
// policy from src/proxy.ts, because the static policy in next.config.ts holds
// hashes only for the prerendered pages' scripts. A dynamic page left off the
// matcher gets the static policy, its inline scripts are refused and it never
// comes to life in the browser. That shipped once, in the 2026-11-07 preview of
// /articles/join (a scanner probe saw no button), and this test was added the
// same day so it cannot ship again.

const appDir = join(process.cwd(), 'src', 'app')
const proxySrc = readFileSync(join(process.cwd(), 'src', 'proxy.ts'), 'utf8')
const matcher = [...(proxySrc.match(/matcher:\s*\[([^\]]*)\]/)?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1])

function routeOf(pageFile: string): string {
  const rel = pageFile.slice(appDir.length).split(sep).slice(0, -1)
  // Route groups like (marketing) do not appear in the URL.
  const parts = rel.filter((p) => p && !(p.startsWith('(') && p.endsWith(')')))
  return '/' + parts.join('/')
}

const dynamicPages = (readdirSync(appDir, { recursive: true }) as string[])
  .filter((f) => f.endsWith(`${sep}page.tsx`) || f === 'page.tsx')
  .map((f) => join(appDir, f))
  .filter((f) => /export const dynamic = 'force-dynamic'/.test(readFileSync(f, 'utf8')))
  .map(routeOf)
  // A dynamic segment ([slug]) is matched by a :path* entry above it, if any.
  .filter((r) => !r.includes('['))

describe('the nonce policy reaches every server-rendered page', () => {
  it('reads the matcher', () => {
    expect(matcher.length).toBeGreaterThan(0)
  })
  for (const route of dynamicPages) {
    it(`${route} is in the proxy matcher`, () => {
      const covered = matcher.some((m) => m === route || (m.endsWith('/:path*') && route.startsWith(m.slice(0, -'/:path*'.length) + '/')))
      expect(covered).toBe(true)
    })
  }
})
