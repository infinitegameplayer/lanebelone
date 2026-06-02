'use client'

import { useEffect, useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  color: '#f5f0e8',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '0.95rem',
  padding: '0.7rem 1rem',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

const buttonStyle: React.CSSProperties = {
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
  transition: 'background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease',
  marginTop: '0.5rem',
  width: 'auto',
  WebkitAppearance: 'none',
  appearance: 'none',
}

const placeholderStyleId = 'kingdom-articles-form-placeholder-style'

export default function ArticlesSubscribeForm() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [openedAt] = useState(() => Date.now())
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(placeholderStyleId)) return
    const style = document.createElement('style')
    style.id = placeholderStyleId
    style.textContent = `
      .kingdom-articles-input::placeholder, .kingdom-articles-input::-webkit-input-placeholder {
        color: rgba(245,240,232,0.45);
      }
      .kingdom-articles-input:focus { border-color: rgba(201,168,76,0.5) !important; }
      .kingdom-articles-button:hover {
        background-position: left center !important;
        box-shadow: 0 4px 18px rgba(245,216,138,0.18);
        transform: translateY(-1px);
      }
      .kingdom-articles-honeypot { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }
    `
    document.head.appendChild(style)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
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
      const res = await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'lanebelone-articles',
          email: email.trim(),
          honeypot: website,
          openedAt,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || `Submission failed (${res.status})`)
      }
      setStatus('submitted')
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      setErrorMessage(m)
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div
        id="subscribe"
        style={{ color: '#f5d88a', fontSize: '0.95rem', lineHeight: 1.6, padding: '1rem 0' }}
      >
        You&apos;re in. A welcome from Lane is landing in your inbox now.
      </div>
    )
  }

  return (
    <div id="subscribe">
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: '#f5f0e8',
          marginBottom: '0.5rem',
        }}
      >
        Get new writing by email
      </h2>
      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.9rem',
          color: 'rgba(245,240,232,0.55)',
          marginBottom: '1.25rem',
          lineHeight: 1.5,
        }}
      >
        The whole essay, straight to your inbox. Plus a breadcrumb at the end.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <input
          className="kingdom-articles-input"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...inputStyle, marginBottom: '0.5rem' }}
        />
        <input
          className="kingdom-articles-honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          name="website"
        />
        {status === 'error' && errorMessage && (
          <div style={{ color: 'rgba(220,80,80,0.85)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="kingdom-articles-button"
          disabled={status === 'submitting'}
          style={{ ...buttonStyle, opacity: status === 'submitting' ? 0.6 : 1 }}
        >
          {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}
