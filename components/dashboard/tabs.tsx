'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Lock,
  Flame,
  Search,
  Trophy,
  Zap,
  Award,
  ExternalLink,
  Shield,
  Snowflake,
  Star,
  ChevronRight,
  Clock,
  Crown,
} from 'lucide-react'
import {
  allMissions,
  leaderboardData,
  student,
  badges,
  studentProjects,
  type MissionItem,
  type Badge,
} from '@/lib/mission-data'
import { BadgeModal } from './badge-modal'

/* 1. MISSIONS CATALOG TAB */
export function MissionsTab() {
  const [filterTrack, setFilterTrack] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const tracks = ['All', 'Frontend', 'Core JS', 'React', 'TypeScript', 'Fullstack']

  const filteredMissions = allMissions.filter((m) => {
    const matchesTrack = filterTrack === 'All' || m.track === filterTrack
    const matchesQuery =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.track.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTrack && matchesQuery
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">60-Day Mission Catalog</h2>
        <p className="text-xs text-muted-foreground">Track your progress day by day from Day 1 to Day 60.</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search missions, topics, or tracks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-border bg-card py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-ember focus:outline-none"
        />
      </div>

      {/* Track Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {tracks.map((t) => (
          <button
            key={t}
            onClick={() => setFilterTrack(t)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filterTrack === t
                ? 'bg-ember text-ember-foreground font-bold'
                : 'bg-card text-muted-foreground hover:bg-secondary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Mission List */}
      <div className="space-y-2.5">
        {filteredMissions.map((m) => (
          <MissionListItem key={m.day} mission={m} />
        ))}
      </div>
    </div>
  )
}

function MissionListItem({ mission }: { mission: MissionItem }) {
  const isCompleted = mission.status === 'completed'
  const isCurrent = mission.status === 'current'

  const content = (
    <div
      className={`group relative flex items-center justify-between rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
        isCurrent
          ? 'border-ember/40 bg-gradient-to-r from-ember/15 to-violet/10 glow-ember hover:border-ember/70'
          : isCompleted
          ? 'border-border/60 bg-card/60 hover:border-border hover:bg-card'
          : 'border-border/30 bg-card/30 opacity-70 hover:opacity-100 hover:border-border/60'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold transition-transform group-hover:scale-110 ${
            isCurrent
              ? 'bg-ember text-ember-foreground'
              : isCompleted
              ? 'bg-accent/20 text-accent'
              : 'bg-secondary text-muted-foreground'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : isCurrent ? (
            <span>{mission.day}</span>
          ) : (
            <Lock className="h-4 w-4" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Day {mission.day} • {mission.track}
            </span>
            {isCurrent && (
              <span className="rounded-full bg-ember/20 px-2 py-0.5 text-[9px] font-bold text-ember">
                TODAY
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-ember">
            {mission.title}
          </h3>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {mission.estMinutes} min
            </span>
            <span className="flex items-center gap-1 font-medium text-ember">
              <Zap className="h-3 w-3" /> +{mission.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-ember" />
    </div>
  )

  if (isCurrent || isCompleted) {
    return <Link href="/mission" className="block">{content}</Link>
  }
  return content
}

/* 2. LEADERBOARD TAB */
export function LeaderboardTab() {
  const [sortBy, setSortBy] = useState<'streak' | 'xp' | 'longest'>('streak')

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortBy === 'streak') return b.streak - a.streak
    if (sortBy === 'xp') return b.xp - a.xp
    return b.longestStreak - a.longestStreak
  })

  const top3 = sortedData.slice(0, 3)
  const rest = sortedData.slice(3)

  const heatTileStyles = [
    'bg-secondary/50 border border-border/30',
    'bg-ember/30 border border-ember/40',
    'bg-ember/65 border border-ember/70',
    'bg-ember glow-ember border border-ember',
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Streak Leaderboard</h2>
          <p className="text-xs text-muted-foreground">Batch #14 • GitHub Contribution Grids</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-ember/15 px-2.5 py-1 text-[11px] font-bold text-ember border border-ember/30">
          <Flame className="h-3.5 w-3.5 fill-ember" /> Active Sprint
        </span>
      </div>

      {/* Sort Filter Pills */}
      <div className="flex items-center gap-1.5 rounded-2xl bg-card p-1 border border-border">
        <button
          onClick={() => setSortBy('streak')}
          className={`flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
            sortBy === 'streak'
              ? 'bg-ember text-ember-foreground shadow'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Flame className="h-3.5 w-3.5" />
          Active Streak
        </button>
        <button
          onClick={() => setSortBy('xp')}
          className={`flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
            sortBy === 'xp'
              ? 'bg-ember text-ember-foreground shadow'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap className="h-3.5 w-3.5" />
          Weekly XP
        </button>
        <button
          onClick={() => setSortBy('longest')}
          className={`flex flex-1 items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
            sortBy === 'longest'
              ? 'bg-ember text-ember-foreground shadow'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Trophy className="h-3.5 w-3.5" />
          Best Streak
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {/* 2nd Place */}
        <div className="flex flex-col items-center justify-end rounded-2xl border border-border bg-card/60 p-3 text-center transition-all hover:-translate-y-1 hover:border-border cursor-pointer">
          <div className="relative mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground ring-2 ring-muted-foreground">
              {top3[1]?.avatar}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-muted-foreground text-[9px] font-bold text-background">
              2
            </span>
          </div>
          <span className="text-xs font-bold text-foreground truncate max-w-full">{top3[1]?.name.split(' ')[0]}</span>
          <span className="flex items-center gap-0.5 text-[10px] font-bold text-ember">
            <Flame className="h-3 w-3 fill-ember" /> {top3[1]?.streak}d
          </span>

          {/* Mini 7-day Heatmap Preview */}
          <div className="mt-2 flex gap-0.5">
            {top3[1]?.contributionGrid.slice(7).map((level, idx) => (
              <span key={idx} className={`h-2 w-2 rounded-xs ${heatTileStyles[level]}`} />
            ))}
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center justify-end rounded-2xl border border-ember/50 bg-gradient-to-b from-ember/20 via-card to-card p-3.5 text-center glow-ember -translate-y-2 transition-all hover:-translate-y-3 cursor-pointer">
          <Crown className="mb-1 h-5 w-5 text-ember animate-bounce" />
          <div className="relative mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember text-sm font-bold text-ember-foreground ring-2 ring-ember">
              {top3[0]?.avatar}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ember text-[9px] font-bold text-ember-foreground">
              1
            </span>
          </div>
          <span className="text-xs font-extrabold text-foreground truncate max-w-full">{top3[0]?.name.split(' ')[0]}</span>
          <span className="flex items-center gap-0.5 text-[11px] font-extrabold text-ember">
            <Flame className="h-3.5 w-3.5 fill-ember" /> {top3[0]?.streak}d
          </span>

          {/* Mini 7-day Heatmap Preview */}
          <div className="mt-2 flex gap-0.5">
            {top3[0]?.contributionGrid.slice(7).map((level, idx) => (
              <span key={idx} className={`h-2.5 w-2.5 rounded-xs ${heatTileStyles[level]}`} />
            ))}
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center justify-end rounded-2xl border border-border bg-card/60 p-3 text-center transition-all hover:-translate-y-1 hover:border-border cursor-pointer">
          <div className="relative mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground ring-2 ring-accent/40">
              {top3[2]?.avatar}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent/60 text-[9px] font-bold text-background">
              3
            </span>
          </div>
          <span className="text-xs font-bold text-foreground truncate max-w-full">{top3[2]?.name.split(' ')[0]}</span>
          <span className="flex items-center gap-0.5 text-[10px] font-bold text-ember">
            <Flame className="h-3 w-3 fill-ember" /> {top3[2]?.streak}d
          </span>

          {/* Mini 7-day Heatmap Preview */}
          <div className="mt-2 flex gap-0.5">
            {top3[2]?.contributionGrid.slice(7).map((level, idx) => (
              <span key={idx} className={`h-2 w-2 rounded-xs ${heatTileStyles[level]}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Rankings List with Contribution Heatmap Grid */}
      <div className="space-y-2">
        {rest.map((user, idx) => (
          <div
            key={user.handle}
            className={`group flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-200 cursor-pointer ${
              user.isCurrentUser
                ? 'border-ember/60 bg-ember/15 glow-ember hover:border-ember'
                : 'border-border/40 bg-card/40 hover:bg-card hover:border-border/80 hover:-translate-y-0.5'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-5 text-center font-display text-xs font-bold ${user.isCurrentUser ? 'text-ember' : 'text-muted-foreground'}`}>
                #{idx + 4}
              </span>
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${user.isCurrentUser ? 'bg-ember text-ember-foreground' : 'bg-secondary text-foreground'}`}>
                {user.avatar}
              </div>
              <div className="min-w-0">
                <h4 className={`text-xs font-bold truncate ${user.isCurrentUser ? 'text-ember' : 'text-foreground'}`}>
                  {user.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{user.handle}</span>
                  <span className="text-[10px] font-semibold text-ember">Lvl {user.level}</span>
                </div>
              </div>
            </div>

            {/* Streak Grid + Flame Info */}
            <div className="flex items-center gap-3 shrink-0">
              {/* GitHub-style Mini Heatmap Grid (7 Days) */}
              <div className="flex items-center gap-1 bg-background/50 px-2 py-1.5 rounded-xl border border-border/40">
                <div className="flex gap-0.5">
                  {user.contributionGrid.slice(7).map((level, i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-2.5 rounded-xs transition-transform group-hover:scale-110 ${heatTileStyles[level]}`}
                    />
                  ))}
                </div>
              </div>

              {/* Flame Streak badge */}
              <div className="flex flex-col items-end">
                <span className="flex items-center gap-1 text-xs font-bold text-foreground">
                  <Flame className="h-3.5 w-3.5 fill-ember text-ember" />
                  {user.streak}d
                </span>
                <span className="text-[10px] font-semibold text-ember">+{user.xp} XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 3. STUDENT PROFILE TAB */
export function ProfileTab() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  return (
    <>
      <div className="space-y-5">
        {/* Header Profile Card */}
        <div className="relative overflow-hidden rounded-3xl border border-ember/30 bg-gradient-to-br from-ember/15 via-card to-violet/10 p-6 glow-ember">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ember text-xl font-extrabold text-ember-foreground ring-4 ring-ember/30 shadow-lg">
              {student.avatarInitials}
            </div>
            <div>
              <h2 className="font-display text-xl font-extrabold text-foreground">{student.name}</h2>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="rounded-full bg-ember/20 px-2.5 py-0.5 text-[10px] font-bold text-ember">
                  Lvl {student.level} • {student.levelTitle}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{student.cohort}</p>
            </div>
          </div>

          {/* Level XP Bar */}
          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Level Progress</span>
              <span className="text-ember font-bold">{student.xp} / {student.xpToNextLevel} XP</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ember to-violet"
                style={{ width: `${Math.round((student.xp / student.xpToNextLevel) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Current Streak</span>
              <Flame className="h-4 w-4 text-ember" />
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-foreground">{student.streak} Days</div>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
              <Snowflake className="h-3 w-3 text-violet" /> {student.streakFreezes} freezes saved
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Cohort Rank</span>
              <Trophy className="h-4 w-4 text-ember" />
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-foreground">#{student.rank}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">Top 4% of {student.rankTotal} builders</div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-foreground">Unlocked Achievements</h3>
            <span className="text-xs text-muted-foreground">Tap any badge for details</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {badges.map((b) => (
              <div
                key={b.name}
                onClick={() => setSelectedBadge(b)}
                className={`flex items-center gap-3 rounded-2xl border p-3 transition-all duration-200 cursor-pointer hover:scale-[1.02] ${
                  b.unlocked
                    ? 'border-ember/30 bg-card hover:border-ember/60 hover:shadow-[0_0_16px_oklch(0.64_0.27_290/30%)]'
                    : 'border-border/30 bg-card/30 opacity-70 hover:opacity-100 hover:border-border'
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform ${
                    b.unlocked
                      ? 'bg-ember/15 text-ember'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-foreground truncate">{b.name}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {b.unlocked ? 'Unlocked' : 'Locked'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Submitted Projects */}
      <div className="space-y-3">
        <h3 className="font-display text-sm font-bold text-foreground">Submitted Work</h3>
        <div className="space-y-2">
          {studentProjects.map((p) => (
            <div key={p.day} className="flex items-center justify-between rounded-2xl border border-border bg-card p-3.5">
              <div>
                <span className="text-[10px] font-semibold text-ember">Day {p.day} Mission</span>
                <h4 className="text-xs font-bold text-foreground">{p.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded-xl bg-secondary px-2.5 py-1.5 text-[11px] font-medium text-foreground hover:bg-ember/20 hover:text-ember"
                >
                  GitHub <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
  </>
)
}
