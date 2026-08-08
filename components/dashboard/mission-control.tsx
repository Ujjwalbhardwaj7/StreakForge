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
import { BottomNav, type TabId } from './bottom-nav'
import { MissionsTab, LeaderboardTab, ProfileTab } from './tabs'
import { DashboardSkeleton } from './skeletons'
import { quotes } from '@/lib/mission-data'

import { BrandWatermarkReveal } from '@/components/ui/brand-watermark-reveal'

export function MissionControl() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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

  const homeCards = [
    { component: StreakCard, id: 'streak' },
    { component: ProgressCard, id: 'progress' },
    { component: StatsRow, id: 'stats' },
    { component: MissionCard, id: 'mission' },
    { component: AICoachCard, id: 'ai-coach' },
    { component: HeatmapCard, id: 'heatmap' },
    { component: BadgesRow, id: 'badges' },
    { component: ActivityCard, id: 'activity' },
    { component: LeaderboardCard, id: 'leaderboard' },
  ]

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <main className="mx-auto max-w-md px-4 pb-28 pt-6">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="space-y-4">
            {activeTab === 'home' && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <WelcomeHeader onTabChange={handleTabChange} />
                </motion.div>

                {homeCards.map(({ component: Card, id }, i) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Card onTabChange={handleTabChange} />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.08 + homeCards.length * 0.07, duration: 0.6 }}
                >
                  <QuoteCard quote={quote} />
                </motion.div>
              </>
            )}

            {activeTab === 'missions' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <MissionsTab />
              </motion.div>
            )}

            {activeTab === 'leaderboard' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <LeaderboardTab />
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProfileTab />
              </motion.div>
            )}

            {/* End-of-Page Cinematic Brand Reveal Watermark */}
            <BrandWatermarkReveal appName="STREAKFORGE" />
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

