'use client'

import { useEffect, useRef, useState } from 'react'
import { nextBarState, isDismissed, dismiss, isSubscribed, markSubscribed } from '@/lib/bottom-bar'
import { submitSignup, thanksFor } from '@/lib/form-signup'
import { umamiTrack } from '@/lib/umami'

// The mobile bottom bar: a thin floating sign-up that fades in once the reader is
// well into the piece, leaves on any scroll up, steps aside when the page's own
// form shows and stays away after the x (30 days) or a sign-up. From 768px it is
// the dock: one row centered on the reading column, under the same rules.
// Plan: Kingdom vault, PendingPlan - Mobile Bottom Bar. Rules live in lib/bottom-bar.

const BAR_HEIGHT = 92
const DOCK_HEIGHT = 64
// Tailwind's md. The stylesheet below switches to the dock at the same width.
const DOCK = '(min-width: 48rem)'
const layoutNow = (): 'phone' | 'dock' => (window.matchMedia(DOCK).matches ? 'dock' : 'phone')

// Geometry lives here, never in the style prop: an inline style outranks a media
// query, the fault that once put the phone bar on desktop. Only opacity,
// visibility and the transition stay inline.
const SHEET = `
  .kingdom-bottom-bar { position: fixed; left: 10px; right: 10px; bottom: calc(10px + env(safe-area-inset-bottom, 0px)); z-index: 40; min-height: ${BAR_HEIGHT}px; padding: 12px 16px 13px; display: flex; flex-direction: column; justify-content: center; gap: 6px; border-radius: 14px; background: rgba(8, 18, 8, 0.94); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border: 1px solid rgba(201, 168, 76, 0.24); box-shadow: 0 10px 34px rgba(0, 0, 0, 0.55); color: #e8e4d8; font-family: var(--font-body); }
  .kingdom-bottom-bar .kbar-x { position: absolute; top: 4px; right: 4px; width: 28px; height: 28px; display: grid; place-items: center; background: none; border: 0; padding: 0; color: #8a9a8c; font-size: 17px; line-height: 1; cursor: pointer; }
  .kingdom-bottom-bar .kbar-line { font-size: 13.5px; font-weight: 500; line-height: 1.4; padding-right: 26px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .kingdom-bottom-bar .kbar-thanks { font-size: 14px; line-height: 1.45; color: #f5d88a; padding-right: 24px; }
  .kingdom-bottom-bar .kbar-form { display: flex; gap: 8px; align-items: center; }
  .kingdom-bottom-bar .kbar-field { flex: 1; min-width: 0; height: 38px; padding: 0 12px; border-radius: 8px; background: #141c15; border: 1px solid rgba(232, 228, 216, 0.14); color: #e8e4d8; font-family: var(--font-body); font-size: 16px; outline: none; }
  .kingdom-bottom-bar .kbar-btn { flex: none; height: 38px; padding: 0 14px; border: 0; border-radius: 8px; background-image: linear-gradient(135deg, #c8973a 0%, #f5d88a 45%, #d4a040 65%, #c8973a 100%); color: #0f1a12; font-family: 'Inter', system-ui, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; white-space: nowrap; cursor: pointer; }
  .kingdom-bottom-bar input::placeholder { color: rgba(245, 240, 232, 0.45); }
  .kingdom-bottom-bar input:focus { border-color: rgba(201, 168, 76, 0.5); }
  @media ${DOCK} {
    .kingdom-bottom-bar { left: 0; right: 0; margin-inline: auto; width: min(720px, 100vw - 40px); bottom: calc(20px + env(safe-area-inset-bottom, 0px)); min-height: ${DOCK_HEIGHT}px; padding: 12px 44px 12px 20px; flex-direction: row; align-items: center; gap: 12px; }
    .kingdom-bottom-bar .kbar-x { top: 50%; margin-top: -14px; right: 8px; }
    .kingdom-bottom-bar .kbar-line { flex: 1; min-width: 0; font-size: 14.5px; padding-right: 0; }
    .kingdom-bottom-bar .kbar-thanks { flex: 1; padding-right: 0; }
    .kingdom-bottom-bar .kbar-form { flex: none; }
    .kingdom-bottom-bar .kbar-field { flex: none; width: 250px; }
  }
`

interface MobileBottomBarProps {
  kind: string // dismissal key and analytics label, e.g. 'articles'
  formName: string // the list the email joins, posted to /api/form-submit
  triggerId: string // the element the reader must be well into before the bar shows
  triggerRatio: number // how far through that element, 0 to 1
  avoidId?: string // the page's own form; the bar steps aside while it shows
  line: string
  button: string
  placeholder: string
}

