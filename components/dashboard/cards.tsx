'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Flame,
  Snowflake,
  Zap,
  Trophy,
  Clock,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Lock,
} from 'lucide-react'
import {
  student,
  todayMission,
  coachInsight,
  weeklyHeat,
  badges,
  recentActivity,
  type Badge,
} from '@/lib/mission-data'
import { BadgeModal } from './badge-modal'
import { StreakGraphModal } from './streak-graph-modal'

/* 1. Welcome header */
export function WelcomeHeader({
  onTabChange,
}: {
  onTabChange?: (tab: 'home' | 'missions' | 'leaderboard' | 'profile') => void
}) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          Welcome back, {student.name}
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">{date}</p>
      </div>
      <button
        onClick={() => onTabChange?.('profile')}
        title="View Profile"
        aria-label="View Profile"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-border/40 hover:ring-primary/60"
      >
        {student.avatarInitials}
      </button>
    </header>
  )
}

/* 2. Streak card */
export function StreakCard() {
  return (
    <div className="card-hover group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-ember/15 via-card to-card p-6 cursor-pointer hover:border-ember/50">
      {/* ambient flame glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.12),transparent)] blur-xl [animation:flamePulse_3.5s_ease-in-out_infinite] group-hover:scale-125 transition-transform duration-500" />

      <div className="relative flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ember">
          Current streak
        </span>
        <span className="flex items-center gap-1 rounded-full bg-background/60 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur transition-transform group-hover:scale-105">
          <Snowflake className="h-3.5 w-3.5 text-foreground" />
          {student.streakFreezes} freezes
        </span>
      </div>

      <div className="relative mt-2 flex items-end gap-3">
        <Flame className="mb-2 h-12 w-12 fill-ember text-ember drop-shadow-[0_0_12px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-110" />
        <span className="font-display text-7xl font-extrabold leading-none text-foreground">
          {student.streak}
        </span>
        <span className="mb-2 text-lg font-bold text-ember">days</span>
      </div>

      <p className="relative mt-4 text-sm text-muted-foreground">
        You&apos;re on fire. <span className="font-semibold text-foreground">Don&apos;t break the chain</span> — one mission keeps it alive today.
      </p>
    </div>
  )
}

/* 3. Progress toward day 60 */
export function ProgressCard({
  onTabChange,
}: {
  onTabChange?: (tab: 'home' | 'missions' | 'leaderboard' | 'profile') => void
}) {
  const pct = Math.round((student.day / student.totalDays) * 100)
  const segments = 60
  return (
    <div className="card-hover rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Journey to Day 60</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {student.totalDays - student.day} days to go — keep forging
          </p>
        </div>
        {onTabChange ? (
          <button
            onClick={() => onTabChange('missions')}
            className="flex items-center gap-1 font-display text-sm font-bold text-ember hover:underline cursor-pointer transition-transform hover:scale-105"
          >
            Day {student.day}/{student.totalDays}
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <span className="font-display text-lg font-bold text-ember">
            Day {student.day}
            <span className="text-sm text-muted-foreground">/{student.totalDays}</span>
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-[3px]">
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-full transition-transform hover:scale-y-125 ${i < student.day
                ? 'bg-gradient-to-b from-ember to-ember/70'
                : 'bg-secondary'
              } ${i === student.day - 1 ? 'glow-ember' : ''}`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
        {onTabChange && (
          <button
            onClick={() => onTabChange('missions')}
            className="text-ember hover:underline cursor-pointer transition-colors hover:text-ember-foreground"
          >
            View 60-day catalog →
          </button>
        )}
        <span className="ml-auto">{pct}% complete</span>
      </div>
    </div>
  )
}

/* 4. XP + Rank row */
export function StatsRow({
  onTabChange,
}: {
  onTabChange?: (tab: 'home' | 'missions' | 'leaderboard' | 'profile') => void
}) {
  const xpPct = Math.round((student.xp / student.xpToNextLevel) * 100)
  return (
    <div className="grid grid-cols-2 gap-4">
      <div
        onClick={() => onTabChange?.('profile')}
        className={`card-hover rounded-3xl border border-border bg-card p-5 ${onTabChange
            ? 'cursor-pointer active:scale-[0.98]'
            : ''
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember/15 text-ember transition-transform group-hover:scale-110">
            <Zap className="h-5 w-5" />
          </div>
          {onTabChange && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
        <p className="mt-3 font-display text-2xl font-bold text-foreground">
          {student.xp.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">Total XP</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${xpPct}%` }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Lv {student.level} · {student.levelTitle}
        </p>
      </div>

      <div
        onClick={() => onTabChange?.('leaderboard')}
        className={`card-hover rounded-3xl border border-border bg-card p-5 ${onTabChange
            ? 'cursor-pointer active:scale-[0.98]'
            : ''
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Trophy className="h-5 w-5" />
          </div>
          {onTabChange && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
        <p className="mt-3 font-display text-2xl font-bold text-foreground">
          #{student.rank}
        </p>
        <p className="text-xs text-muted-foreground">Cohort rank</p>
        <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-ember">
          <ArrowUpRight className="h-3.5 w-3.5" />
          Up 4 this week
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          of {student.rankTotal} builders
        </p>
      </div>
    </div>
  )
}

/* 5. Today's mission */
const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-primary/15 text-primary',
  Intermediate: 'bg-ember/15 text-ember',
  Advanced: 'bg-destructive/15 text-destructive',
}

export function MissionCard({
  onTabChange,
}: {
  onTabChange?: (tab: 'home' | 'missions' | 'leaderboard' | 'profile') => void
}) {
  return (
    <div className="card-hover relative overflow-hidden rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ember">
            Today&apos;s mission
          </span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {todayMission.track}
          </span>
        </div>
        {onTabChange && (
          <button
            onClick={() => onTabChange('missions')}
            className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-ember cursor-pointer transition-colors"
          >
            All Missions
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <h2 className="mt-2 font-display text-xl font-bold text-foreground text-balance">
        {todayMission.title}
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${difficultyStyles[todayMission.difficulty]}`}
        >
          {todayMission.difficulty}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {todayMission.estMinutes} min
        </span>
        <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-ember" />+{todayMission.xpReward} XP
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <Link
          href="/mission"
          className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3.5 text-sm font-bold text-primary-foreground glow-hover glow-ember transition-all active:scale-[0.98]"
        >
          Start mission
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        {onTabChange && (
          <button
            onClick={() => onTabChange('missions')}
            className="flex items-center justify-center rounded-2xl border border-border bg-secondary px-4 py-3.5 text-xs font-semibold text-foreground hover:bg-secondary/80 hover:border-ember/40 cursor-pointer transition-all active:scale-[0.97]"
          >
            Catalog
          </button>
        )}
      </div>
    </div>
  )
}

/* 6. AI coach */
export function CoachCard() {
  return (
    <div className="card-hover glass relative overflow-hidden rounded-3xl border border-border p-5 hover:border-ember/40 cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent transition-transform hover:rotate-12">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-ember" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-foreground">Coach {coachInsight.name}</p>
            <span className="rounded-full bg-ember/15 px-2 py-0.5 text-[10px] font-semibold text-ember">
              AI
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            {coachInsight.message}
          </p>
        </div>
      </div>
    </div>
  )
}

/* 7. Weekly heatmap */
const heatStyles = [
  'bg-secondary',
  'bg-ember/30',
  'bg-ember/60',
  'bg-ember glow-ember',
]

export function HeatmapCard() {
  return (
    <div className="card-hover rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">This week</p>
        <p className="text-xs text-muted-foreground">6 of 7 days</p>
      </div>
      <div className="mt-4 flex justify-between gap-2">
        {weeklyHeat.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5 group cursor-pointer">
            <div
              className={`aspect-square w-full rounded-xl transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_12px_oklch(0.64_0.27_290/50%)] ${heatStyles[d.level]}`}
            />
            <span className="text-[11px] font-medium text-muted-foreground group-hover:text-ember">
              {d.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 8. Achievement badges */
export function BadgesRow({
  onTabChange,
}: {
  onTabChange?: (tab: 'home' | 'missions' | 'leaderboard' | 'profile') => void
}) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  return (
    <>
      <div className="card-hover rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Badges</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {badges.filter((b) => b.unlocked).length}/{badges.length} earned
            </span>
            {onTabChange && (
              <button
                onClick={() => onTabChange('profile')}
                className="flex items-center gap-0.5 text-xs font-semibold text-ember hover:underline cursor-pointer transition-colors"
              >
                View Profile <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
        <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {badges.map((b) => (
            <div
              key={b.name}
              onClick={() => setSelectedBadge(b)}
              className="group flex w-16 shrink-0 flex-col items-center gap-1.5 cursor-pointer"
            >
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 ${b.unlocked
                    ? 'border-ember/30 bg-gradient-to-br from-ember/20 via-card to-card text-ember group-hover:border-ember group-hover:shadow-[0_0_16px_rgba(74,104,69,0.3)]'
                    : 'border-border bg-secondary text-muted-foreground/40 grayscale group-hover:grayscale-0'
                  }`}
              >
                <b.icon className="h-6 w-6" />
                {!b.unlocked && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-secondary">
                    <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                  </span>
                )}
              </div>
              <span
                className={`text-center text-[10px] leading-tight transition-colors ${b.unlocked ? 'text-foreground group-hover:text-ember' : 'text-muted-foreground/60'
                  }`}
              >
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </>
  )
}

/* 9. Recent activity */
export function ActivityCard() {
  return (
    <div className="card-hover rounded-3xl border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">Recent activity</p>
      <ul className="mt-3 space-y-3">
        {recentActivity.map((a, i) => (
          <li key={i} className="flex items-center gap-3 p-1.5 rounded-xl transition-colors hover:bg-secondary/60 cursor-pointer">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-ember transition-transform hover:scale-110">
              <a.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {a.label}
              </p>
              <p className="text-[11px] text-muted-foreground">{a.meta}</p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">
              {a.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 10. Leaderboard position */
export function LeaderboardCard({
  onTabChange,
}: {
  onTabChange?: (tab: 'home' | 'missions' | 'leaderboard' | 'profile') => void
}) {
  return (
    <button
      onClick={() => onTabChange?.('leaderboard')}
      className="card-hover-violet flex w-full items-center gap-4 rounded-3xl border border-border bg-gradient-to-r from-violet/15 via-card to-card p-5 text-left transition-all active:scale-[0.99] cursor-pointer hover:border-violet/50"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet/20 text-violet transition-transform hover:scale-110">
        <Trophy className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="font-display text-lg font-bold text-foreground">
          You&apos;re #{student.rank} this week
        </p>
        <p className="text-xs text-muted-foreground">
          {student.cohort} · top {Math.round((student.rank / student.rankTotal) * 100)}%
        </p>
      </div>
      <span className="flex items-center gap-1 text-sm font-semibold text-violet group-hover:translate-x-1 transition-transform">
        Full Leaderboard
        <ChevronRight className="h-4 w-4" />
      </span>
    </button>
  )
}

/* 11. Motivational quote */
export function QuoteCard({ quote }: { quote: string }) {
  return (
    <div className="px-2 py-2 text-center">
      <p className="text-sm italic leading-relaxed text-muted-foreground text-pretty">
        “{quote}”
      </p>
    </div>
  )
}
