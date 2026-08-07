'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const reviews = [
  {
    quote:
      'I’d started “learn to code seriously” five times. StreakForge is the first thing that got me past week two — and straight into my first offer.',
    name: 'Maya R.',
    role: 'Career switcher → Frontend Engineer',
    streak: 58,
    initials: 'MR',
    grad: 'from-ember to-violet',
  },
  {
    quote:
      'The LinkedIn step felt gimmicky until three recruiters messaged me about my daily posts. Now it’s my favorite part of the day.',
    name: 'Dev Patel',
    role: 'Junior Frontend Dev',
    streak: 41,
    initials: 'DP',
    grad: 'from-violet to-ember',
  },
  {
    quote:
      'It’s the only habit app that made me feel bad in a good way. Missing a day genuinely stings — so I just don’t.',
    name: 'Sofia L.',
    role: 'CS Student',
    streak: 33,
    initials: 'SL',
    grad: 'from-ember to-destructive',
  },
  {
    quote:
      'My cohort pod turned into real friends. We ship, we roast each other’s commits, we keep going. Two of us got hired the same week.',
    name: 'Jordan K.',
    role: 'Bootcamp Grad → Full-stack Dev',
    streak: 60,
    initials: 'JK',
    grad: 'from-violet to-primary',
  },
]

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold text-ember">Student success stories</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Streaks that changed the trajectory
          </h2>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              className="mb-4 break-inside-avoid rounded-3xl border border-border bg-card p-6"
            >
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-ember/15 px-2.5 py-1 text-xs font-bold text-ember">
                <Flame className="h-3.5 w-3.5 fill-ember" />
                {r.streak}-day streak
              </div>
              <blockquote className="text-pretty leading-relaxed text-foreground">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${r.grad} text-xs font-bold text-primary-foreground`}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {r.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
