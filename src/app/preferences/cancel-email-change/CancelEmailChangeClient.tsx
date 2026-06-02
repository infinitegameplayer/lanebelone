'use client'

// The cancel button and outcome. The cancel never runs on page load, only when
// this button posts the single-use cancel secret. Mirror of the IGOS client with
// the lanebelone palette.

import { useState } from 'react'

type Outcome = 'idle' | 'working' | 'cancelled' | 'already-confirmed' | 'invalid' | 'error'

const text = '#f5f0e8'
const muted = 'rgba(245,240,232,0.7)'

function mapStatus(ok: boolean, status: string): Outcome {
  if (status === 'cancelled' || status === 'already-cancelled') return 'cancelled'
  if (status === 'already-confirmed') return 'already-confirmed'
  if (ok) return 'cancelled'
  return 'invalid'
}

export default function CancelEmailChangeClient({ token }: { token: string }) {
  const [outcome, setOutcome] = useState<Outcome>(token ? 'idle' : 'invalid')

  async function cancel() {
    if (!token) return
    setOutcome('working')
    try {
      const res = await fetch('/api/preferences/cancel-email-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: token }),
      })
      const data = (await res.json()) as { ok?: boolean; status?: string }
      setOutcome(mapStatus(!!data.ok, data.status ?? 'invalid'))
    } catch {
      setOutcome('error')
    }
  }

  if (outcome === 'cancelled') {
    return <Note>Done. The change is cancelled and your address stays exactly as it is.</Note>
  }
  if (outcome === 'already-confirmed') {
    return <Note>This change was already confirmed and is active now. If that was not you, reach out and we will sort it right away.</Note>
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
        Click to cancel the email change. Your current address stays in place and nothing moves.
      </p>
      <button type="button" onClick={cancel} disabled={outcome === 'working'} style={primaryButtonStyle}>
        {outcome === 'working' ? 'Cancelling...' : 'Cancel this change'}
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
