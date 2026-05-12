'use client'

import { useEffect, useState } from 'react'

type Status = 'idle' | 'pending' | 'success' | 'invalid' | 'error'

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
          setMessage(`You are unsubscribed. No more emails to ${email}.`)
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

  return (
    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.85)' }}>
      {status === 'pending' && 'Unsubscribing...'}
      {(status === 'success' || status === 'invalid' || status === 'error') && message}
    </p>
  )
}
