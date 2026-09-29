// Covers render from pre-sized WebP copies in /public/covers, built by
// scripts/build-cover-images.mjs from the pipeline masters. The Side Quest HQ Blob
// URLs in page-data.ts stay canonical for structured data and social cards; only
// what a visitor's browser downloads comes from here. A URL with no local copy
// passes through unchanged, so a page never loses its cover.
//
// 2026-09-29: the full 1600px masters loaded straight from Blob made /library a
// 16.2 MB page, and every view was metered against the Blob allowance.
import manifest from './cover-manifest.json'

const BLOB = 'https://5xfilrcirjl3skmn.public.blob.vercel-storage.com/'
const LOCAL = new Set<string>(manifest)

export function localCover(url: string): string
export function localCover(url: string | undefined): string | undefined
export function localCover(url: string | undefined): string | undefined {
  if (!url || !url.startsWith(BLOB)) return url
  const [slug, file] = url.slice(BLOB.length).split('/')
  const kind = file?.replace(/\.png$/, '')
  return kind && LOCAL.has(`${slug}/${kind}`) ? `/covers/${slug}/${kind}.webp` : url
}
