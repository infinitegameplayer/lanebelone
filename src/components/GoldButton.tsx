import Link from 'next/link'
import { ReactNode } from 'react'

interface GoldButtonProps {
  href: string
  children: ReactNode
  external?: boolean
  variant?: 'gold' | 'outline' | 'ghost'
  className?: string
}

export default function GoldButton({
  href,
  children,
  external = false,
  variant = 'gold',
  className = '',
}: GoldButtonProps) {
  const cls = `btn-${variant} ${className}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
