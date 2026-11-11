'use client'

// The one-click undo for the articles list. Takes the address off once a person
// is plainly on the page (useAutoAction), or shows one button when it cannot
// tell, so a mail scanner reading the welcome email never undoes a real join.

import { useState } from 'react'
import Link from 'next/link'
import { useAutoAction, type AutoOutcome } from '@/components/useAutoAction'
import { buttonStyle, lead } from '../join/shell'

async function leave(email: string, token: string, mode: 'auto' | 'tap', gate?: unknown): Promise<Response> {
  return fetch('/api/articles/leave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, mode, gate }),
  })
}

export default function LeaveClient({ email, token }: { email: string; token: string }) {
  const [tapState, setTapState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const phase = useAutoAction(async (gate): Promise<AutoOutcome> => {
    const res = await leave(email, token, 'auto', gate)
    if (!res.ok) return 'tap'
    const body = await res.json().catch(() => ({}))
    return body?.needsTap ? 'tap' : 'done'
  })

  const onTap = async () => {
    if (tapState === 'working') return
    setTapState('working')
    try {
      const res = await leave(email, token, 'tap')
      setTapState(res.ok ? 'done' : 'error')
    } catch {
      setTapState('error')
    }
  }

  if (phase === 'done' || tapState === 'done') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>Done. This address is off the articles list. Every other list stays as it was.</p>
        <p style={lead}>
          Changed your mind?{' '}
          <Link href={`/articles/join?email=${encodeURIComponent(email)}`} style={{ color: '#d4a040' }}>
            Join again
          </Link>
          .
        </p>
      </>
    )
  }

  if (phase === 'tap') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>One tap takes this address off the articles list. Every other list stays as it was.</p>
        <button type="button" onClick={onTap} disabled={tapState === 'working'} style={{ ...buttonStyle, opacity: tapState === 'working' ? 0.6 : 1 }}>
          {tapState === 'working' ? 'Removing…' : 'Take me off the list'}
        </button>
        {tapState === 'error' && (
          <p style={{ ...lead, color: 'rgba(220,120,100,0.9)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
            Something stopped that. Reply to the welcome email and it will be handled by hand.
          </p>
        )}
      </>
    )
  }

  return (
    <>
      <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
      <p style={lead} aria-live="polite">Taking this address off the list…</p>
      <noscript>
        <p style={lead}>This page needs JavaScript to take you off. Reply to the welcome email and it will be handled by hand.</p>
      </noscript>
    </>
  )
}
