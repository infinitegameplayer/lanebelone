'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'

interface SectionRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  staggerChildren?: boolean
}

export default function SectionReveal({ children, delay = 0, className = '', staggerChildren = false }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-60px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (staggerChildren) {
    return (
      <div
        ref={ref}
        className={`stagger-reveal${visible ? ' is-visible' : ''} ${className}`}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  )
}
