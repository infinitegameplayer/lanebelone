import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { NextRequest } from 'next/server'
import { GET } from './route'

// The old one-click link subscribed on open, so a mail scanner joined readers.
// It now only redirects to the scanner-proof join page (2026-11-07).
describe('the old articles one-click link', () => {
  it('redirects to /articles/join carrying the address and token', async () => {
    const res = await GET(new NextRequest('https://www.lanebelone.com/api/newsletter/articles-optin?email=a%2Bb%40example.com&token=abc123'))
    expect(res.status).toBe(307)
    const to = new URL(res.headers.get('location') ?? '')
    expect(to.pathname).toBe('/articles/join')
    expect(to.searchParams.get('email')).toBe('a+b@example.com')
    expect(to.searchParams.get('token')).toBe('abc123')
  })
  it('redirects a tokenless link without inventing a token', async () => {
    const res = await GET(new NextRequest('https://www.lanebelone.com/api/newsletter/articles-optin?email=reader%40example.com'))
    const to = new URL(res.headers.get('location') ?? '')
    expect(to.searchParams.get('email')).toBe('reader@example.com')
    expect(to.searchParams.has('token')).toBe(false)
  })
  it('writes nothing: the route imports no database or list helper', () => {
    const src = readFileSync(join(process.cwd(), 'src/app/api/newsletter/articles-optin/route.ts'), 'utf8')
    expect(src).not.toMatch(/supabase|applyArticleOptIn|@\/lib\/newsletter/)
  })
})
