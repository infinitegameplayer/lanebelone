'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    let ticking = false

    const measure = () => {
      const rect = article.getBoundingClientRect()
      const articleTop = window.scrollY + rect.top
      const articleHeight = article.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollable = articleHeight - viewportHeight

      if (scrollable <= 0) {
        setProgress(0)
        setVisible(false)
        return
      }

      const scrolled = window.scrollY - articleTop
      const ratio = Math.max(0, Math.min(1, scrolled / scrollable))
      setProgress(ratio * 100)
      setVisible(window.scrollY >= articleTop && window.scrollY <= articleTop + scrollable)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        measure()
        ticking = false
      })
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div
      className="reading-progress"
      data-visible={visible ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div className="reading-progress__fill" style={{ width: `${progress}%` }} />
    </div>
  )
}
