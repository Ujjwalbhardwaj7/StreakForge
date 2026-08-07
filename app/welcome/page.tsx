'use client'

import { useRouter } from 'next/navigation'
import { AICoachCard } from '@/components/ai-coach-card'
import { EmptyState } from '@/components/empty-state'
import { emptyStates, type EmptyStateKey } from '@/lib/empty-states'

/** Where each empty-state CTA leads inside the app. */
const routes: Record<EmptyStateKey, string> = {
  firstDay: '/dashboard',
  noStreak: '/mission',
  noSubmissions: '/mission',
  noAchievements: '/dashboard',
  missedYesterday: '/dashboard',
}

const order: EmptyStateKey[] = [
  'firstDay',
  'noStreak',
  'noSubmissions',
  'noAchievements',
  'missedYesterday',
]

export default function WelcomePage() {
  const router = useRouter()
  const first = emptyStates.firstDay

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-ember/20 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-violet/20 blur-[90px]"
      />
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-12">
        <header className="flex flex-col gap-1.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-ember">
            StreakForge
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight text-balance text-foreground">
            Welcome to the forge.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            No streak, no submissions, no badges yet — and that&apos;s exactly
            where every builder begins. Here&apos;s your first step and a look at
            what&apos;s ahead.
          </p>
        </header>

        {/* Primary first-day state, front and center */}
        <section className="grid items-stretch gap-4 lg:grid-cols-2">
          <EmptyState
            icon={first.icon}
            title={first.title}
            description={first.description}
            cta={first.cta}
            accent={first.accent}
            kicker={first.kicker}
            onCta={() => router.push(routes.firstDay)}
            className="h-full"
          />
          <div className="flex flex-col justify-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Your coach is already here
            </p>
            <AICoachCard
              insights={[
                'Welcome aboard. Your first mission is the hardest to start and the easiest to finish.',
                "Pick something small today — momentum beats motivation.",
                "I'll be right here tracking every win with you.",
              ]}
            />
          </div>
        </section>

        {/* The other states, framed as milestones ahead */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What&apos;s ahead
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {order
              .filter((k) => k !== 'firstDay')
              .map((key) => {
                const s = emptyStates[key]
                return (
                  <EmptyState
                    key={key}
                    icon={s.icon}
                    title={s.title}
                    description={s.description}
                    cta={s.cta}
                    accent={s.accent}
                    kicker={s.kicker}
                    onCta={() => router.push(routes[key])}
                    className="h-full"
                  />
                )
              })}
          </div>
        </section>
      </div>
    </main>
  )
}
