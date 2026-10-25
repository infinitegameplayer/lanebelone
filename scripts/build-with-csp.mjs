// `npm run build`. Two passes of `next build` so the prerendered pages can ship
// a hash-based CSP and stay static.
//
// Next reads its headers before it renders a page, so the hashes of a page's
// inline scripts only exist after the build that needs them. Pass one renders
// the pages and scripts/csp-hashes.mjs records the hashes. Pass two builds the
// same source again with those hashes in next.config.ts headers. Both passes
// share one build ID, which is the only thing that varies between two builds
// of the same source, so the pages come out byte-identical. The verify step
// proves it and stops the deploy if they ever differ.
import { execSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'

const MANIFEST = '.csp/csp-hashes.json'
const run = (cmd, env) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } })

fs.rmSync(MANIFEST, { force: true })
const buildId = { CSP_BUILD_ID: crypto.randomBytes(12).toString('base64url') }

run('next build', buildId)
run(`node scripts/csp-hashes.mjs ${MANIFEST}`)
run('next build', { ...buildId, CSP_HASH_MANIFEST: MANIFEST })
run(`node scripts/csp-hashes.mjs ${MANIFEST} --verify`)
