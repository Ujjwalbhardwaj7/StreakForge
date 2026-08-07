import type { Metadata } from 'next'
import { MissionControl } from '@/components/dashboard/mission-control'

export const metadata: Metadata = {
  title: 'Mission Control — StreakForge',
  description:
    'Your daily home base: streak, today’s mission, XP, badges, and cohort rank.',
}

export default function DashboardPage() {
  return <MissionControl />
}
