'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rot: number
  vrot: number
  color: string
  shape: 'rect' | 'circle'
  life: number
}

const COLORS = [
  'oklch(0.76 0.15 290)', // pastel lavender
  'oklch(0.80 0.12 155)', // pastel mint
  'oklch(0.85 0.12 90)',  // pastel butter yellow
  'oklch(0.78 0.13 30)',  // pastel coral
]

/**
 * Tasteful, ~2s canvas confetti burst. Fires once on mount.
 */
export function Confetti({ duration = 2200 }: { duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = (canvas.width = window.innerWidth * dpr)
    let h = (canvas.height = window.innerHeight * dpr)
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.scale(dpr, dpr)

    const vw = window.innerWidth
    const vh = window.innerHeight

    const particles: Particle[] = []
    // Two launch points near the top-center for a celebratory arc.
    const origins = [
      { x: vw * 0.32, y: vh * 0.32 },
      { x: vw * 0.68, y: vh * 0.32 },
    ]
    const count = Math.min(160, Math.round(vw / 4))

    for (let i = 0; i < count; i++) {
      const o = origins[i % origins.length]
      const angle = Math.PI * (0.5 + (Math.random() - 0.5) * 1.4) * -1 // upward spread
      const speed = 6 + Math.random() * 9
      particles.push({
        x: o.x,
        y: o.y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        size: 5 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        shape: Math.random() > 0.35 ? 'rect' : 'circle',
        life: 0,
      })
    }

    const gravity = 0.22
    const drag = 0.992
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = now - start
      ctx.clearRect(0, 0, w, h)
      // Global fade-out over the last 600ms.
      const fade = elapsed > duration - 600 ? Math.max(0, (duration - elapsed) / 600) : 1

      for (const p of particles) {
        p.vx *= drag
        p.vy = p.vy * drag + gravity
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vrot
        p.life += 1

        ctx.save()
        ctx.globalAlpha = fade
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, w, h)
      }
    }
    raf = requestAnimationFrame(tick)

    const onResize = () => {
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [duration])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  )
}
