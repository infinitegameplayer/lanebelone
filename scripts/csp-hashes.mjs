// Reads every prerendered App Router page and records the SHA-256 of each
// inline script, so next.config.ts can allow exactly those scripts and no
// others. JSON-LD blocks are data, not script, and are skipped.
//
//   node scripts/csp-hashes.mjs <manifest.json>           write the manifest
//   node scripts/csp-hashes.mjs <manifest.json> --verify  fail if the built pages
//                                                         no longer match it
//
// The manifest holds one entry per route plus a fallback set (the 404 and
// global error pages), which next.config.ts adds to every route because either
// page can be served at any path.
//
// The routes come from .next/prerender-manifest.json, never from whatever HTML
// happens to be on disk. Next writes the HTML to one of two places: plain
// builds use server/app/<page>.html, and builds run with a deployment adapter
// (Vercel sets NEXT_ADAPTER_PATH) use server/route-cache/APP_PAGE/<hash>/$<page>.html.
// A route with no HTML, or a page with no inline script, exits non-zero, so a
// layout change can never pass as an empty manifest.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const SERVER_DIR = '.next/server'
const FALLBACK_ROUTES = ['/_not-found', '/_global-error']
// Static error pages Next copies out of the App Router 404 and global error.
const FALLBACK_FILES = ['pages/404.html', 'pages/500.html']
const ROUTE_PATTERN = /^\/[a-z0-9/-]*$/

const [manifestPath, flag] = process.argv.slice(2)
if (!manifestPath) {
  console.error('usage: node scripts/csp-hashes.mjs <manifest.json> [--verify]')
  process.exit(1)
}

const fail = (message) => {
  console.error(`csp-hashes: ${message}`)
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

function htmlFileFor(route) {
  const page = route === '/' ? '/index' : route
  const candidates = [path.join(SERVER_DIR, 'app', `${page}.html`)]
  const routeCache = path.join(SERVER_DIR, 'route-cache', 'APP_PAGE')
  if (fs.existsSync(routeCache)) {
    for (const source of fs.readdirSync(routeCache)) {
      candidates.push(path.join(routeCache, source, `$${page}.html`))
    }
  }
  const found = candidates.filter((file) => fs.existsSync(file))
  if (found.length !== 1) fail(`expected one HTML file for ${route}, found ${found.length}`)
  return found[0]
}

function collect() {
  const { routes } = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'))
  const appPages = Object.keys(routes).filter((route) => routes[route].dataRoute?.endsWith('.rsc'))
  if (appPages.length === 0) fail('no prerendered App Router pages in .next/prerender-manifest.json')

  const pages = {}
  const fallback = new Set()
  for (const route of appPages) {
    const hashes = inlineScriptHashes(fs.readFileSync(htmlFileFor(route), 'utf8'))
    if (hashes.length === 0) fail(`${route} has no inline scripts, which means the HTML layout changed`)
    if (FALLBACK_ROUTES.includes(route)) {
      hashes.forEach((h) => fallback.add(h))
      continue
    }
    if (!ROUTE_PATTERN.test(route)) fail(`unexpected route ${route}`)
    pages[route] = [...new Set(hashes)].sort()
  }
  for (const file of FALLBACK_FILES) {
    const full = path.join(SERVER_DIR, file)
    if (fs.existsSync(full)) inlineScriptHashes(fs.readFileSync(full, 'utf8')).forEach((h) => fallback.add(h))
  }
  if (fallback.size === 0) fail('no 404 or global error page found')
  return { fallback: [...fallback].sort(), pages }
}

const built = collect()

if (flag === '--verify') {
  const expected = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  if (JSON.stringify(expected) !== JSON.stringify(built)) {
    fail('the inline scripts in this build differ from the hashes its CSP was built with')
  }
  console.log(`csp-hashes: ${Object.keys(built.pages).length} pages verified against their CSP hashes`)
} else {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
  fs.writeFileSync(manifestPath, JSON.stringify(built, null, 2) + '\n')
  console.log(`csp-hashes: ${Object.keys(built.pages).length} pages hashed to ${manifestPath}`)
}
