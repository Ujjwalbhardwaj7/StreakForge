'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  WelcomeHeader,
  StreakCard,
  ProgressCard,
  StatsRow,
  MissionCard,
  HeatmapCard,
  BadgesRow,
  ActivityCard,
  LeaderboardCard,
  QuoteCard,
} from './cards'
import { AICoachCard } from './ai-coach-card'
import { BottomNav } from './bottom-nav'
import { DashboardSkeleton } from './skeletons'
import { quotes } from '@/lib/mission-data'

const cards = [
  StreakCard,
  ProgressCard,
  StatsRow,
  MissionCard,
  AICoachCard,
  HeatmapCard,
  BadgesRow,
  ActivityCard,
  LeaderboardCard,
]

export function MissionControl() {
  const [loading, setLoading] = useState(true)
  // Rotate the quote by day-of-year so it changes daily.
  const quote =
    quotes[
      Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
          86400000,
      ) % quotes.length
    ]

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="mx-auto min-h-dvh max-w-md px-4 pb-28 pt-6">
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <WelcomeHeader />
          </motion.div>

          {cards.map((Card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.08 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 + cards.length * 0.07, duration: 0.6 }}
          >
            <QuoteCard quote={quote} />
          </motion.div>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
