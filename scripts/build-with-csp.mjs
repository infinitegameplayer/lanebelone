// `npm run build`. Two passes of `next build` so the prerendered pages can ship
// a hash-based CSP and stay static.
//
// Next reads its headers before it renders a page, so the hashes of a page's
// inline scripts only exist after the build that needs them. Pass one renders
// the pages and scripts/csp-hashes.mjs records the hashes. Pass two builds the
// same source again with those hashes in next.config.ts headers. Both passes
// share one build ID, which is the only thing that varies between two builds
// of the same source, so the pages come out byte-identical.
//
// It fails closed to the 'unsafe-inline' policy, never to a policy with
// neither. If the hashes cannot be read, pass one (built without a manifest,
// so it carries 'unsafe-inline') is what ships. If pass two's pages differ
// from the hashes it was built with, a third build without the manifest
// replaces it. Either way the build log says so.
import { execSync } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'

const MANIFEST = '.csp/csp-hashes.json'
const run = (cmd, env) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } })
const succeeds = (cmd) => {
  try {
    run(cmd)
    return true
  } catch {
    return false
  }
}
const warn = (message) =>
  console.warn(`\nbuild-with-csp: WARNING ${message} This deploy keeps the 'unsafe-inline' script-src.\n`)

fs.rmSync(MANIFEST, { force: true })
const buildId = { CSP_BUILD_ID: crypto.randomBytes(12).toString('base64url') }

run('next build', buildId)
if (!succeeds(`node scripts/csp-hashes.mjs ${MANIFEST}`)) {
  warn('the inline script hashes could not be read from the build.')
  process.exit(0)
}

run('next build', { ...buildId, CSP_HASH_MANIFEST: MANIFEST })
if (!succeeds(`node scripts/csp-hashes.mjs ${MANIFEST} --verify`)) {
  warn('the second pass rendered different inline scripts than the first. Rebuilding without hashes.')
  run('next build', buildId)
}
