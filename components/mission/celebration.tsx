'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { Flame, Zap, ArrowRight, X, type LucideIcon } from 'lucide-react'
import { Confetti } from './confetti'

const ease = [0.22, 1, 0.36, 1] as const

type NewBadge = {
  name: string
  tagline: string
  icon: LucideIcon
}

/** Count-up number driven by a framer-motion value. */
function CountUp({
  from,
  to,
  duration = 1.6,
  delay = 0,
  className,
}: {
  from: number
  to: number
  duration?: number
  delay?: number
  className?: string
}) {
  const mv = useMotionValue(from)
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString())
  const [text, setText] = useState(from.toLocaleString())

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setText(v))
    const controls = animate(mv, to, { duration, delay, ease: 'easeOut' })
    return () => {
      unsub()
      controls.stop()
    }
  }, [mv, rounded, to, duration, delay])

  return <span className={className}>{text}</span>
}

/** Countdown to the next mission (tomorrow 8am). Live-updating h/m/s. */
function useNextMissionCountdown() {
  const [label, setLabel] = useState('')

  useEffect(() => {
    const compute = () => {
      const now = new Date()
      const next = new Date(now)
      next.setHours(8, 0, 0, 0)
      if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1)
      const diff = Math.max(0, next.getTime() - now.getTime())
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1000)
      setLabel(`${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`)
    }
    compute()
    const id = setInterval(compute, 1000)
    return () => clearInterval(id)
  }, [])

  return label
}

export function Celebration({
  xpFrom,
  xpEarned,
  streakFrom,
  newBadge,
}: {
  xpFrom: number
  xpEarned: number
  streakFrom: number
  newBadge?: NewBadge
}) {
  const xpTo = xpFrom + xpEarned
  const newStreak = streakFrom + 1
  const countdown = useNextMissionCountdown()

  const [streakBumped, setStreakBumped] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const badgeShown = useRef(false)

  useEffect(() => {
    const t1 = setTimeout(() => setStreakBumped(true), 1400)
    const t2 = setTimeout(() => {
      if (newBadge && !badgeShown.current) {
        badgeShown.current = true
        setShowBadge(true)
      }
    }, 2100)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [newBadge])

  const BadgeIcon = newBadge?.icon

  return (
    <main className="relative mx-auto min-h-dvh max-w-md overflow-hidden px-4 pb-10 pt-16">
      <Confetti />

      {/* Ambient ember glow behind the payoff */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.76_0.15_290/20%),transparent)]" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 12 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ember to-violet glow-ember"
        >
          <Zap className="h-8 w-8 text-primary-foreground" fill="currentColor" />
        </motion.div>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-balance text-foreground">
          Mission complete
        </h1>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          {newStreak} days down. You&apos;re unstoppable.
        </p>
      </motion.div>

      {/* XP earned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease }}
        className="relative mt-8 overflow-hidden rounded-3xl border border-ember/30 bg-gradient-to-br from-ember/15 via-card to-violet/10 p-6 text-center glow-ember"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(closest-side,oklch(0.76_0.15_290/30%),transparent)] blur-md" />
        <div className="text-xs font-semibold uppercase tracking-wide text-ember">Total XP</div>
        <div className="mt-1 font-display text-5xl font-extrabold tracking-tight text-gradient-ember">
          <CountUp from={xpFrom} to={xpTo} delay={0.4} />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-ember/15 px-3 py-1 text-xs font-bold text-ember"
        >
          <Zap className="h-3.5 w-3.5" fill="currentColor" />+{xpEarned} XP earned
        </motion.div>
      </motion.div>

      {/* Streak + countdown */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease }}
          className="rounded-3xl border border-border bg-card p-5"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Flame className="h-4 w-4 text-ember" />
            Streak
          </div>
          <div className="mt-2 flex items-end gap-1.5">
            <motion.span
              key={streakBumped ? 'new' : 'old'}
              animate={
                streakBumped
                  ? {
                      scale: [1, 1.35, 1],
                      textShadow: [
                        '0 0 0px oklch(0.76 0.15 290 / 0)',
                        '0 0 22px oklch(0.76 0.15 290 / 60%)',
                        '0 0 10px oklch(0.76 0.15 290 / 30%)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.6, ease }}
              className="font-display text-4xl font-extrabold leading-none text-foreground"
            >
              {streakBumped ? newStreak : streakFrom}
            </motion.span>
            <span className="mb-1 text-sm font-medium text-muted-foreground">days</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.5, ease }}
          className="rounded-3xl border border-border bg-card p-5"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Next mission
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums leading-none text-foreground">
            {countdown || '—'}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">Fresh mission at 8:00 AM</div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease }}
        className="mt-6"
      >
        <Link
          href="/dashboard"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-ember to-violet px-5 py-3.5 text-sm font-bold text-primary-foreground glow-ember transition-transform active:scale-[0.98]"
        >
          Back to Mission Control
          <ArrowRight className="h-4 w-4" />
        </Link>
        {newBadge && !showBadge && badgeShown.current && (
          <button
            onClick={() => setShowBadge(true)}
            className="mt-3 w-full text-center text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
          >
            View your new badge
          </button>
        )}
      </motion.div>

      {/* Badge unlock modal */}
      <AnimatePresence>
        {showBadge && newBadge && BadgeIcon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-6"
          >
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowBadge(false)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-ember/30 bg-card p-7 text-center glow-ember"
            >
              <button
                onClick={() => setShowBadge(false)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors active:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
                Badge unlocked
              </div>

              {/* Icon flies in + scales up with a spinning glow ring */}
              <div className="relative mx-auto mt-5 h-28 w-28">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,oklch(0.76_0.15_290),oklch(0.80_0.12_155),oklch(0.85_0.12_90),oklch(0.76_0.15_290))] blur-md"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -90, y: -40 }}
                  animate={{ scale: 1, rotate: 0, y: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 12 }}
                  className="absolute inset-1.5 flex items-center justify-center rounded-full border border-ember/40 bg-gradient-to-br from-card to-secondary"
                >
                  <BadgeIcon className="h-12 w-12 text-ember" />
                </motion.div>
              </div>

              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground">
                {newBadge.name}
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
                {newBadge.tagline}
              </p>

              <button
                onClick={() => setShowBadge(false)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-ember to-violet px-5 py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
              >
                Nice
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
