'use client'

import { useEffect, useRef, useState } from 'react'
import { nextBarState, isDismissed, dismiss, isSubscribed, markSubscribed } from '@/lib/bottom-bar'
import { submitSignup, thanksFor } from '@/lib/form-signup'
import { umamiTrack } from '@/lib/umami'

// The mobile bottom bar: a thin floating sign-up that fades in once the reader is
// well into the piece, leaves on any scroll up, steps aside when the page's own
// form shows and stays away after the x (30 days) or a sign-up. Phones only.
// Plan: Kingdom vault, PendingPlan - Mobile Bottom Bar. Rules live in lib/bottom-bar.

const BAR_HEIGHT = 92

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
        wide: window.matchMedia('(min-width: 48rem)').matches, // Tailwind's md, where the class hides it too
      })
      lastY = y
      if (next.shown !== shownRef.current) {
        shownRef.current = next.shown
        setShown(next.shown)
        if (next.shown && !trackedRef.current) {
          trackedRef.current = true
          umamiTrack('bottom_bar_shown', { kind, path: window.location.pathname })
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
    root.style.scrollPaddingBottom = shown ? `${BAR_HEIGHT + 24}px` : ''
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
    umamiTrack('bottom_bar_dismissed', { kind, path: window.location.pathname })
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
      umamiTrack('bottom_bar_signup', { kind, path: window.location.pathname })
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
      // display lives in the class, not the style: an inline display outranks md:hidden
      className="flex md:hidden kingdom-bottom-bar"
      role="region"
      aria-label={line}
      style={{
        position: 'fixed',
        left: 10,
        right: 10,
        bottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
        zIndex: 40,
        minHeight: BAR_HEIGHT,
        padding: '12px 16px 13px',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
        borderRadius: 14,
        background: 'rgba(8, 18, 8, 0.94)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(201, 168, 76, 0.24)',
        boxShadow: '0 10px 34px rgba(0, 0, 0, 0.55)',
        color: '#e8e4d8',
        fontFamily: 'var(--font-body)',
        opacity: shown ? 1 : 0,
        visibility: shown ? 'visible' : 'hidden',
        transition: shown ? 'opacity 260ms ease, visibility 0s linear 0s' : 'opacity 260ms ease, visibility 0s linear 260ms',
      }}
    >
      <style>{`
        .kingdom-bottom-bar input::placeholder { color: rgba(245, 240, 232, 0.45); }
        .kingdom-bottom-bar input:focus { border-color: rgba(201, 168, 76, 0.5) !important; }
      `}</style>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          width: 28,
          height: 28,
          display: 'grid',
          placeItems: 'center',
          background: 'none',
          border: 0,
          padding: 0,
          color: '#8a9a8c',
          fontSize: 17,
          lineHeight: 1,
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      {status === 'submitted' ? (
        <div style={{ fontSize: 14, lineHeight: 1.45, color: '#f5d88a', paddingRight: 24 }}>{thanksFor(listStatus)}</div>
      ) : (
        <>
          <div
            style={{
              fontSize: 13.5,
              fontWeight: 500,
              lineHeight: 1.4,
              paddingRight: 26,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: status === 'error' ? 'rgba(220, 120, 100, 0.95)' : undefined,
            }}
          >
            {status === 'error' && errorMessage ? errorMessage : line}
          </div>
          <form onSubmit={onSubmit} noValidate style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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
              style={{
                flex: 1,
                minWidth: 0,
                height: 38,
                padding: '0 12px',
                borderRadius: 8,
                background: '#141c15',
                border: '1px solid rgba(232, 228, 216, 0.14)',
                color: '#e8e4d8',
                fontFamily: 'var(--font-body)',
                fontSize: 16, // 16px or more, or iOS Safari zooms the page on focus
                outline: 'none',
              }}
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
              style={{
                flex: 'none',
                height: 38,
                padding: '0 14px',
                border: 0,
                borderRadius: 8,
                backgroundImage: 'linear-gradient(135deg, #c8973a 0%, #f5d88a 45%, #d4a040 65%, #c8973a 100%)',
                color: '#0f1a12',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                opacity: status === 'submitting' ? 0.6 : 1,
              }}
            >
              {status === 'submitting' ? '...' : button}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
