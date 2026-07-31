#!/usr/bin/env node
/**
 * verify-discoverability-baseline.mjs
 *
 * Live discoverability baseline check for lanebelone.com. Confirms the
 * machine-legible surface AI crawlers and agents depend on is actually being
 * served, from the live www origin, following redirects.
 *
 * It asserts three classes of truth:
 *
 *   1. Static discovery files serve HTTP 200 with sane content:
 *        - /robots.txt      (Sitemap directive + a User-agent group)
 *        - /llms.txt        (markdown header, expected sections)
 *        - /llms-full.txt   (markdown header)
 *        - /sitemap.xml     (urlset with at least one www <loc>)
 *        - /rss.xml         (rss root with a channel)
 *
 *   2. www-canonical holds across BOTH llms surfaces. Web Strategy Codex V.9 is
 *      www-canonical, and an apex-form internal link teaches a crawler the wrong
 *      origin. The sibling Side Quest HQ script checks llms.txt only, which is
 *      how four apex links sat unnoticed in its llms-full.txt. This one checks
 *      both, because the gap was the whole reason the drift survived.
 *
 *   3. JSON-LD is present where the page-type table requires it:
 *        - homepage carries Person AND WebSite nodes
 *        - homepage <link rel="canonical"> is the www origin
 *        - every sitemap URL resolves 200 (a sitemap advertising a dead URL
 *          spends crawler trust the site does not get back cheaply)
 *
 * Why this exists. Coverage was one site deep. Only sidequesthq carried a live
 * net, so lanebelone and infinitegameos could drift for months and look fine,
 * because looking fine is exactly what a stale surface does. Written 2026-07-24
 * as the Site Update coverage rotation's first extension. On its first run it
 * found eight apex-form links in llms.txt and two in llms-full.txt.
 *
 * Reference: Web Strategy Codex V.9 (www-canonical), VI.7 (page-type schema).
 *
 * Runtime: post-deploy gate or manual. Pairs with Deploy Seal.
 *   Manual:   node scripts/verify-discoverability-baseline.mjs
 *   CI gate:  node scripts/verify-discoverability-baseline.mjs --json
 *
 * Flags:
 *   --base <url>   Origin to check. Default https://www.lanebelone.com
 *   --json         Emit a structured JSON report on stdout.
 *   --skip-sitemap Skip the per-URL sitemap resolution sweep (faster).
 *   --help         Print usage.
 *
 * Exit code: 0 when every check passes, 1 on any failure.
 *
 * Ambassador Doctrine: external-facing fetcher. The User-Agent identifies the
 * routine and links back to the site association (Saṃśraya: confirm the outward
 * surface before declaring it sound).
 */

const DEFAULT_BASE = 'https://www.lanebelone.com'
const APEX_ORIGIN = 'https://lanebelone.com'
const APEX_RE = /https:\/\/lanebelone\.com/g
const UA =
  'LaneBelone-DiscoverabilityBaseline/1.0 (+https://www.lanebelone.com; Kingdom discoverability self-audit)'

function parseArgs(argv) {
  const args = { base: DEFAULT_BASE, json: false, skipSitemap: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--base') args.base = argv[++i]
    else if (a === '--json') args.json = true
    else if (a === '--skip-sitemap') args.skipSitemap = true
    else if (a === '--help') args.help = true
  }
  return args
}

async function fetchResource(url, accept) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: accept } })
  const body = await res.text()
  return { status: res.status, finalUrl: res.url, body }
}

function extractJsonLdBlocks(html) {
  const blocks = []
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1].trim()))
    } catch {
      blocks.push({ __parseError: true })
    }
  }
  return blocks
}

function flattenNodes(block) {
  if (Array.isArray(block)) return block.flatMap(flattenNodes)
  if (block && typeof block === 'object') {
    if (Array.isArray(block['@graph'])) return block['@graph'].flatMap(flattenNodes)
    return [block]
  }
  return []
}

function typesPresent(html) {
  const types = new Set()
  for (const block of extractJsonLdBlocks(html)) {
    for (const node of flattenNodes(block)) {
      if (node && typeof node['@type'] === 'string') types.add(node['@type'])
    }
  }
  return types
}

