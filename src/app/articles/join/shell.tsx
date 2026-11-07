// The frame the articles join and undo pages share, in the register of the
// site's unsubscribe page.

import type { CSSProperties, ReactNode } from 'react'

export const lead: CSSProperties = { fontSize: '1rem', color: 'rgba(245,240,232,0.7)', lineHeight: 1.7 }

export const buttonStyle: CSSProperties = {
  display: 'inline-block',
  backgroundImage: 'linear-gradient(135deg, #c8973a 0%, #f5d88a 45%, #d4a040 65%, #c8973a 100%)',
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
  marginTop: '0.5rem',
}

export function Shell({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        fontFamily: 'Georgia, serif',
        color: '#f5f0e8',
      }}
    >
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#f5f0e8', fontFamily: 'var(--font-display)' }}>
          {heading}
        </h1>
        {children}
      </div>
    </main>
  )
}
