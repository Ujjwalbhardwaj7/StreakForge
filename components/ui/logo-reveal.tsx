'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { RotateCw } from 'lucide-react'

type LogoRevealProps = {
  size?: number | string
  className?: string
  showReplayButton?: boolean
  autoPlay?: boolean
}

export function LogoReveal({
  size = 180,
  className = '',
  showReplayButton = false,
  autoPlay = true,
}: LogoRevealProps) {
  const [key, setKey] = useState(0)

  const handleReplay = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      {/* 
        Rounded-Square Container with Rich Dark-Purple Gradient Background,
        Subtle Depth, Soft Shadow, and 20% Corner Radius
      */}
      <div
        key={key}
        className="animate-logo-container relative overflow-hidden rounded-[20%] border border-border/40 bg-gradient-to-br from-[#1d291a] via-[#121b10] to-[#000000] p-4 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_22px_45px_-5px_rgba(0,0,0,0.5)]"
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
        }}
      >
        {/* Subtle 3D Glass Surface Specular Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 rounded-[20%]" />

        {/* Layered SVG Animation */}
        <svg
          viewBox="0 0 180 180"
          className="h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Translucent Glossy White Liquid Fill Gradient */}
            <linearGradient id={`glassmorphicFill-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
              <stop offset="60%" stopColor="#F6F4EE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E4EBD9" stopOpacity="0.8" />
            </linearGradient>

            {/* Specular White Surface Highlight Gradient */}
            <linearGradient id={`specularHighlight-${key}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Soft Restrained White & Violet Bloom Glow Filter */}
            <filter id={`logoBloom-${key}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Scale 95% Group centered at 180x180 to preserve exact proportions */}
          <g style={{ transform: 'scale(95%)', transformOrigin: 'center' }}>
            {/* LAYER 1: Delicate Transparent White 3D Wireframe / Mesh (0 - 1000ms) */}
            <g className="animate-logo-wireframe">
              <path
                d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="1.8"
                strokeDasharray="8 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="1.8"
                strokeDasharray="8 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* LAYER 2: Glossy Translucent White Solid Logo Mark (300ms - 1200ms) */}
            <g className="animate-logo-solid animate-logo-bloom" filter={`url(#logoBloom-${key})`}>
              <path
                d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z"
                fill={`url(#glassmorphicFill-${key})`}
              />
              <path
                d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z"
                fill={`url(#glassmorphicFill-${key})`}
              />

              {/* Layer 3: Specular High-Glint Edge Reflections */}
              <path
                d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573"
                stroke={`url(#specularHighlight-${key})`}
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M65.2926 124.136L14 66.7372H34.6355"
                stroke={`url(#specularHighlight-${key})`}
                strokeWidth="1.2"
                fill="none"
              />
            </g>
          </g>
        </svg>
      </div>

      {showReplayButton && (
        <button
          onClick={handleReplay}
          className="mt-3 flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
        >
          <RotateCw className="h-3 w-3" />
          Replay Reveal
        </button>
      )}
    </div>
  )
}

/**
 * Fullscreen Page Load Intro Reveal Component
 * When page opens: displays 3D logo reveal, holds for a moment,
 * disappears smoothly after 2 seconds, and opens the mobile app!
 */
export function PageLoadLogoReveal() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 1.8s: Start smooth fade & blur out
    const fadeTimer = setTimeout(() => {
      setFading(true)
    }, 1800)

    // 2.2s: Hide splash overlay and unveil mobile view app
    const completeTimer = setTimeout(() => {
      setVisible(false)
      if (pathname === '/') {
        router.push('/dashboard')
      }
    }, 2200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [pathname, router])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background backdrop-blur-2xl transition-all duration-500 ease-out ${
        fading ? 'opacity-0 scale-105 blur-lg pointer-events-none' : 'opacity-100 scale-100 blur-none'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <LogoReveal size={190} />

        <div className="mt-6 flex flex-col items-center gap-1.5 animate-pulse">
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Streak<span className="text-gradient-ember">Forge</span>
          </span>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
            Loading App...
          </span>
        </div>
      </div>
    </div>
  )
}
