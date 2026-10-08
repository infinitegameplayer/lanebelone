// Writes the live article count into the agent manifests before every build.
//
// The count was kept by hand in three files and drifted in all three: on
// 2026-10-08 llms.txt and AGENTS.md said 49, llms-full.txt said 30, and the
// archive held 51. The Discoverability Sentinel caught the gap. The number now
// comes from src/content/blog, the same files the sitemap is built from.
//
// Each pattern must match exactly once. A pattern that matches nothing means
// someone reworded the sentence, and the build stops rather than shipping a
// stale count with nobody told.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const count = readdirSync(join(root, 'src/content/blog')).filter((f) => f.endsWith('.md')).length

const targets = [
  ['public/llms.txt', /(Essays and breadcrumbs from the Infinite Game, )\d+( of them and counting)/],
  ['public/llms-full.txt', /(## Blog Archive Topics \()\d+( articles\))/],
  ['public/AGENTS.md', /(The archive holds )\d+( articles)/],
]

let failed = false
for (const [file, re] of targets) {
  const path = join(root, file)
  const text = readFileSync(path, 'utf8')
  const hits = text.match(new RegExp(re.source, 'g')) || []
  if (hits.length !== 1) {
    console.error(`sync-llms-counts: ${file} matched ${hits.length} times, expected 1. Was the sentence reworded?`)
    failed = true
    continue
  }
  const next = text.replace(re, `$1${count}$2`)
  if (next !== text) writeFileSync(path, next, 'utf8')
  console.log(`sync-llms-counts: ${file} ${next === text ? 'already' : 'now'} reads ${count}`)
}
process.exitCode = failed ? 1 : 0
