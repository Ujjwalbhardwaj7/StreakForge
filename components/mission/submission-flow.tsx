'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Zap, Check, Trophy, type LucideIcon } from 'lucide-react'
import { student, missionDetail } from '@/lib/mission-data'
import { Celebration } from './celebration'

const ease = [0.22, 1, 0.36, 1] as const

type IconType = React.ComponentType<{ className?: string }>

function Github({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.59.23 2.76.11 3.05.74.81 1.19 1.85 1.19 3.11 0 4.45-2.69 5.42-5.26 5.71.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

const LINKEDIN_BONUS = 20
const totalXp = missionDetail.xpReward + LINKEDIN_BONUS

const newBadge = {
  name: 'Full Stack Streak',
  tagline: 'You shipped code and shared the win 24 days running.',
  icon: Trophy as LucideIcon,
}

type StepDef = {
  key: string
  title: string
  action: string
  icon: IconType
  placeholder: string
  hint: string
  validate: (v: string) => boolean
}

const steps: StepDef[] = [
  {
    key: 'github',
    title: 'Push your code to GitHub',
    action: 'Paste the link to the repository or commit where your work lives.',
    icon: Github,
    placeholder: 'https://github.com/you/debounced-search',
    hint: 'Must be a valid github.com link.',
    validate: (v) => /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+/i.test(v.trim()),
  },
  {
    key: 'linkedin',
    title: 'Share the win on LinkedIn',
    action: 'Post about what you built, then paste the link to your post.',
    icon: Linkedin,
    placeholder: 'https://linkedin.com/posts/you-...',
    hint: 'Must be a valid linkedin.com post link. +20 XP bonus.',
    validate: (v) => /^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(v.trim()),
  },
]

export function SubmissionFlow() {
  const [step, setStep] = useState(0) // 0,1 = form steps; 2 = claim
  const [values, setValues] = useState<Record<string, string>>({ github: '', linkedin: '' })
  const [dir, setDir] = useState(1)
  const [claimed, setClaimed] = useState(false)

  const isClaimStep = step === 2
  const current = steps[step]
  const canAdvance = isClaimStep ? true : current.validate(values[current.key] ?? '')

  const go = (next: number) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  if (claimed) {
    return (
      <Celebration
        xpFrom={student.xp}
        xpEarned={totalXp}
        streakFrom={student.streak}
        newBadge={newBadge}
      />
    )
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pb-28 pt-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        {step === 0 ? (
          <Link
            href="/mission"
            aria-label="Back to mission"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors active:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : (
          <button
            onClick={() => go(step - 1)}
            aria-label="Previous step"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors active:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Submit mission
        </span>
        <div className="h-10 w-10" />
      </div>

      {/* Stepper */}
      <Stepper current={step} total={3} />

      {/* Step content */}
      <div className="relative mt-8 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease }}
          >
            {isClaimStep ? (
              <ClaimStep />
            ) : (
              <FormStep
                def={current}
                value={values[current.key] ?? ''}
                valid={canAdvance}
                onChange={(v) => setValues((s) => ({ ...s, [current.key]: v }))}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50">
        <div className="glass mx-auto max-w-md border-t border-border px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
          {!isClaimStep ? (
            <button
              disabled={!canAdvance}
              onClick={() => go(step + 1)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:grayscale enabled:glow-ember"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setClaimed(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3.5 text-sm font-bold text-primary-foreground glow-ember transition-transform active:scale-[0.98]"
            >
              <Zap className="h-4 w-4" fill="currentColor" />
              Claim {totalXp} XP
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

function Stepper({ current, total }: { current: number; total: number }) {
  const labels = ['GitHub', 'LinkedIn', 'Claim XP']
  return (
    <div className="mt-6 flex items-center">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ring-1 transition-colors ${
                  done
                    ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground ring-transparent'
                    : active
                      ? 'bg-ember/15 text-ember ring-ember/40'
                      : 'bg-card text-muted-foreground ring-border'
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`mt-1.5 text-[10px] font-medium ${
                  active ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {labels[i]}
              </span>
            </div>
            {i < total - 1 && (
              <div className="mx-1 -mt-5 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={false}
                  animate={{ width: done ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function FormStep({
  def,
  value,
  valid,
  onChange,
}: {
  def: StepDef
  value: string
  valid: boolean
  onChange: (v: string) => void
}) {
  const Icon = def.icon
  const showError = value.trim().length > 0 && !valid
  return (
    <div>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-foreground">
        <Icon className="h-7 w-7" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-balance text-foreground">
        {def.title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{def.action}</p>

      <div className="mt-6">
        <label htmlFor={def.key} className="sr-only">
          {def.title}
        </label>
        <div
          className={`flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 transition-colors ${
            showError ? 'border-destructive/60' : valid ? 'border-ember/50' : 'border-border'
          }`}
        >
          <Icon className="h-4.5 w-4.5 shrink-0 text-muted-foreground" />
          <input
            id={def.key}
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={def.placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          {valid && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember text-ember-foreground"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </motion.span>
          )}
        </div>
        <p
          className={`mt-2 text-[11px] ${showError ? 'text-destructive' : 'text-muted-foreground'}`}
        >
          {showError ? 'That doesn’t look like a valid link yet.' : def.hint}
        </p>
      </div>
    </div>
  )
}

function ClaimStep() {
  return (
    <div>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent glow-ember">
        <Zap className="h-7 w-7 text-primary-foreground" fill="currentColor" />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-balance text-foreground">
        Claim your reward
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
        Everything checks out. Lock in your XP and keep the streak alive.
      </p>

      <div className="mt-6 space-y-2.5">
        <SummaryRow icon={Github} label="Code pushed to GitHub" value="Verified" />
        <SummaryRow icon={Linkedin} label="Win shared on LinkedIn" value={`+${LINKEDIN_BONUS} XP`} />
        <SummaryRow icon={Zap} label="Mission reward" value={`+${missionDetail.xpReward} XP`} />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-ember/30 bg-gradient-to-br from-ember/15 via-card to-card px-5 py-4 glow-ember">
        <span className="text-sm font-semibold text-foreground">Total reward</span>
        <span className="font-display text-2xl font-extrabold text-gradient-ember">
          +{totalXp} XP
        </span>
      </div>
    </div>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: IconType
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      <span className="flex items-center gap-1 text-xs font-bold text-ember">
        <Check className="h-3.5 w-3.5" />
        {value}
      </span>
    </div>
  )
}
