'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, FolderGit2, Sparkles, Briefcase } from 'lucide-react'

const props = [
  {
    icon: CalendarCheck,
    title: 'Consistency',
    body: 'Show up daily without relying on willpower. Streaks turn good intentions into an automatic habit.',
    accent: 'text-ember',
    ring: 'from-ember/20 to-card',
  },
  {
    icon: FolderGit2,
    title: 'Portfolio',
    body: 'Every mission ships real, reviewable work. In 60 days you have projects that speak louder than a résumé.',
    accent: 'text-primary',
    ring: 'from-primary/20 to-ember/10',
  },
  {
    icon: Sparkles,
    title: 'Confidence',
    body: 'Publishing your wins in public builds proof — and proof builds the belief that you actually can do this.',
    accent: 'text-ember',
    ring: 'from-ember/20 to-card',
  },
  {
    icon: Briefcase,
    title: 'Job-readiness',
    body: 'A visible track record, a growing network, and daily reps on real problems — exactly what recruiters look for.',
    accent: 'text-primary',
    ring: 'from-primary/20 to-ember/10',
  },
]

export function Why() {
  return (
    <section id="why" className="scroll-mt-24 px-4 py-8">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-sm font-semibold text-ember">Why StreakForge</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            The habit that quietly builds a career
          </h2>
          <p className="mt-2.5 text-xs text-pretty leading-relaxed text-muted-foreground">
            Four things every developer needs to get hired — compounded one day at a time.
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-3.5">
          {props.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-ember/30"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.ring} ${p.accent} transition-transform group-hover:-translate-y-0.5`}
              >
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
