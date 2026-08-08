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
  description: string
  earnedInfo: string
  xpBonus: number
}

export const badges: Badge[] = [
  {
    name: 'First Commit',
    icon: GitCommit,
    unlocked: true,
    description: 'Successfully completed and submitted your very first mission proof to StreakForge.',
    earnedInfo: 'Earned on Day 1',
    xpBonus: 50,
  },
  {
    name: '7-Day Flame',
    icon: Flame,
    unlocked: true,
    description: 'Forged a continuous daily building streak for 7 consecutive days without breaking.',
    earnedInfo: 'Earned on Day 7',
    xpBonus: 150,
  },
  {
    name: 'Fast Starter',
    icon: Rocket,
    unlocked: true,
    description: 'Completed today’s mission requirement and submitted proof in under 20 minutes.',
    earnedInfo: 'Earned on Day 10',
    xpBonus: 100,
  },
  {
    name: 'Sharpshooter',
    icon: Target,
    unlocked: true,
    description: 'Passed automated code verification and AI review on your first attempt.',
    earnedInfo: 'Earned on Day 12',
    xpBonus: 200,
  },
  {
    name: '30-Day Forge',
    icon: Award,
    unlocked: false,
    description: 'Reach a 30-day continuous streak to prove ultimate consistency.',
    earnedInfo: 'Requires 30-day streak',
    xpBonus: 500,
  },
  {
    name: 'Top 10',
    icon: Trophy,
    unlocked: false,
    description: 'Rank in the Top 10 of your cohort on the weekly leaderboard.',
    earnedInfo: 'Requires Rank #1–#10',
    xpBonus: 300,
  },
  {
    name: 'Forgemaster',
    icon: Crown,
    unlocked: false,
    description: 'Complete all 60 daily missions in the full StreakForge curriculum.',
    earnedInfo: 'Requires Day 60 completion',
    xpBonus: 1000,
  },
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

export type MissionItem = {
  day: number
  title: string
  track: string
  difficulty: Difficulty
  estMinutes: number
  xpReward: number
  status: 'completed' | 'current' | 'locked'
}

export const allMissions: MissionItem[] = [
  { day: 1, title: 'HTML5 Semantic Layout & Accessibility', track: 'Frontend', difficulty: 'Beginner', estMinutes: 25, xpReward: 100, status: 'completed' },
  { day: 2, title: 'CSS Grid & Modern Flexbox Layouts', track: 'Frontend', difficulty: 'Beginner', estMinutes: 30, xpReward: 100, status: 'completed' },
  { day: 3, title: 'JavaScript ES6+ Array Manipulation', track: 'Core JS', difficulty: 'Beginner', estMinutes: 30, xpReward: 100, status: 'completed' },
  { day: 4, title: 'Async/Await & Fetch API Handler', track: 'Core JS', difficulty: 'Intermediate', estMinutes: 35, xpReward: 110, status: 'completed' },
  { day: 5, title: 'Build a Counter with LocalStorage Persist', track: 'Frontend', difficulty: 'Beginner', estMinutes: 25, xpReward: 100, status: 'completed' },
  { day: 10, title: 'React State Management & Reducer Pattern', track: 'React', difficulty: 'Intermediate', estMinutes: 40, xpReward: 120, status: 'completed' },
  { day: 15, title: 'TypeScript Interfaces & Generics Task', track: 'TypeScript', difficulty: 'Intermediate', estMinutes: 35, xpReward: 120, status: 'completed' },
  { day: 20, title: 'Custom React Form Validation Hook', track: 'React', difficulty: 'Intermediate', estMinutes: 35, xpReward: 120, status: 'completed' },
  { day: 23, title: 'Build a debounced search hook', track: 'Frontend', difficulty: 'Intermediate', estMinutes: 35, xpReward: 120, status: 'current' },
  { day: 24, title: 'Zustand Global State Store with Middleware', track: 'State', difficulty: 'Intermediate', estMinutes: 40, xpReward: 130, status: 'locked' },
  { day: 25, title: 'Next.js App Router Server Components', track: 'Fullstack', difficulty: 'Intermediate', estMinutes: 45, xpReward: 140, status: 'locked' },
  { day: 30, title: 'RESTful API Route Handlers in Next.js', track: 'Backend', difficulty: 'Intermediate', estMinutes: 45, xpReward: 140, status: 'locked' },
  { day: 35, title: 'Authentication with JWT & Middleware', track: 'Security', difficulty: 'Advanced', estMinutes: 50, xpReward: 150, status: 'locked' },
  { day: 40, title: 'PostgreSQL Database Queries with Prisma', track: 'Database', difficulty: 'Advanced', estMinutes: 55, xpReward: 160, status: 'locked' },
  { day: 50, title: 'Realtime WebSockets Chat Engine', track: 'Fullstack', difficulty: 'Advanced', estMinutes: 60, xpReward: 180, status: 'locked' },
  { day: 60, title: 'Capstone: Ship Fullstack SaaS App', track: 'Fullstack', difficulty: 'Advanced', estMinutes: 90, xpReward: 300, status: 'locked' },
]

export type LeaderboardEntry = {
  rank: number
  name: string
  handle: string
  avatar: string
  streak: number
  longestStreak: number
  xp: number
  level: number
  badgeCount: number
  contributionGrid: number[]
  isCurrentUser?: boolean
}

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'Elena Rostova', handle: '@elena_dev', avatar: 'ER', streak: 58, longestStreak: 58, xp: 7420, level: 18, badgeCount: 14, contributionGrid: [3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3] },
  { rank: 2, name: 'Marcus Chen', handle: '@marcus_c', avatar: 'MC', streak: 54, longestStreak: 54, xp: 6890, level: 16, badgeCount: 12, contributionGrid: [3, 2, 3, 3, 3, 2, 3, 3, 3, 1, 3, 3, 3, 3] },
  { rank: 3, name: 'Sophia Al-Mansoor', handle: '@sophia_builds', avatar: 'SA', streak: 49, longestStreak: 49, xp: 6240, level: 15, badgeCount: 11, contributionGrid: [3, 3, 2, 3, 3, 3, 0, 3, 3, 3, 2, 3, 3, 3] },
  { rank: 4, name: 'Liam O’Connor', handle: '@liam_oc', avatar: 'LO', streak: 45, longestStreak: 48, xp: 5780, level: 14, badgeCount: 10, contributionGrid: [2, 3, 3, 3, 1, 3, 3, 3, 3, 2, 3, 3, 0, 3] },
  { rank: 5, name: 'Devon Vance', handle: '@devon_v', avatar: 'DV', streak: 41, longestStreak: 41, xp: 5210, level: 13, badgeCount: 9, contributionGrid: [3, 3, 1, 3, 3, 3, 3, 0, 3, 3, 2, 3, 3, 3] },
  { rank: 6, name: 'Ananya Sharma', handle: '@ananya_code', avatar: 'AS', streak: 38, longestStreak: 40, xp: 4850, level: 12, badgeCount: 9, contributionGrid: [3, 2, 3, 3, 3, 3, 2, 3, 3, 1, 3, 3, 3, 3] },
  { rank: 7, name: 'Kai Takahashi', handle: '@kai_t', avatar: 'KT', streak: 35, longestStreak: 35, xp: 4400, level: 11, badgeCount: 8, contributionGrid: [2, 3, 3, 1, 3, 3, 3, 3, 2, 3, 3, 0, 3, 3] },
  { rank: 8, name: 'Chloe Dubois', handle: '@chloe_d', avatar: 'CD', streak: 31, longestStreak: 31, xp: 3950, level: 10, badgeCount: 7, contributionGrid: [3, 3, 3, 3, 0, 3, 3, 2, 3, 3, 3, 3, 1, 3] },
  { rank: 9, name: 'Mateo Rossi', handle: '@mateo_r', avatar: 'MR', streak: 28, longestStreak: 32, xp: 3510, level: 9, badgeCount: 7, contributionGrid: [3, 1, 3, 3, 3, 2, 3, 3, 3, 3, 0, 3, 3, 3] },
  { rank: 10, name: 'Zoe Kravitz', handle: '@zoe_k', avatar: 'ZK', streak: 26, longestStreak: 26, xp: 3200, level: 8, badgeCount: 6, contributionGrid: [2, 3, 3, 3, 3, 1, 3, 3, 2, 3, 3, 3, 3, 3] },
  { rank: 11, name: 'Lucas Silva', handle: '@lucas_s', avatar: 'LS', streak: 24, longestStreak: 28, xp: 2980, level: 8, badgeCount: 6, contributionGrid: [3, 3, 0, 3, 3, 3, 2, 3, 3, 3, 1, 3, 3, 3] },
  { rank: 12, name: 'Aarav (You)', handle: '@aarav_forge', avatar: 'AR', streak: 23, longestStreak: 23, xp: 2760, level: 7, badgeCount: 4, isCurrentUser: true, contributionGrid: [3, 3, 2, 3, 1, 0, 3, 3, 3, 3, 2, 3, 3, 3] },
  { rank: 13, name: 'Maya Patel', handle: '@maya_p', avatar: 'MP', streak: 21, longestStreak: 25, xp: 2540, level: 6, badgeCount: 4, contributionGrid: [3, 1, 3, 3, 3, 3, 2, 0, 3, 3, 3, 2, 3, 3] },
  { rank: 14, name: 'Julian Vance', handle: '@julian_v', avatar: 'JV', streak: 19, longestStreak: 22, xp: 2310, level: 6, badgeCount: 3, contributionGrid: [2, 3, 3, 3, 1, 3, 3, 3, 2, 3, 0, 3, 3, 3] },
  { rank: 15, name: 'Nora Lindqvist', handle: '@nora_l', avatar: 'NL', streak: 17, longestStreak: 20, xp: 2100, level: 5, badgeCount: 3, contributionGrid: [3, 3, 2, 3, 3, 0, 3, 3, 1, 3, 3, 3, 2, 3] },
]

export const studentProjects = [
  { day: 22, title: 'Flexbox Gallery', githubUrl: 'https://github.com/aarav/flexbox-gallery', linkedinUrl: 'https://linkedin.com/posts/aarav-gallery', xp: 140 },
  { day: 21, title: 'Async Fetch Hook', githubUrl: 'https://github.com/aarav/async-fetch-hook', linkedinUrl: 'https://linkedin.com/posts/aarav-async', xp: 120 },
  { day: 20, title: 'Form Validation', githubUrl: 'https://github.com/aarav/form-validation', linkedinUrl: 'https://linkedin.com/posts/aarav-form', xp: 120 },
]
