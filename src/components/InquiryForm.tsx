'use client'

import { useEffect, useState } from 'react'

type InquiryFormProps = {
  formName: 'lanebelone-contact' | 'lanebelone-speaking'
  placeholders?: {
    firstName?: string
    lastName?: string
    email?: string
    message?: string
  }
  submitLabel?: string
  successMessage?: string
}

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

const placeholderStyleId = 'kingdom-form-placeholder-style-lb'

export default function InquiryForm({
  formName,
  placeholders,
  submitLabel = 'Send',
  successMessage = 'Message received. I read every one and will reply if there is resonance.',
}: InquiryFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
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
      .kingdom-form-input::placeholder, .kingdom-form-input::-webkit-input-placeholder {
        color: rgba(245,240,232,0.45);
      }
      .kingdom-form-input:focus { border-color: rgba(201,168,76,0.5) !important; }
      .kingdom-form-button:hover {
        background-position: left center !important;
        box-shadow: 0 4px 18px rgba(245,216,138,0.18);
        transform: translateY(-1px);
      }
      .kingdom-form-honeypot { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }
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
    if (!message.trim()) {
      setErrorMessage('Please share a few lines.')
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
          formName,
          firstName: firstName.trim() || undefined,
          lastName: lastName.trim() || undefined,
          email: email.trim(),
          message: message.trim(),
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
      <div style={{ color: '#f5d88a', fontSize: '0.95rem', lineHeight: 1.6, padding: '1rem 0' }}>
        {successMessage}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          className="kingdom-form-input"
          type="text"
          autoComplete="given-name"
          placeholder={placeholders?.firstName ?? 'First name'}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ ...inputStyle, flex: '1 1 0' }}
        />
        <input
          className="kingdom-form-input"
          type="text"
          autoComplete="family-name"
          placeholder={placeholders?.lastName ?? 'Last name'}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ ...inputStyle, flex: '1 1 0' }}
        />
      </div>
      <input
        className="kingdom-form-input"
        type="email"
        required
        autoComplete="email"
        placeholder={placeholders?.email ?? 'Email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ ...inputStyle, marginBottom: '1rem' }}
      />
      <textarea
        className="kingdom-form-input"
        required
        rows={4}
        placeholder={placeholders?.message ?? 'A few lines about what brings you here'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ ...inputStyle, marginBottom: '1rem', minHeight: '90px', resize: 'vertical', fontFamily: 'inherit' }}
      />
      <input
        className="kingdom-form-honeypot"
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
        className="kingdom-form-button"
        disabled={status === 'submitting'}
        style={{ ...buttonStyle, opacity: status === 'submitting' ? 0.6 : 1 }}
      >
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
