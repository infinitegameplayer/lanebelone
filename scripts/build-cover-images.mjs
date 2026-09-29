#!/usr/bin/env node
// build-cover-images.mjs
//
// Writes pre-sized WebP copies of the product covers into public/covers, plus
// src/lib/cover-manifest.json listing what exists. src/lib/local-cover.ts maps a
// Blob cover URL to its local copy when the manifest has it, and passes the Blob
// URL through when it does not, so a missing file never breaks a page. The covers
// belong to Side Quest HQ; this site keeps its own copies so it never depends on
// that deploy.
//
// Why (2026-09-29): pages loaded the full 1600px PNG masters straight from
// Side Quest HQ's public Blob store. /library weighed 16.2 MB a view, and Blob Data Transfer is
// metered on every download, so page views and a screenshot sweep spent the
// month's Blob allowance and Vercel paused both stores. The Blob URLs stay
// canonical for the Product schema, the Merchant feed and social cards; only what
// a visitor's browser downloads comes from here.
//
// Widths come from measured render sizes at 2x density: portrait covers render at
// most ~340 CSS px (800px file), bundle and square images at most ~663 (1400px).
//
//   node scripts/build-cover-images.mjs              build from the pipeline masters
//   node scripts/build-cover-images.mjs --src <dir>  masters named <slug>-<kind>.png
//
// Run it after a cover changes in the pipeline, then commit public/covers and the
// manifest. On 2026-09-29 all 66 masters matched their Blob copies byte for byte
// (sizes from the Blob list API); re-check that way if the two may have drifted.

import sharp from 'sharp'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const argSrc = process.argv.indexOf('--src')
const SRC = argSrc > 0 ? process.argv[argSrc + 1]
  : 'C:/Users/User/Desktop/Kingdom/Side Quest HQ/Offerings/Digital Products/Delivery/pipeline/output'
const OUT = join(ROOT, 'public', 'covers')
const MANIFEST = join(ROOT, 'src', 'lib', 'cover-manifest.json')
const WIDTH = { 'cover-print': 800, 'cover-display': 800, 'cover-1x1': 1400, 'cover-4x3': 1400, 'bundle-1x1': 1400, 'bundle-4x3': 1400 }

// The slugs whose covers this site shows, read from page-data.ts so the
// generator never invents a product. Every kind is built for each slug, since
// the library swaps the 4:3 crop for the portrait display cover.
const pageData = readFileSync(join(ROOT, 'src', 'lib', 'page-data.ts'), 'utf8')
const slugs = new Set([...pageData.matchAll(/\$\{SQHQ_BLOB\}\/([a-z0-9-]+)\//g)].map(m => m[1]))

if (!existsSync(SRC)) { console.error(`masters not found: ${SRC}`); process.exit(2) }
const masters = readdirSync(SRC).filter(f => /-(cover|bundle)-(1x1|4x3|print|display)\.png$/.test(f))
const manifest = []
for (const f of masters.sort()) {
  const m = f.match(/^(.+)-((?:cover|bundle)-(?:1x1|4x3|print|display))\.png$/)
  const [, slug, kind] = m
  if (!slugs.has(slug)) continue
  mkdirSync(join(OUT, slug), { recursive: true })
  const out = join(OUT, slug, `${kind}.webp`)
  await sharp(join(SRC, f)).resize({ width: WIDTH[kind], withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(out)
  manifest.push(`${slug}/${kind}`)
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`wrote ${manifest.length} covers to public/covers and the manifest`)
