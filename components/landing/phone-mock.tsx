'use client'

import { motion } from 'framer-motion'
import { Flame, Check, Zap, ChevronRight } from 'lucide-react'

// 60-day journey grid. A handful of "rest"/missed cells keep it honest.
const days = Array.from({ length: 60 }, (_, i) => {
  const done = i < 23
  const missed = i === 9 || i === 17
  return { i, done: done && !missed, missed: done && missed, today: i === 23 }
})

export function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      {/* ambient glow */}
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,oklch(0.76_0.15_290/25%),transparent)] blur-2xl" />

      <div className="rounded-[2.5rem] border border-border bg-card p-2.5 shadow-2xl">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-background">
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pt-4 text-[11px] font-medium text-muted-foreground">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Day 24
            </span>
          </div>

          <div className="space-y-4 p-5">
            {/* streak headline */}
            <div>
              <p className="text-xs text-muted-foreground">Current streak</p>
              <div className="flex items-end gap-2">
                <span className="font-display text-5xl font-extrabold leading-none text-foreground">
                  23
                </span>
                <span className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-ember">
                  <Flame className="h-4 w-4 fill-ember" /> days
                </span>
              </div>
            </div>

            {/* today's mission card */}
            <div className="rounded-2xl border border-border bg-gradient-to-br from-ember/15 to-violet/10 p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-ember">
                  Today&apos;s mission
                </span>
                <span className="rounded-full bg-ember/20 px-2 py-0.5 text-[10px] font-bold text-ember">
                  +120 XP
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-foreground text-balance">
                Build a debounced search hook
              </p>
              <button className="mt-3 flex w-full items-center justify-between rounded-xl bg-foreground px-3 py-2 text-xs font-semibold text-background">
                Start mission
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 60 day grid */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  60-day forge
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  23 / 60
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {days.map((d) => (
                  <motion.span
                    key={d.i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + d.i * 0.006,
                      type: 'spring',
                      stiffness: 400,
                      damping: 24,
                    }}
                    className={`aspect-square rounded-[4px] ${
                      d.today
                        ? 'bg-ember glow-ember'
                        : d.done
                          ? 'bg-ember/70'
                          : d.missed
                            ? 'bg-destructive/40'
                            : 'bg-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* mini stats */}
            <div className="flex gap-2">
              <div className="flex-1 rounded-xl border border-border bg-card p-2.5">
                <Zap className="h-3.5 w-3.5 text-ember" />
                <p className="mt-1 font-display text-sm font-bold text-foreground">
                  2,760
                </p>
                <p className="text-[10px] text-muted-foreground">Total XP</p>
              </div>
              <div className="flex-1 rounded-xl border border-border bg-card p-2.5">
                <Check className="h-3.5 w-3.5 text-violet" />
                <p className="mt-1 font-display text-sm font-bold text-foreground">
                  Top 4%
                </p>
                <p className="text-[10px] text-muted-foreground">This cohort</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating XP chip */}
      <motion.div
        initial={{ opacity: 0, y: 10, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute -right-3 top-24 flex items-center gap-1.5 rounded-full glass border border-border px-3 py-1.5 text-xs font-semibold text-foreground shadow-xl"
      >
        <Flame className="h-3.5 w-3.5 fill-ember text-ember" />
        Streak saved!
      </motion.div>
    </div>
  )
}
