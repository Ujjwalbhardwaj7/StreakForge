import { Flame, Rocket, Trophy, Sunrise, Compass } from 'lucide-react'
import type { EmptyStateProps } from '@/components/empty-state'

export type EmptyStateKey =
  | 'noStreak'
  | 'noSubmissions'
  | 'noAchievements'
  | 'missedYesterday'
  | 'firstDay'

/** Warm, specific, always forward-looking. Never "no data", never guilt. */
export const emptyStates: Record<
  EmptyStateKey,
  Omit<EmptyStateProps, 'onCta'> & { label: string }
> = {
  firstDay: {
    label: 'First day',
    icon: Compass,
    accent: 'dual',
    kicker: 'Day 1',
    title: 'Welcome to StreakForge.',
    description:
      "Here's how it works: pick a mission, ship it, and watch your streak begin. Let's find your first one.",
    cta: 'Take the tour',
  },
  noStreak: {
    label: 'No streak yet',
    icon: Flame,
    accent: 'ember',
    title: 'Your journey starts today.',
    description:
      'Every streak begins with a single day. Complete one mission and light the spark.',
    cta: 'Start day one',
  },
  noSubmissions: {
    label: 'No submissions yet',
    icon: Rocket,
    accent: 'violet',
    title: 'Your first mission is waiting.',
    description:
      'Pick something small to start — momentum is easier to build than you think.',
    cta: 'Browse missions',
  },
  noAchievements: {
    label: 'No achievements yet',
    icon: Trophy,
    accent: 'dual',
    title: 'Badges are within reach.',
    description:
      'Your first badge, "Spark", unlocks after a single completed mission. More await beyond it.',
    cta: 'See what to earn',
  },
  missedYesterday: {
    label: 'Missed yesterday',
    icon: Sunrise,
    accent: 'ember',
    title: "Yesterday's gone. Today's still yours.",
    description:
      'Streaks bend, they don\u2019t break your progress. Pick up right where you left off.',
    cta: 'Refocus on today',
  },
}
