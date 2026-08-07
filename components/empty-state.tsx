'use client'

import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export type EmptyStateProps = {
  /** The soft-gradient icon shown in the medallion. */
  icon: LucideIcon
  /** Short, punchy headline — always forward-looking. */
  title: string
  /** One supporting line that reinforces the momentum. */
  description: string
  /** Single clear call to action. */
  cta: string
  onCta?: () => void
  /**
   * Accent flavor for the gradient medallion + glow.
   * `ember` = warm/energizing, `violet` = aspirational, `dual` = blended.
   */
  accent?: 'ember' | 'violet' | 'dual'
  /** Optional tiny kicker above the title (e.g. "Day 1"). */
  kicker?: string
  className?: string
}

const accentGlow: Record<NonNullable<EmptyStateProps['accent']>, string> = {
  ember: 'bg-ember/25',
  violet: 'bg-violet/25',
  dual: 'bg-ember/20',
}

const accentMedallion: Record<NonNullable<EmptyStateProps['accent']>, string> = {
  ember: 'from-ember via-ember/90 to-ember/60',
  violet: 'from-violet via-violet/90 to-violet/60',
  dual: 'from-ember via-ember/80 to-violet',
}

/**
 * Motivating empty state.
 *
 * A soft-gradient icon medallion, one punchy forward-looking line, a supporting
 * line, and a single clear CTA. No guilt-tripping — always about what's next.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  cta,
  onCta,
  accent = 'ember',
  kicker,
  className,
}: EmptyStateProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`glass relative flex flex-col items-center overflow-hidden rounded-3xl px-6 py-10 text-center ${className ?? ''}`}
    >
      {/* soft ambient glow behind the medallion */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-4 h-32 w-32 -translate-x-1/2 rounded-full blur-[60px] ${accentGlow[accent]}`}
      />

      {/* gradient icon medallion */}
      <motion.div
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative mb-5"
      >
        <div
          aria-hidden
          className={`absolute -inset-2 rounded-full bg-gradient-to-br opacity-40 blur-md ${accentMedallion[accent]}`}
        />
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-white/15 ${accentMedallion[accent]}`}
        >
          {/* inner light highlight */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_32%_26%,oklch(1_0_0/55%),transparent_50%)]"
          />
          <Icon className="relative h-7 w-7 text-white" strokeWidth={2} aria-hidden />
        </div>
      </motion.div>

      {kicker && (
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-ember">
          {kicker}
        </p>
      )}

      <h2 className="font-display text-lg font-extrabold leading-tight text-balance text-foreground">
        {title}
      </h2>
      <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-muted-foreground text-pretty">
        {description}
      </p>

      <button
        type="button"
        onClick={onCta}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-ember to-violet px-6 py-2.5 text-sm font-bold text-ember-foreground shadow-lg shadow-ember/20 outline-none transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
      >
        {cta}
      </button>
    </div>
  )
}
