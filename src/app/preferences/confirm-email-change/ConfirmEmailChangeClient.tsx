'use client'

// The confirm button and outcome. The change never runs on page load, only when
// this button posts the single-use secret. The collision outcome offers the
// one-click "combine them for me" that files a merge ticket. Mirror of the IGOS
// client with the lanebelone palette.

import { useState } from 'react'

type Outcome =
  | 'idle'
  | 'working'
  | 'confirmed'
  | 'collision'
  | 'merging'
  | 'merged'
  | 'expired'
  | 'resolved'
  | 'invalid'
  | 'error'

const text = '#f5f0e8'
const muted = 'rgba(245,240,232,0.7)'

function mapStatus(status: string): Outcome {
  if (status === 'confirmed') return 'confirmed'
  if (status === 'collision') return 'collision'
  if (status === 'expired') return 'expired'
  if (status === 'resolved') return 'resolved'
  return 'invalid'
}

export default function ConfirmEmailChangeClient({ token }: { token: string }) {
  const [outcome, setOutcome] = useState<Outcome>(token ? 'idle' : 'invalid')

  async function confirm() {
    if (!token) return
    setOutcome('working')
    try {
      const res = await fetch('/api/preferences/confirm-email-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: token }),
      })
      const data = (await res.json()) as { status?: string }
      setOutcome(mapStatus(data.status ?? 'invalid'))
    } catch {
      setOutcome('error')
    }
  }

  async function merge() {
    setOutcome('merging')
    try {
      const res = await fetch('/api/preferences/request-merge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: token }),
      })
      const data = (await res.json()) as { ok?: boolean }
      setOutcome(data.ok ? 'merged' : 'error')
    } catch {
      setOutcome('error')
    }
  }

  if (outcome === 'confirmed') {
    return <Note>Done. Your email is updated. Everything you are subscribed to will come to this address from now on.</Note>
  }
  if (outcome === 'merged') {
    return <Note>Got it. I will combine your two addresses by hand and follow up. Nothing else is needed from you.</Note>
  }
  if (outcome === 'collision') {
    return (
      <div style={{ fontFamily: 'Georgia, serif', color: muted }}>
        <Note>That address is already on file, so the change did not go through. Want me to combine the two for you?</Note>
        <button type="button" onClick={merge} style={primaryButtonStyle}>Combine them for me</button>
      </div>
    )
  }
  if (outcome === 'merging') {
    return <Note>One moment.</Note>
  }
  if (outcome === 'expired') {
    return <Note>This link has expired. Start the change again from your preferences page and a fresh link will arrive.</Note>
  }
  if (outcome === 'resolved') {
    return <Note>This change was already handled. Nothing more to do here.</Note>
  }
  if (outcome === 'invalid') {
    return <Note>This link is invalid or has already been used.</Note>
  }
  if (outcome === 'error') {
    return <Note>Something went wrong. Please try the link again in a moment.</Note>
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: muted }}>
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
        Click to confirm the email change you requested. Nothing moves until you do.
      </p>
      <button type="button" onClick={confirm} disabled={outcome === 'working'} style={primaryButtonStyle}>
        {outcome === 'working' ? 'Confirming...' : 'Confirm my new email'}
      </button>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.7, color: text, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
      {children}
    </p>
  )
}

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundImage: 'linear-gradient(135deg, #c8973a 0%, #f5d88a 45%, #d4a040 65%, #c8973a 100%)',
  color: '#0f1a12',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '0.85rem',
  fontWeight: 500,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  padding: '0.7rem 1.5rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
}
