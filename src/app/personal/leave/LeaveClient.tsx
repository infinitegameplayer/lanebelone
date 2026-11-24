'use client'

// The one-click undo for Personal notes. The page shows one button and takes
// the address off only when a person presses it (Email Codex Section 12,
// press-only.ts), so a mail scanner reading the welcome email never undoes a
// real join. Mirror of src/app/articles/leave/LeaveClient.tsx.

import { useState } from 'react'
import Link from 'next/link'
import { buttonStyle, lead } from '../../articles/join/shell'

async function leave(email: string, token: string): Promise<Response> {
  return fetch('/api/personal/leave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, mode: 'tap' }),
  })
}

export default function LeaveClient({ email, token }: { email: string; token: string }) {
  const [tapState, setTapState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const onTap = async () => {
    if (tapState === 'working') return
    setTapState('working')
    try {
      const res = await leave(email, token)
      setTapState(res.ok ? 'done' : 'error')
    } catch {
      setTapState('error')
    }
  }

  if (tapState === 'done') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>Done. This address is off the personal notes. Every other list stays as it was.</p>
        <p style={lead}>
          Changed your mind?{' '}
          <Link href={`/personal/join?email=${encodeURIComponent(email)}`} style={{ color: '#d4a040' }}>
            Join again
          </Link>
          .
        </p>
      </>
    )
  }

  return (
    <>
      <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
      <p style={lead}>One tap takes this address off the personal notes. Every other list stays as it was.</p>
      <button type="button" onClick={onTap} disabled={tapState === 'working'} style={{ ...buttonStyle, opacity: tapState === 'working' ? 0.6 : 1 }}>
        {tapState === 'working' ? 'Removing…' : 'Take me off the list'}
      </button>
      <noscript>
        <p style={lead}>This page needs JavaScript to take you off. Reply to the welcome email and it will be handled by hand.</p>
      </noscript>
      {tapState === 'error' && (
        <p style={{ ...lead, color: 'rgba(220,120,100,0.9)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
          Something stopped that. Reply to the welcome email and it will be handled by hand.
        </p>
      )}
    </>
  )
}
