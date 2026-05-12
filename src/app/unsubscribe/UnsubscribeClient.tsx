'use client'

import { useEffect, useState } from 'react'

type Status =
  | 'idle'
  | 'pending'
  | 'success'
  | 'resubscribing'
  | 'resubscribed'
  | 'invalid'
  | 'error'

export default function UnsubscribeClient({ email, token }: { email: string; token: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!email || !token) {
      setStatus('invalid')
      setMessage('This link is missing the information needed to unsubscribe. If you got here from an email, check that the full link copied through.')
      return
    }
    setStatus('pending')
    fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
          setStatus('success')
          setMessage(`You're unsubscribed. No more emails to ${email}.`)
        } else if (res.status === 403) {
          setStatus('invalid')
          setMessage("This link couldn't be verified. If you copied it from an email, try clicking it directly instead.")
        } else {
          setStatus('error')
          setMessage(typeof data?.error === 'string' ? data.error : 'Something went wrong. Please try again.')
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Network error. Please try again.')
      })
  }, [email, token])

  const handleResubscribe = async () => {
    if (status !== 'success') return
    setStatus('resubscribing')
    try {
      const res = await fetch('/api/newsletter/resubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      })
      if (res.ok) {
        setStatus('resubscribed')
        setMessage(`You're back in. No new welcome email, just picking up where we left off.`)
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus('error')
        setMessage(typeof data?.error === 'string' ? data.error : 'Resubscribe failed. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: 'rgba(245,240,232,0.85)' }}>
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
        {status === 'pending' && 'Unsubscribing...'}
        {status === 'resubscribing' && 'Bringing you back...'}
        {(status === 'success' ||
          status === 'resubscribed' ||
          status === 'invalid' ||
          status === 'error') && message}
      </p>

      {status === 'success' && (
        <>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(245,240,232,0.7)',
              marginTop: '1.75rem',
              marginBottom: 0,
              fontStyle: 'italic',
            }}
          >
            Travel well from here. Wish you enjoyment on your journey. If our paths cross again, I&apos;m sure it&apos;ll be great lol.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'rgba(245,240,232,0.55)',
                marginBottom: '1rem',
              }}
            >
              Didn&apos;t mean to part ways just yet? Resubscribing is as easy as a click.
            </p>
            <button
              type="button"
              onClick={handleResubscribe}
              style={{
                display: 'inline-block',
                backgroundImage:
                  'linear-gradient(135deg, #c8973a 0%, #f5d88a 45%, #d4a040 65%, #c8973a 100%)',
                backgroundSize: '220% 100%',
                backgroundPosition: 'right center',
                color: '#0f1a12',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Resubscribe
            </button>
          </div>
        </>
      )}
    </div>
  )
}
