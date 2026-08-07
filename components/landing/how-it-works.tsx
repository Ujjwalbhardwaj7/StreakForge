'use client'

import { motion } from 'framer-motion'
import { Route, Target, Share2, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Route,
    kicker: 'Step 01',
    title: 'Pick a track',
    body: 'Frontend, backend, full-stack, or DSA. Choose the path that matches where you want your career to go.',
  },
  {
    icon: Target,
    kicker: 'Step 02',
    title: 'Get a daily mission',
    body: 'Wake up to one bite-sized build, scaled to your level. Clear goal, no decision fatigue.',
  },
  {
    icon: Share2,
    kicker: 'Step 03',
    title: 'Ship + post',
    body: 'Push your commit and share the win on LinkedIn. Real accountability that grows your dev presence.',
  },
  {
    icon: Sparkles,
    kicker: 'Step 04',
    title: 'Earn XP, keep your streak',
    body: 'Bank XP, level up, and extend your streak. Then come back tomorrow and do it again.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-sm font-semibold text-ember">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Four steps a day keep the streak alive
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            The whole ritual takes minutes — the compounding takes 60 days.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ember/20 to-violet/15 text-ember">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {s.kicker}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
