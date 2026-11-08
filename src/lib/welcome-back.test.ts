import { beforeEach, describe, expect, it, vi } from 'vitest'

// Welcome back and the letters map in lanebelone's welcomes (PendingPlan - The
// Letters Map and Welcome Back, steps 2 and 4). The opt-in reads an earlier
// leave of this list and sends "Welcome back" instead of the first welcome; a
// first join still gets the first welcome; every welcome carries the map
// without its own list, beside the undo line.

const sent: { subject: string; html: string }[] = []
let returning = false
let contact: Record<string, unknown> | null = null

vi.mock('@/lib/email/resend', () => ({
  sendEmail: async (m: { subject: string; html: string }) => {
    sent.push(m)
  },
}))
const resendUpdates: { email: string; unsubscribed: boolean }[] = []
vi.mock('resend', () => ({
  Resend: class {
    contacts = {
      create: async () => ({}),
      update: async (u: { email: string; unsubscribed: boolean }) => {
        resendUpdates.push(u)
        return {}
      },
    }
    audiences = { list: async () => ({ data: { data: [] } }) }
  },
}))
vi.mock('@/lib/list-return', () => ({
  leftThisListBefore: async () => returning,
}))
vi.mock('@/lib/supabase', () => {
  const chain = {
    select: () => chain,
    eq: () => chain,
    maybeSingle: async () => ({ data: contact, error: null }),
    update: () => ({ eq: async () => ({ error: null }) }),
    insert: async () => ({ error: null }),
  }
  return { getSupabaseAdmin: () => ({ from: () => chain }) }
})

import { applyArticleOptIn, applyNewsletterOptIn } from './newsletter'
import { articleWelcomeEmail, listWelcomeBackEmail, newsletterWelcomeEmail } from './email/templates'

beforeEach(() => {
  sent.length = 0
  resendUpdates.length = 0
  returning = false
  process.env.UNSUBSCRIBE_SECRET = 'test-secret'
  process.env.NEWSLETTER_OPTIN_DRY_RUN = 'false'
  process.env.RESEND_AUDIENCE_PERSONAL_ID = 'aud-personal'
  process.env.RESEND_AUDIENCE_ARTICLES_ID = 'aud-articles'
})

// A rejoin left the reader unsubscribed in Resend until the next reconcile
// (2026-11-07: the test address on three lists), because create leaves an
// existing contact as it was.
describe('a join clears the Resend flag', () => {
  it('Personal', async () => {
    contact = known(['article_subscriber'])
    await applyNewsletterOptIn({ email: 'a@x.co', source: 'one-click:test' })
    expect(resendUpdates).toEqual([expect.objectContaining({ email: 'a@x.co', unsubscribed: false })])
  })
  it('Articles', async () => {
    contact = known(['personal_subscriber'])
    await applyArticleOptIn({ email: 'a@x.co', source: 'one-click:test' })
    expect(resendUpdates).toEqual([expect.objectContaining({ email: 'a@x.co', unsubscribed: false })])
  })
})

const known = (tags: string[]) => ({ id: 1, tags, first_name: 'Ana', last_name: null, unsubscribed: false, personal_joined_at: '2026-01-01' })

describe('the opt-in chooses the welcome', () => {
  it('a reader who left Personal and rejoins gets Welcome back', async () => {
    contact = known(['article_subscriber'])
    returning = true
    expect((await applyNewsletterOptIn({ email: 'a@x.co', source: 'one-click:test' })).status).toBe('subscribed')
    expect(sent.map((m) => m.subject)).toEqual(['Welcome back'])
    expect(sent[0].html).toContain("You're back on the personal notes.")
  })
  it('a first Personal join gets the first welcome', async () => {
    contact = known(['article_subscriber'])
    await applyNewsletterOptIn({ email: 'a@x.co', source: 'one-click:test' })
    expect(sent.map((m) => m.subject)).toEqual(["Howdy. (Yes, that's actually my email.)"])
  })
  it('a reader who left Articles and rejoins gets Welcome back', async () => {
    contact = known(['personal_subscriber'])
    returning = true
    await applyArticleOptIn({ email: 'a@x.co', source: 'one-click:test' })
    expect(sent.map((m) => m.subject)).toEqual(['Welcome back'])
    expect(sent[0].html).toContain("You're back on the articles list.")
  })
  it('a first Articles join gets the first welcome', async () => {
    contact = known(['personal_subscriber'])
    await applyArticleOptIn({ email: 'a@x.co', source: 'one-click:test' })
    expect(sent.map((m) => m.subject)).toEqual(["You're in. New writing, straight to you."])
  })
})

describe('the welcomes carry the map without their own list', () => {
  const leaveUrl = 'https://www.lanebelone.com/x/leave?t=1'
  const cases = [
    ['Personal welcome', newsletterWelcomeEmail({ email: 'a@x.co', leaveUrl }).html, 'Personal notes'],
    ['Articles welcome', articleWelcomeEmail({ email: 'a@x.co', leaveUrl }).html, 'Articles'],
    ['Personal welcome back', listWelcomeBackEmail({ list: 'personal', email: 'a@x.co', leaveUrl }).html, 'Personal notes'],
    ['Articles welcome back', listWelcomeBackEmail({ list: 'articles', email: 'a@x.co', leaveUrl }).html, 'Articles'],
  ] as const
  for (const [label, html, own] of cases) {
    it(`${label}: map present, own list absent, address carried, undo last`, () => {
      expect(html).toContain('The letters')
      expect(html).not.toContain(`<strong>${own}</strong>`)
      expect(html).toContain('join?email=a%40x.co')
      expect(html.indexOf('The letters')).toBeLessThan(html.indexOf('One click to undo.'))
    })
  }
  it('Welcome back keeps the approved draft', () => {
    const w = listWelcomeBackEmail({ list: 'articles', email: 'a@x.co', leaveUrl })
    expect(w.subject).toBe('Welcome back')
    expect(w.previewText).toBe('The door swings both ways.')
    expect(w.html).toContain('Hey there,')
    expect(w.html).toContain('The door swings both ways, and you just proved it.')
    expect(w.html).toContain('With Joyful Sovereignty,')
  })
})
