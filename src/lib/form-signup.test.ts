import { describe, it, expect } from 'vitest'
import { thanksFor, ARTICLES_THANKS } from './form-signup'

// The thank-you follows what the list did, so no line promises an email that is not coming.
describe('thanksFor', () => {
  it('tells a reader already on the list that no welcome is coming', () => {
    expect(thanksFor('already-subscribed')).toBe(ARTICLES_THANKS.already)
  })
  it('points a returning reader to the welcome-back note', () => {
    expect(thanksFor('rejoin-confirm-sent')).toBe(ARTICLES_THANKS.rejoin)
  })
  it('welcomes everyone else, including when the route names no status', () => {
    expect(thanksFor('subscribed')).toBe(ARTICLES_THANKS.welcomed)
    expect(thanksFor(undefined)).toBe(ARTICLES_THANKS.welcomed)
  })
  it('never promises a welcome on the already and rejoin paths', () => {
    expect(ARTICLES_THANKS.already).not.toMatch(/welcome/i)
    expect(ARTICLES_THANKS.rejoin).not.toMatch(/welcome/i)
  })
})