async function checkStaticFile(base, path, sanity) {
  const url = `${base}${path}`
  const violations = []
  let res
  try {
    res = await fetchResource(url, '*/*')
  } catch (err) {
    return { name: path, violations: [`fetch error: ${err.message}`] }
  }
  if (res.status !== 200) {
    violations.push(`HTTP ${res.status} (expected 200, resolved ${res.finalUrl})`)
    return { name: path, violations }
  }
  violations.push(...sanity(res.body))
  return { name: path, violations }
}

function apexViolations(body, label) {
  const apex = body.match(APEX_RE)
  return apex ? [`${apex.length} apex-form internal link(s) in ${label} (codex V.9 is www-canonical)`] : []
}

function sanityRobots(body) {
  const v = []
  if (!/sitemap:/i.test(body)) v.push('no Sitemap directive')
  if (!/user-agent:/i.test(body)) v.push('no User-agent group')
  return v
}

// The line this script used to assert exists and never read. A robots.txt can
// point a crawler at an apex-form or dead sitemap while every other check
// passes. Backported from the infinitegameos net, 2026-07-31.
async function checkRobotsSitemapDirective(base) {
  const violations = []
  let body
  try {
    const res = await fetchResource(`${base}/robots.txt`, '*/*')
    if (res.status !== 200) {
      return { name: 'robots.txt Sitemap directive', violations: [`robots.txt HTTP ${res.status}`] }
    }
    body = res.body
  } catch (err) {
    return { name: 'robots.txt Sitemap directive', violations: [`fetch error: ${err.message}`] }
  }

  const lines = [...body.matchAll(/^\s*sitemap:\s*(\S+)\s*$/gim)].map((m) => m[1])
  if (lines.length === 0) {
    return { name: 'robots.txt Sitemap directive', violations: ['no Sitemap directive'] }
  }

  for (const url of lines) {
    if (!url.startsWith(`${base}/`)) {
      violations.push(`Sitemap directive is ${url}, expected the ${base} origin`)
      continue
    }
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } })
      if (res.status !== 200) violations.push(`Sitemap directive ${url} -> HTTP ${res.status}`)
    } catch (err) {
      violations.push(`Sitemap directive ${url} -> ${err.message}`)
    }
  }
  return { name: `robots.txt Sitemap directive (${lines.length})`, violations }
}

// Proves the redirect detector can see a redirect that is present, before any
// absence of redirects is believed. The apex origin is known to redirect to www.
async function redirectDetectorControl() {
  try {
    const res = await fetch(`${APEX_ORIGIN}/`, {
      method: 'HEAD',
      redirect: 'manual',
      headers: { 'User-Agent': UA },
    })
    if (res.status >= 300 && res.status < 400) return { ok: true, observed: res.status }
    return { ok: false, observed: `HTTP ${res.status} from ${APEX_ORIGIN} (expected a 3xx)` }
  } catch (err) {
    return { ok: false, observed: `control fetch error: ${err.message}` }
  }
}

