import {
  Flame,
  Rocket,
  Award,
  Trophy,
  Zap,
  Crown,
  GitCommit,
  Share2,
  Target,
  Snowflake,
  type LucideIcon,
} from 'lucide-react'

export const student = {
  name: 'Aarav',
  avatarInitials: 'AR',
  streak: 23,
  streakFreezes: 2,
  day: 23,
  totalDays: 60,
  xp: 2760,
  xpToNextLevel: 3000,
  level: 7,
  levelTitle: 'Forge Apprentice',
  rank: 12,
  rankTotal: 340,
  cohort: 'August Builders',
}

export const todayMission = {
  title: 'Build a debounced search hook',
  track: 'Frontend',
  difficulty: 'Intermediate' as const,
  estMinutes: 35,
  xpReward: 120,
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type MissionResource = {
  label: string
  kind: 'Docs' | 'Video' | 'Example'
  href: string
}

export const missionDetail = {
  title: 'Build a debounced search hook',
  track: 'Frontend',
  difficulty: 'Intermediate' as Difficulty,
  estMinutes: 35,
  xpReward: 120,
  technologies: ['React', 'TypeScript', 'Hooks', 'Web APIs'],
  learningOutcome:
    'You’ll walk away knowing how to build a reusable useDebounce hook and wire it into a live search input — so your UI stays snappy while cutting unnecessary network calls.',
  checklist: [
    { id: 'c1', label: 'Scaffold a search input with controlled state' },
    { id: 'c2', label: 'Write a generic useDebounce<T> hook with a delay' },
    { id: 'c3', label: 'Clear the timeout on unmount to avoid leaks' },
    { id: 'c4', label: 'Fetch results from the debounced value only' },
    { id: 'c5', label: 'Handle loading and empty states gracefully' },
  ],
  resources: [
    { label: 'React docs: useEffect cleanup', kind: 'Docs', href: '#' },
    { label: 'Debouncing in JavaScript (video)', kind: 'Video', href: '#' },
    { label: 'Example: useDebounce on GitHub', kind: 'Example', href: '#' },
  ] as MissionResource[],
}

export const coachInsight = {
  name: 'Ember',
  message:
    "You ship fastest on weekday mornings — 3 of your last 4 missions landed before 10am. Want tomorrow's mission scheduled for 8am while you're in the zone?",
}

// Rotating AI coach insights — warm, specific, never generic.
export const coachInsights: string[] = [
  "You've completed React missions three days in a row.",
  'You usually finish frontend missions in under 40 minutes.',
  "You're only two days away from your next badge.",
  'Keep your streak alive today.',
]

// 0 = none, 1 = light, 2 = medium, 3 = full
export const weeklyHeat: { day: string; level: number }[] = [
  { day: 'M', level: 3 },
  { day: 'T', level: 3 },
  { day: 'W', level: 2 },
  { day: 'T', level: 3 },
  { day: 'F', level: 1 },
  { day: 'S', level: 0 },
  { day: 'S', level: 3 },
]

export type Badge = {
  name: string
  icon: LucideIcon
  unlocked: boolean
}

export const badges: Badge[] = [
  { name: 'First Commit', icon: GitCommit, unlocked: true },
  { name: '7-Day Flame', icon: Flame, unlocked: true },
  { name: 'Fast Starter', icon: Rocket, unlocked: true },
  { name: 'Sharpshooter', icon: Target, unlocked: true },
  { name: '30-Day Forge', icon: Award, unlocked: false },
  { name: 'Top 10', icon: Trophy, unlocked: false },
  { name: 'Forgemaster', icon: Crown, unlocked: false },
]

export type Activity = {
  icon: LucideIcon
  label: string
  meta: string
  time: string
}

export const recentActivity: Activity[] = [
  { icon: Zap, label: 'Completed “Flexbox Gallery”', meta: '+120 XP', time: '2h ago' },
  { icon: Share2, label: 'Posted your win on LinkedIn', meta: '+20 XP', time: '2h ago' },
  { icon: Flame, label: 'Extended streak to 23 days', meta: 'Day 23', time: '2h ago' },
  { icon: Snowflake, label: 'Earned a streak freeze', meta: 'x2 saved', time: '1d ago' },
]

export const quotes = [
  'Small commits, compounded daily, become a career.',
  'You don’t have to be extreme, just consistent.',
  'The chain is only as strong as today’s link.',
  'Ship the mission. Momentum handles the rest.',
]
