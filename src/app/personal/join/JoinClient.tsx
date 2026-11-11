'use client'

// The one-click join to Personal notes. Once a person is plainly on the page
// (useAutoAction, auto-action-gate.ts) it joins them with no button at all. If
// the checks go unmet, or the server cannot vouch for the visitor, the one-tap
// button appears instead, so a person always gets in and a mail scanner that
// presses nothing joins no one. Mirror of src/app/articles/join/JoinClient.tsx.

import { useState } from 'react'
import Link from 'next/link'
import { useAutoAction, type AutoOutcome } from '@/components/useAutoAction'
import { buttonStyle, lead } from '../../articles/join/shell'

type TapState = 'idle' | 'working' | 'done' | 'already' | 'check-email' | 'unknown' | 'refused' | 'error'

async function join(email: string, token: string, mode: 'auto' | 'tap', gate?: unknown): Promise<Response> {
  return fetch('/api/personal/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token: token || undefined, mode, gate }),
  })
}

function outcomeOf(status: unknown): TapState {
  if (status === 'already-subscribed') return 'already'
  if (status === 'rejoin-confirm-sent') return 'check-email'
  if (status === 'unknown') return 'unknown'
  if (status === 'subscribed' || status === 'unsubscribed-rejoin') return 'done'
  return 'error'
}

export default function JoinClient({ email, token }: { email: string; token: string }) {
  const [tap, setTap] = useState<TapState>('idle')

  const phase = useAutoAction(async (gate): Promise<AutoOutcome> => {
    const res = await join(email, token, 'auto', gate)
    if (!res.ok) return 'tap'
    const body = await res.json().catch(() => ({}))
    if (body?.needsTap) return 'tap'
    const o = outcomeOf(body?.status)
    return o === 'done' ? 'done' : o === 'already' ? 'already' : 'tap'
  }, true, 'join')

  const onTap = async () => {
    if (tap === 'working') return
    setTap('working')
    try {
      const res = await join(email, token, 'tap')
      // A tap the bot check refuses is still a person most of the time (a
      // corporate proxy can hide the signals). They get a way in, never a dead end.
      if (res.status === 403) return setTap('refused')
      const body = await res.json().catch(() => ({}))
      setTap(res.ok ? outcomeOf(body?.status) : 'error')
    } catch {
      setTap('error')
    }
  }

  const blog = <Link href="/blog" style={{ color: '#d4a040' }}>writing</Link>

  if (phase === 'done' || tap === 'done') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>
          You&apos;re in. The welcome note is landing now, with a one-click undo if this was not you. Meanwhile, the {blog} is here.
        </p>
      </>
    )
  }
  if (phase === 'already' || tap === 'already') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>You&apos;re already on the list. Meanwhile, the {blog} is here.</p>
      </>
    )
  }
  if (tap === 'check-email') {
    return <p style={lead}>Check your inbox. I sent a link to that address so you can choose what you&apos;d like to get. One click and you&apos;re in.</p>
  }
  if (tap === 'unknown') {
    return <p style={lead}>I could not find that address. Reply to the letter that brought you here and you will be added by hand.</p>
  }

  if (phase === 'tap') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>Life, inner thoughts and what I&apos;m learning, sent when there&apos;s something worth sending. One tap and this address is on the list.</p>
        <button type="button" onClick={onTap} disabled={tap === 'working'} style={{ ...buttonStyle, opacity: tap === 'working' ? 0.6 : 1 }}>
          {tap === 'working' ? 'Adding you…' : 'Yes, send me the notes'}
        </button>
        {tap === 'refused' && (
          <p style={{ ...lead, color: 'rgba(220,120,100,0.9)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
            Something on this connection stopped the join. Reply to the letter that brought you here and you will be added by hand.
          </p>
        )}
        {tap === 'error' && (
          <p style={{ ...lead, color: 'rgba(220,120,100,0.9)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
            Something went wrong. Try once more, or reply to the letter and you will be added by hand.
          </p>
        )}
      </>
    )
  }

  return (
    <>
      <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
      <p style={lead} aria-live="polite">Adding you to the list…</p>
      <noscript>
        <p style={lead}>This page needs JavaScript to add you. Reply to the letter that brought you here and you will be added by hand.</p>
      </noscript>
    </>
  )
}