function sanityLlms(body) {
  const v = []
  if (!/^#\s+Lane Belone/m.test(body)) v.push('missing "# Lane Belone" header')
  if (!/##\s+Pages/.test(body)) v.push('missing "## Pages" section')
  v.push(...apexViolations(body, 'llms.txt'))
  return v
}

function sanityLlmsFull(body) {
  const v = []
  if (!/^#\s+/m.test(body)) v.push('missing markdown header')
  v.push(...apexViolations(body, 'llms-full.txt'))
  return v
}

function sanitySitemap(body) {
  const v = []
  if (!/<urlset[\s>]/.test(body)) v.push('no <urlset> root')
  if (!/<loc>https:\/\/www\.lanebelone\.com/.test(body)) v.push('no www <loc> entries')
  return v
}

function sanityRss(body) {
  const v = []
  if (!/<rss[\s>]/.test(body) && !/<feed[\s>]/.test(body)) v.push('no <rss> or <feed> root')
  if (!/<channel[\s>]/.test(body) && !/<entry[\s>]/.test(body)) v.push('no channel or entries')
  return v
}

async function checkHomepage(base) {
  const results = []
  let html
  try {
    const res = await fetchResource(`${base}/`, 'text/html')
    if (res.status !== 200) {
      return [{ name: 'homepage', violations: [`HTTP ${res.status} (resolved ${res.finalUrl})`] }]
    }
    html = res.body
  } catch (err) {
    return [{ name: 'homepage', violations: [`fetch error: ${err.message}`] }]
  }

  const jsonLd = []
  const types = typesPresent(html)
  if (!types.has('Person')) jsonLd.push('no Person JSON-LD node')
  if (!types.has('WebSite')) jsonLd.push('no WebSite JSON-LD node')
  results.push({ name: 'homepage JSON-LD', violations: jsonLd })

  const canon = []
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  if (!m) canon.push('no canonical link element')
  else if (!m[1].startsWith('https://www.lanebelone.com')) canon.push(`canonical is ${m[1]}, expected www origin`)
  results.push({ name: 'homepage canonical', violations: canon })

  return results
}

async function checkSitemapUrls(base) {
  let body
  try {
    const res = await fetchResource(`${base}/sitemap.xml`, '*/*')
    if (res.status !== 200) return [{ name: 'sitemap URLs', violations: [`sitemap HTTP ${res.status}`] }]
    body = res.body
  } catch (err) {
    return [{ name: 'sitemap URLs', violations: [`fetch error: ${err.message}`] }]
  }

  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  if (locs.length === 0) return [{ name: 'sitemap URLs', violations: ['no <loc> entries'] }]

  // Resolved with redirect: 'manual' since 2026-07-31. A plain fetch follows
  // redirects, so a sitemap URL that 301s elsewhere reported 200 and passed,
  // and a sitemap advertising a hop spends crawler budget the site does not get
  // back. The commit that fixed 116 redirect hops on this site landed while this
  // very check was reporting PASS.
  const control = await redirectDetectorControl()
  const results = [
    {
      name: 'redirect detector control',
      violations: control.ok ? [] : [`control failed, redirect result is void: ${control.observed}`],
    },
  ]
  if (!control.ok) {
    results.push({ name: 'sitemap URLs', violations: ['skipped: redirect detector control failed'] })
    return results
  }

  const bad = []
  // Sequential rather than parallel: this is a courtesy crawl of the Kingdom's
  // own origin, and a burst of 50+ concurrent requests is what a crawler that
  // gets blocked looks like.
  for (const url of locs) {
    try {
      const res = await fetch(url, { method: 'HEAD', redirect: 'manual', headers: { 'User-Agent': UA } })
      if (res.status >= 300 && res.status < 400) {
        bad.push(`${url} -> HTTP ${res.status} redirect to ${res.headers.get('location') ?? 'unknown'}`)
      } else if (res.status !== 200) {
        bad.push(`${url} -> HTTP ${res.status}`)
      }
    } catch (err) {
      bad.push(`${url} -> ${err.message}`)
    }
  }
  results.push({ name: `sitemap URLs (${locs.length} checked, hop-free)`, violations: bad })
  return results
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    console.log(
      'Usage: node scripts/verify-discoverability-baseline.mjs [--base <url>] [--json] [--skip-sitemap]'
    )
    process.exit(0)
  }

  const base = args.base.replace(/\/$/, '')

  const results = []
  results.push(await checkStaticFile(base, '/robots.txt', sanityRobots))
  results.push(await checkRobotsSitemapDirective(base))
  results.push(await checkStaticFile(base, '/llms.txt', sanityLlms))
  results.push(await checkStaticFile(base, '/llms-full.txt', sanityLlmsFull))
  results.push(await checkStaticFile(base, '/sitemap.xml', sanitySitemap))
  results.push(await checkStaticFile(base, '/rss.xml', sanityRss))
  results.push(...(await checkHomepage(base)))
  if (!args.skipSitemap) results.push(...(await checkSitemapUrls(base)))

  const failed = results.filter((r) => r.violations.length > 0)

  if (args.json) {
    console.log(
      JSON.stringify(
        { ok: failed.length === 0, checked: results.length, failed: failed.length, base, results },
        null,
        2
      )
    )
  } else {
    console.log(`Discoverability baseline against ${base}. ${results.length} checks\n`)
    for (const r of results) {
      if (r.violations.length === 0) {
        console.log(`  PASS  ${r.name}`)
      } else {
        console.log(`  FAIL  ${r.name}`)
        for (const v of r.violations) console.log(`          ${v}`)
      }
    }
    console.log(
      `\n${failed.length === 0 ? 'Discoverability baseline holds.' : `${failed.length} check(s) need attention.`}`
    )
  }

  process.exit(failed.length === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error(`verify-discoverability-baseline: ${err.message}`)
  process.exit(1)
})
