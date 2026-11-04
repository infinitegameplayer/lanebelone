// First touch kept for a year. Ported from the sibling commerce site.
//
// The first UTMs and referrer a visitor arrives with are kept in localStorage
// under `first_touch` as JSON of the captured keys plus `ts` (ms since epoch).
// The record expires after 365 days. It is written once and never overwritten
// inside that window. A first_touch left in sessionStorage by the earlier
// session-only capture is the true first touch and is carried over in place of
// the current visit. Every storage call is wrapped: a throwing storage never
// throws out of this module.

export const FIRST_TOUCH_KEY = 'first_touch'
export const FIRST_TOUCH_TTL_MS = 365 * 24 * 60 * 60 * 1000

export type FirstTouch = Record<string, string>

type StorageName = 'localStorage' | 'sessionStorage'

function storage(name: StorageName): Storage | null {
  try {
    const s = (globalThis as Record<string, unknown>)[name] as Storage | undefined
    return s ?? null
  } catch {
    return null
  }
}

function getItem(name: StorageName, key: string): string | null {
  try {
    return storage(name)?.getItem(key) ?? null
  } catch {
    return null
  }
}

function setItem(name: StorageName, key: string, value: string): void {
  try {
    storage(name)?.setItem(key, value)
  } catch {
    // storage full, blocked or disabled: first touch is best-effort
  }
}

function removeItem(name: StorageName, key: string): void {
  try {
    storage(name)?.removeItem(key)
  } catch {
    // nothing to do
  }
}

function ownHostname(): string {
  try {
    return (globalThis as { location?: Location }).location?.hostname?.toLowerCase() ?? ''
  } catch {
    return ''
  }
}

function bareHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, '')
}

// A referrer is kept only when it parses and points somewhere other than this
// site or Stripe (a checkout return is not a source).
function keepReferrer(referrer: string): boolean {
  let host: string
  try {
    host = new URL(referrer).hostname.toLowerCase()
  } catch {
    return false
  }
  if (!host) return false
  const own = ownHostname()
  if (own && bareHost(host) === bareHost(own)) return false
  if (host === 'stripe.com' || host.endsWith('.stripe.com')) return false
  return true
}

function sanitize(input: unknown): FirstTouch {
  const out: FirstTouch = {}
  if (!input || typeof input !== 'object') return out
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (k === 'ts' || typeof v !== 'string' || !v) continue
    if (k === 'referrer' && !keepReferrer(v)) continue
    out[k] = v
  }
  return out
}

function readKept(now: number): FirstTouch | null {
  const raw = getItem('localStorage', FIRST_TOUCH_KEY)
  if (raw === null) return null
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    removeItem('localStorage', FIRST_TOUCH_KEY)
    return null
  }
  const ts = (parsed as { ts?: unknown } | null)?.ts
  if (
    !parsed ||
    typeof parsed !== 'object' ||
    typeof ts !== 'number' ||
    !Number.isFinite(ts) ||
    now - ts > FIRST_TOUCH_TTL_MS
  ) {
    removeItem('localStorage', FIRST_TOUCH_KEY)
    return null
  }
  const out: FirstTouch = {}
  for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
    if (k !== 'ts' && typeof v === 'string') out[k] = v
  }
  return out
}

function readSession(): FirstTouch | null {
  const raw = getItem('sessionStorage', FIRST_TOUCH_KEY)
  if (raw === null) return null
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    const out: FirstTouch = {}
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'string') out[k] = v
    }
    return out
  } catch {
    return null
  }
}

/** The kept first touch, else whatever sessionStorage holds, else {}. */
export function readFirstTouch(now: number = Date.now()): FirstTouch {
  try {
    return readKept(now) ?? readSession() ?? {}
  } catch {
    return {}
  }
}

/** Keep `ft` as first touch unless a live record already exists. */
export function rememberFirstTouch(ft: FirstTouch, now: number = Date.now()): void {
  try {
    if (readKept(now)) return
    const session = readSession()
    const record = sanitize(session && Object.keys(session).length ? session : ft)
    if (!Object.keys(record).length) return
    setItem('localStorage', FIRST_TOUCH_KEY, JSON.stringify({ ...record, ts: now }))
  } catch {
    // first-touch capture is best-effort
  }
}
