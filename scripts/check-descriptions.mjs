// Stops the build when a blog post's description would make a poor link preview.
//
// The description is what iMessage, Slack, LinkedIn and Google show under the
// title when a post is shared. On 2026-10-12 the King noticed shared links
// trailing off: 31 older posts carried the article's first line cut at about
// 155 characters with "...", and 14 newer ones ran 160 to 296 characters, so
// the preview cut them mid-sentence. All 45 were rewritten that day as one or
// two complete sentences of 155 characters or fewer.
//
// A post fails when its description is missing, ends in "..." or runs past
// 160 characters. 155 is the drafting target; 160 is where previews cut.
// A positive control runs first, so a parser that matches nothing fails the
// build instead of passing it.

import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
// An optional directory argument points the check at a test folder.
const dir = process.argv[2] || join(root, 'src/content/blog')
const LIMIT = 160

function problems(text) {
  const m = text.match(/^description:\s*"?(.*?)"?\s*$/m)
  const d = m ? m[1].trim() : ''
  const out = []
  if (!d) out.push('missing')
  else {
    if (d.endsWith('...') || d.endsWith('…')) out.push('trails off with "..."')
    if (d.length > LIMIT) out.push(`${d.length} characters, over ${LIMIT}`)
  }
  return out
}

const control = '---\ntitle: "Control"\ndescription: "The first line of a post, cut off where the preview gave up..."\n---\n'
if (problems(control).length === 0) {
  console.error('check-descriptions: the positive control passed, so the check is blind. Stopping the build.')
  process.exit(1)
}

let failed = false
for (const f of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const found = problems(readFileSync(join(dir, f), 'utf8'))
  if (found.length) {
    failed = true
    console.error(`check-descriptions: ${f}: ${found.join('; ')}`)
  }
}

if (failed) {
  console.error('check-descriptions: write one or two complete sentences, 155 characters or fewer.')
  process.exit(1)
}
console.log('check-descriptions: every post carries a clean preview description')
