import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// The articles sign-up names what happened, so the page never promises a
// welcome that is not coming. A reader already on the list gets no second
// welcome (by design), and the route now says so: status 'already-subscribed'.
// Found 2026-10-25 when the King's own test sign-up through the mobile bottom
// bar was thanked with "A welcome from Lane is landing" and no welcome came.

const { applyArticleOptInMock, applyNewsletterOptInMock } = vi.hoisted(() => ({
  applyArticleOptInMock: vi.fn(async () => ({ status: 'subscribed' })),
  applyNewsletterOptInMock: vi.fn(async () => ({ status: 'subscribed' })),
}))

// A Supabase stand-in: the audit insert, the contact lookup and the update all succeed.
const supabaseStub = {
  from: () => ({
    insert: async () => ({ error: null }),
    select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { id: 1, tags: [], first_name: null, last_name: null, unsubscribed: false }, error: null }) }) }),
    update: () => ({ eq: async () => ({ error: null }) }),
  }),
}

vi.mock('@/lib/bot-guard', () => ({ refuseBots: async () => null }))
vi.mock('@/lib/supabase', () => ({ getSupabaseAdmin: () => supabaseStub }))
vi.mock('@/lib/email/resend', () => ({ sendEmail: vi.fn(async () => ({ id: 'email_1' })) }))
vi.mock('@/lib/newsletter', () => ({ applyArticleOptIn: applyArticleOptInMock, applyNewsletterOptIn: applyNewsletterOptInMock }))

let POST: (req: NextRequest) => Promise<Response>

beforeAll(async () => {
  POST = (await import('./route')).POST
})

beforeEach(() => {
  applyArticleOptInMock.mockClear()
})

function articlesRequest() {
  return new NextRequest('https://www.lanebelone.com/api/form-submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', origin: 'https://www.lanebelone.com' },
    body: JSON.stringify({ formName: 'lanebelone-articles', email: 'reader@example.com', honeypot: '', openedAt: Date.now() - 5000 }),
  })
}

describe('form-submit, articles list status', () => {
  it('passes back already-subscribed, so the page does not promise a welcome', async () => {
    applyArticleOptInMock.mockResolvedValueOnce({ status: 'already-subscribed' })
    const res = await POST(articlesRequest())
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, status: 'already-subscribed' })
    expect(applyArticleOptInMock).toHaveBeenCalledTimes(1)
  })

  it('passes back subscribed for a new reader, whose welcome is on its way', async () => {
    const res = await POST(articlesRequest())
    expect(await res.json()).toEqual({ ok: true, status: 'subscribed' })
  })
})
