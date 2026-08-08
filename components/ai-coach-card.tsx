'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Mocked, warm, specific insights — never generic filler. */
export const defaultCoachInsights: string[] = [
  "You've completed React missions three days in a row.",
  'You usually finish frontend missions in under 40 minutes.',
  "You're only two days away from your next badge.",
  'Keep your streak alive today.',
]

type AICoachCardProps = {
  /** Insights to rotate through. Defaults to the mocked StreakForge set. */
  insights?: string[]
  /** Coach display name. */
  name?: string
  /** Auto-advance to the next insight. */
  autoRotate?: boolean
  /** Time each insight stays on screen after it finishes typing (ms). */
  dwellMs?: number
  /** Per-character typing speed (ms). */
  typeSpeedMs?: number
  className?: string
}

/**
 * Reusable AI Coach card.
 *
 * A glassmorphic panel with a slowly rotating gradient border, a soft glowing
 * orb avatar (abstract, not a literal robot), and a typewriter reveal that
 * rotates through a few warm, specific insights — as if the coach is speaking
 * directly to the student. Respects `prefers-reduced-motion`.
 */
export function AICoachCard({
  insights = defaultCoachInsights,
  name = 'Ember',
  autoRotate = true,
  dwellMs = 2600,
  typeSpeedMs = 26,
  className,
}: AICoachCardProps) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const message = insights[index] ?? ''

  const { typed, done } = useTypewriter(message, reduceMotion ? 0 : typeSpeedMs)

  // Advance to the next insight once the current one finishes typing + dwells.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!autoRotate || insights.length <= 1 || !done) return
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % insights.length)
    }, dwellMs)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [autoRotate, done, dwellMs, insights.length])

  return (
    <div className={`relative overflow-hidden rounded-3xl p-px ${className ?? ''}`}>
      {/* Animated gradient border: a slowly rotating conic sweep behind a 1px inset. */}
      {reduceMotion ? (
        <div className="absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,rgba(35,66,42,0.6),rgba(69,105,75,0.5),transparent_55%,rgba(35,66,42,0.6))]" />
      ) : (
        <motion.div
          aria-hidden
          className="absolute -inset-[60%] rounded-full bg-[conic-gradient(from_0deg,rgba(35,66,42,0.7),rgba(69,105,75,0.6),transparent_40%,rgba(35,66,42,0.7))]"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
        />
      )}

      {/* Glass content panel sits above the border layer. */}
      <div className="glass relative rounded-[calc(var(--radius)+11px)] p-5">
        <div className="flex items-start gap-3">
          <CoachOrb speaking={!done && !reduceMotion} />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-display text-sm font-bold text-foreground">Coach {name}</p>
              <span className="rounded-full bg-ember/15 px-2 py-0.5 text-[10px] font-semibold text-ember">
                AI
              </span>
            </div>

            <p className="mt-1.5 min-h-[2.75rem] text-sm leading-relaxed text-muted-foreground text-pretty">
              <span aria-live="polite">{typed}</span>
              {!reduceMotion && !done && (
                <motion.span
                  aria-hidden
                  className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 rounded-full bg-ember align-middle"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 0.85, repeat: Infinity }}
                />
              )}
            </p>

            {/* Rotation indicator — jump between insights. */}
            {insights.length > 1 && (
              <div className="mt-3 flex items-center gap-1.5">
                {insights.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show insight ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? 'w-5 bg-gradient-to-r from-primary to-accent'
                        : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Soft glowing orb — abstract, minimal, not a literal robot. */
function CoachOrb({ speaking }: { speaking: boolean }) {
  return (
    <div className="relative h-10 w-10 shrink-0">
      {/* ambient halo */}
      <motion.div
        aria-hidden
        className="absolute -inset-1 rounded-full bg-[radial-gradient(circle,rgba(69,105,75,0.45),transparent_70%)] blur-[6px]"
        animate={
          speaking
            ? { scale: [1, 1.22, 1], opacity: [0.6, 0.95, 0.6] }
            : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{
          duration: speaking ? 1.1 : 3.4,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      {/* orb body */}
      <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-[#1c3823] via-[#23422a] to-[#45694b] ring-1 ring-white/20">
        {/* inner light highlight */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,oklch(1_0_0/75%),transparent_46%)]" />
        {/* drifting inner core */}
        <motion.div
          aria-hidden
          className="absolute h-3 w-3 rounded-full bg-white/50 blur-[3px]"
          animate={{
            x: [6, 20, 10, 6],
            y: [18, 8, 22, 18],
            opacity: [0.4, 0.7, 0.45, 0.4],
          }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
    </div>
  )
}

/** Reveals `text` one character at a time. speed=0 shows it instantly. */
function useTypewriter(text: string, speed: number) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    if (speed <= 0) {
      setCount(text.length)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return { typed: text.slice(0, count), done: count >= text.length }
}
