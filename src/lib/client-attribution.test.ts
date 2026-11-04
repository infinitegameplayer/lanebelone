import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  readFirstTouch,
  rememberFirstTouch,
  FIRST_TOUCH_KEY,
  FIRST_TOUCH_TTL_MS,
} from './client-attribution'

// Fake Web Storage, enough for the module: getItem, setItem, removeItem.
class FakeStorage {
  map = new Map<string, string>()
  getItem(k: string) {
    return this.map.has(k) ? (this.map.get(k) as string) : null
  }
  setItem(k: string, v: string) {
    this.map.set(k, String(v))
  }
  removeItem(k: string) {
    this.map.delete(k)
  }
  clear() {
    this.map.clear()
  }
}

class ThrowingStorage {
  getItem(): string | null {
    throw new Error('SecurityError')
  }
  setItem(): void {
    throw new Error('QuotaExceededError')
  }
  removeItem(): void {
    throw new Error('SecurityError')
  }
}

const g = globalThis as Record<string, unknown>
let local: FakeStorage
let session: FakeStorage
const NOW = Date.UTC(2026, 10, 4)

beforeEach(() => {
  local = new FakeStorage()
  session = new FakeStorage()
  g.localStorage = local
  g.sessionStorage = session
  g.location = { hostname: 'www.lanebelone.com' }
})

afterEach(() => {
  delete g.localStorage
  delete g.sessionStorage
  delete g.location
})

function kept() {
  const raw = local.getItem(FIRST_TOUCH_KEY)
  return raw ? JSON.parse(raw) : null
}

describe('first touch kept for a year', () => {
  it('keeps the first visit and stamps ts', () => {
    rememberFirstTouch({ utm_source: 'substack', referrer: 'https://lanebelone.substack.com/p/x' }, NOW)
    expect(kept()).toEqual({ utm_source: 'substack', referrer: 'https://lanebelone.substack.com/p/x', ts: NOW })
    expect(readFirstTouch(NOW)).toEqual({ utm_source: 'substack', referrer: 'https://lanebelone.substack.com/p/x' })
  })

  it('a kept record wins over a later visit\'s UTMs', () => {
    rememberFirstTouch({ utm_source: 'substack', utm_medium: 'email' }, NOW)
    const later = NOW + 30 * 24 * 60 * 60 * 1000
    rememberFirstTouch({ utm_source: 'linkedin', utm_campaign: 'peru' }, later)
    expect(readFirstTouch(later)).toEqual({ utm_source: 'substack', utm_medium: 'email' })
    expect(kept().ts).toBe(NOW)
  })

  it('a record older than 365 days is dropped and the current visit becomes first touch', () => {
    local.setItem(FIRST_TOUCH_KEY, JSON.stringify({ utm_source: 'old', ts: NOW - FIRST_TOUCH_TTL_MS - 1 }))
    expect(readFirstTouch(NOW)).toEqual({})
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
    rememberFirstTouch({ utm_source: 'new' }, NOW)
    expect(kept()).toEqual({ utm_source: 'new', ts: NOW })
  })

  it('an entry with no numeric ts or that will not parse is removed', () => {
    local.setItem(FIRST_TOUCH_KEY, JSON.stringify({ utm_source: 'x' }))
    expect(readFirstTouch(NOW)).toEqual({})
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
    local.setItem(FIRST_TOUCH_KEY, '{not json')
    expect(readFirstTouch(NOW)).toEqual({})
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
  })

  it('a session-only record from before the change carries over in place of the current visit', () => {
    session.setItem(FIRST_TOUCH_KEY, JSON.stringify({ utm_source: 'instagram', igshid: 'abc' }))
    expect(readFirstTouch(NOW)).toEqual({ utm_source: 'instagram', igshid: 'abc' })
    rememberFirstTouch({ utm_source: 'google' }, NOW)
    expect(kept()).toEqual({ utm_source: 'instagram', igshid: 'abc', ts: NOW })
  })

  it('an own-host referrer is not kept', () => {
    rememberFirstTouch({ referrer: 'https://www.lanebelone.com/about' }, NOW)
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
    rememberFirstTouch({ utm_source: 'x', referrer: 'https://lanebelone.com/blog' }, NOW)
    expect(kept()).toEqual({ utm_source: 'x', ts: NOW })
  })

  it('a stripe.com or unparseable referrer is not kept', () => {
    rememberFirstTouch({ utm_source: 'a', referrer: 'https://checkout.stripe.com/c/pay' }, NOW)
    expect(kept()).toEqual({ utm_source: 'a', ts: NOW })
    local.clear()
    rememberFirstTouch({ utm_source: 'b', referrer: 'not a url' }, NOW)
    expect(kept()).toEqual({ utm_source: 'b', ts: NOW })
  })

  it('a storage that throws does not break the call', () => {
    g.localStorage = new ThrowingStorage()
    g.sessionStorage = new ThrowingStorage()
    expect(() => rememberFirstTouch({ utm_source: 'x' }, NOW)).not.toThrow()
    expect(readFirstTouch(NOW)).toEqual({})
  })

  it('missing storage reads as nothing kept', () => {
    delete g.localStorage
    delete g.sessionStorage
    expect(() => rememberFirstTouch({ utm_source: 'x' }, NOW)).not.toThrow()
    expect(readFirstTouch(NOW)).toEqual({})
  })
})
