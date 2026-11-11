import { describe, expect, it } from 'vitest'
import { BOTID_PROTECTED } from '@/lib/botid-routes'
import { newsletterWelcomeEmail } from '@/lib/email/templates'

// The Personal notes join and undo (PendingPlan - The Letters Map and Welcome
// Back, step 1). Their automatic act reads BotID's verdict, which needs the
// browser signal that only the protected list attaches; and a join from one
// click carries a one-click way back in its welcome (Email Codex Section 12).

describe('Personal notes one-click', () => {
  for (const path of ['/api/personal/join', '/api/personal/leave']) {
    it(`${path} is on BotID protected list`, () => {
      expect(BOTID_PROTECTED.some((r) => r.path === path)).toBe(true)
    })
  }

  it('the welcome carries the undo link it is given', () => {
    const leaveUrl = 'https://www.lanebelone.com/personal/leave?email=a%40x.com&token=t'
    const html = newsletterWelcomeEmail({ firstName: 'A', email: 'a@x.com', leaveUrl }).html
    expect(html).toContain(`href="${leaveUrl}"`)
    expect(html).toContain('One click to undo.')
  })
})