export default function MobileBottomBar({ kind, formName, triggerId, triggerRatio, avoidId, line, button, placeholder }: MobileBottomBarProps) {
  const [active, setActive] = useState(false) // false until we know this reader has neither closed it nor signed up
  const [shown, setShown] = useState(false)
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [openedAt] = useState(() => Date.now())
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [listStatus, setListStatus] = useState<string | undefined>(undefined)
  const shownRef = useRef(false)
  const focusedRef = useRef(false)
  const trackedRef = useRef(false)

  useEffect(() => {
    const s = window.localStorage
    if (isDismissed(s, kind, Date.now()) || isSubscribed(s, formName)) return
    setActive(true)
  }, [kind, formName])

  useEffect(() => {
    if (!active) return
    let lastY = window.scrollY
    let frame = 0
    const read = () => {
      frame = 0
      const trigger = document.getElementById(triggerId)
      if (!trigger) return
      const y = window.scrollY
      const t = trigger.getBoundingClientRect()
      const vh = window.innerHeight
      // gives way once the page's own form reaches the screen (and stays away below it), and to the footer
      const avoid = avoidId ? document.getElementById(avoidId) : null
      const footer = document.querySelector('footer')
      const avoiding =
        (avoid !== null && avoid.getBoundingClientRect().top < vh) ||
        (footer !== null && footer.getBoundingClientRect().top < vh)
      const next = nextBarState(shownRef.current, {
        viewportBottom: y + vh,
        triggerY: t.top + y + t.height * triggerRatio,
        avoiding,
        delta: y - lastY,
        focused: focusedRef.current,
        dismissed: false,
        subscribed: false,
        wide: layoutNow() === 'dock',
      })
      lastY = y
      if (next.shown !== shownRef.current) {
        shownRef.current = next.shown
        setShown(next.shown)
        if (next.shown && !trackedRef.current) {
          trackedRef.current = true
          umamiTrack('bottom_bar_shown', { kind, path: window.location.pathname, layout: layoutNow() })
        }
      }
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [active, kind, triggerId, triggerRatio, avoidId])

  // Keep a focused field clear of the bar (WCAG 2.4.11) while it shows.
  useEffect(() => {
    const root = document.documentElement
    root.style.scrollPaddingBottom = shown ? `${layoutNow() === 'dock' ? DOCK_HEIGHT + 34 : BAR_HEIGHT + 24}px` : ''
    return () => {
      root.style.scrollPaddingBottom = ''
    }
  }, [shown])

  const leave = () => {
    shownRef.current = false
    setShown(false)
    window.setTimeout(() => setActive(false), 300)
  }

  const onClose = () => {
    dismiss(window.localStorage, kind, Date.now())
    umamiTrack('bottom_bar_dismissed', { kind, path: window.location.pathname, layout: layoutNow() })
    leave()
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (!email.trim()) {
      setErrorMessage('Please enter your email.')
      setStatus('error')
      return
    }
    setStatus('submitting')
    setErrorMessage('')
    try {
      setListStatus(await submitSignup(formName, email, website, openedAt))
      markSubscribed(window.localStorage, formName)
      umamiTrack('bottom_bar_signup', { kind, path: window.location.pathname, layout: layoutNow() })
      setStatus('submitted')
      focusedRef.current = false
      window.setTimeout(leave, 2600)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (!active) return null

  return (
    <div
      className="kingdom-bottom-bar"
      role="region"
      aria-label={line}
      style={{
        opacity: shown ? 1 : 0,
        visibility: shown ? 'visible' : 'hidden',
        transition: shown ? 'opacity 260ms ease, visibility 0s linear 0s' : 'opacity 260ms ease, visibility 0s linear 260ms',
      }}
    >
      <style>{SHEET}</style>
      <button type="button" aria-label="Close" onClick={onClose} className="kbar-x">
        &times;
      </button>
      {status === 'submitted' ? (
        <div className="kbar-thanks">{thanksFor(listStatus)}</div>
      ) : (
        <>
          <div className="kbar-line" style={status === 'error' ? { color: 'rgba(220, 120, 100, 0.95)' } : undefined}>
            {status === 'error' && errorMessage ? errorMessage : line}
          </div>
          <form onSubmit={onSubmit} noValidate className="kbar-form">
            <input
              type="email"
              required
              autoComplete="email"
              aria-label="Email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => { focusedRef.current = true }}
              onBlur={() => { focusedRef.current = false }}
              className="kbar-field" // 16px or more, or iOS Safari zooms the page on focus
            />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="kbar-btn"
              style={status === 'submitting' ? { opacity: 0.6 } : undefined}
            >
              {status === 'submitting' ? '...' : button}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
