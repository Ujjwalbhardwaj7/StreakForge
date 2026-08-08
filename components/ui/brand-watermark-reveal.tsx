'use client'

import { useEffect, useRef, useState } from 'react'

type BrandWatermarkRevealProps = {
  appName?: string
  className?: string
}

export function BrandWatermarkReveal({
  appName = 'STREAKFORGE',
  className = '',
}: BrandWatermarkRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // 1. Intersection Observer Trigger when scrolling to the bottom
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
          } else {
            // Reset when user scrolls back up so it can re-trigger on bottom scroll
            const scrollBottom = window.innerHeight + window.scrollY
            const docHeight = document.documentElement.scrollHeight
            if (scrollBottom < docHeight - 250) {
              setIsRevealed(false)
            }
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px 40px 0px',
      }
    )

    observer.observe(el)

    // 2. Scroll event backup trigger near bottom of page
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      const scrollBottom = window.innerHeight + window.scrollY
      const docHeight = document.documentElement.scrollHeight
      if (scrollBottom >= docHeight - 120) {
        setIsRevealed(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center pt-8 pb-6 overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative flex w-full items-center justify-center px-4 overflow-hidden pt-4 pb-2">
        <span
          className={`font-display font-black uppercase tracking-wider text-center transition-all duration-[800ms] text-2xl sm:text-4xl md:text-5xl ${
            isRevealed
              ? 'translate-y-0 opacity-85 scale-100'
              : 'translate-y-16 opacity-0 scale-95'
          }`}
          style={{
            lineHeight: 1.1,
            transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
            background: 'linear-gradient(180deg, var(--foreground) 0%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 14px var(--border))',
          }}
        >
          {appName}
        </span>
      </div>
      <span
        className={`mt-1 text-[10px] font-bold tracking-[0.2em] text-muted-foreground/70 uppercase transition-all duration-[900ms] ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      >
        Forge Your 60-Day Habit
      </span>
    </div>
  )
}
