'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Clock,
  Zap,
  BookOpen,
  PlayCircle,
  Code2,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'
import { missionDetail, type Difficulty, type MissionResource } from '@/lib/mission-data'
import { Checklist } from './checklist'

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: 'bg-violet/15 text-violet ring-violet/25',
  Intermediate: 'bg-ember/15 text-ember ring-ember/25',
  Advanced: 'bg-destructive/15 text-destructive ring-destructive/25',
}

const resourceIcons: Record<MissionResource['kind'], LucideIcon> = {
  Docs: BookOpen,
  Video: PlayCircle,
  Example: Code2,
}

const ease = [0.22, 1, 0.36, 1] as const

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function MissionDetail() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(0)
  const total = missionDetail.checklist.length
  const allDone = done === total && total > 0

  const handlePrimary = () => {
    if (!started) {
      setStarted(true)
    } else if (allDone) {
      router.push('/mission/submit')
    }
  }

  return (
    <main className="mx-auto min-h-dvh max-w-md px-4 pb-28 pt-5">
      {/* Top bar */}
      <Section>
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            aria-label="Back to Mission Control"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors active:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {missionDetail.track}
          </span>
        </div>
      </Section>

      {/* Title + difficulty */}
      <Section delay={0.05}>
        <div className="mt-6">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ${difficultyStyles[missionDetail.difficulty]}`}
          >
            {missionDetail.difficulty}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-balance text-foreground">
            {missionDetail.title}
          </h1>
        </div>
      </Section>

      {/* Meta: time + XP */}
      <Section delay={0.1}>
        <div className="mt-5 flex items-stretch gap-3">
          <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                {missionDetail.estMinutes} min
              </div>
              <div className="text-[11px] text-muted-foreground">Est. time</div>
            </div>
          </div>

          <div className="relative flex flex-1 items-center gap-2.5 overflow-hidden rounded-2xl border border-ember/30 bg-gradient-to-br from-ember/20 via-card to-card px-4 py-3 glow-ember">
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(closest-side,rgba(35,66,42,0.25),transparent)] blur-md" />
            <Zap className="h-5 w-5 text-ember" fill="currentColor" />
            <div className="relative">
              <div className="text-lg font-extrabold leading-none text-gradient-ember">
                +{missionDetail.xpReward} XP
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Reward</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Technologies */}
      <Section delay={0.15}>
        <div className="mt-5 flex flex-wrap gap-2">
          {missionDetail.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* Learning outcome */}
      <Section delay={0.2}>
        <div className="mt-5 rounded-3xl border border-border bg-card p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ember">
            What you&apos;ll learn
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90 text-pretty">
            {missionDetail.learningOutcome}
          </p>
        </div>
      </Section>

      {/* Checklist */}
      <Section delay={0.25}>
        <div className="mt-4">
          <Checklist onProgress={(d) => setDone(d)} />
        </div>
      </Section>

      {/* Resources */}
      <Section delay={0.3}>
        <section className="mt-4 rounded-3xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Helpful resources</h3>
          <ul className="mt-3 space-y-1">
            {missionDetail.resources.map((res) => {
              const Icon = resourceIcons[res.kind]
              return (
                <li key={res.label}>
                  <a
                    href={res.href}
                    className="group flex items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors active:bg-secondary/60"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-ember">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {res.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{res.kind}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-active:translate-x-0.5" />
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
      </Section>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50">
        <div className="glass mx-auto max-w-md border-t border-border px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
          {started && (
            <div className="mb-2.5 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={false}
                  animate={{ width: `${total ? (done / total) * 100 : 0}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                />
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground">
                {done}/{total}
              </span>
            </div>
          )}
          <button
            onClick={handlePrimary}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3.5 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            <Zap className="h-4 w-4" fill="currentColor" />
            {!started ? 'Start Mission' : allDone ? 'Complete Mission' : 'Continue'}
          </button>
        </div>
      </div>
    </main>
  )
}
