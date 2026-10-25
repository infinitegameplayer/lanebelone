// Reads every prerendered page in .next/server/app and records the SHA-256 of
// each inline script, so next.config.ts can allow exactly those scripts and no
// others. JSON-LD blocks are data, not script, and are skipped.
//
//   node scripts/csp-hashes.mjs <manifest.json>           write the manifest
//   node scripts/csp-hashes.mjs <manifest.json> --verify  fail if the built pages
//                                                         no longer match it
//
// The manifest holds one entry per route plus a fallback set (the 404 and
// global error pages), which next.config.ts adds to every route because either
// page can be served at any path.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const APP_DIR = '.next/server/app'
const FALLBACK_PAGES = ['_not-found', '_global-error']
const ROUTE_PATTERN = /^\/[a-z0-9/-]*$/

const [manifestPath, flag] = process.argv.slice(2)
if (!manifestPath) {
  console.error('usage: node scripts/csp-hashes.mjs <manifest.json> [--verify]')
  process.exit(1)
}

function inlineScriptHashes(html) {
  const hashes = []
  for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs)) continue
    const type = attrs.match(/\stype="([^"]*)"/)?.[1]
    if (type && type !== 'text/javascript' && type !== 'module') continue
    hashes.push(crypto.createHash('sha256').update(body, 'utf8').digest('base64'))
  }
  return hashes
}

function collect() {
  const pages = {}
  const fallback = new Set()
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.html')) {
        const name = path.relative(APP_DIR, full).replace(/\.html$/, '').split(path.sep).join('/')
        const hashes = inlineScriptHashes(fs.readFileSync(full, 'utf8'))
        if (FALLBACK_PAGES.includes(name)) {
          hashes.forEach((h) => fallback.add(h))
          continue
        }
        const route = name === 'index' ? '/' : `/${name}`
        if (!ROUTE_PATTERN.test(route)) throw new Error(`csp-hashes: unexpected route ${route}`)
        pages[route] = [...new Set(hashes)].sort()
      }
    }
  }
  walk(APP_DIR)
  return { fallback: [...fallback].sort(), pages }
}

const built = collect()

if (flag === '--verify') {
  const expected = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  if (JSON.stringify(expected) !== JSON.stringify(built)) {
    console.error(
      'csp-hashes: the inline scripts in this build differ from the hashes its CSP was built with.\n' +
        'Pages would load with their scripts blocked, so the build stops here.',
    )
    process.exit(1)
  }
  console.log(`csp-hashes: ${Object.keys(built.pages).length} pages verified against their CSP hashes`)
} else {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
  fs.writeFileSync(manifestPath, JSON.stringify(built, null, 2) + '\n')
  console.log(`csp-hashes: ${Object.keys(built.pages).length} pages hashed to ${manifestPath}`)
}
