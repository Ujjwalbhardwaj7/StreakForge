'use client'

import { motion } from 'framer-motion'
import { Target, Code2, Share2, PartyPopper } from 'lucide-react'

const beats = [
  {
    time: '9:00 AM',
    icon: Target,
    title: 'Your mission drops',
    body: '“Build a debounced search hook.” One clear goal, a time estimate, and +120 XP on the line.',
    tag: 'Mission',
  },
  {
    time: '9:15 AM',
    icon: Code2,
    title: 'You build + push',
    body: 'Open the editor, ship the feature, push a commit. StreakForge verifies it automatically.',
    tag: 'Code',
  },
  {
    time: '9:40 AM',
    icon: Share2,
    title: 'You post the win',
    body: 'Drop a two-line LinkedIn post about what you learned. Your network watches you grow in public.',
    tag: 'Post',
  },
  {
    time: '9:42 AM',
    icon: PartyPopper,
    title: 'You celebrate',
    body: 'XP banked, level up, streak +1. A little confetti, a lot of momentum. See you tomorrow.',
    tag: 'Celebrate',
  },
]

export function DailyJourney() {
  return (
    <section id="journey" className="scroll-mt-24 px-4 py-8">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-ember">The Daily Ritual</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            What 30 minutes looks like
          </h2>
          <p className="mt-2 text-xs text-pretty text-muted-foreground">
            No endless tutorials. Just a clean loop designed to fit into your morning or late night.
          </p>
        </motion.div>

        <div className="relative mt-8 space-y-4">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-ember via-primary to-transparent sm:left-[31px]" />

          <div className="space-y-6">
            {beats.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-start gap-4"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-ember">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 rounded-3xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-violet">
                      {b.tag}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {b.time}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {b.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
