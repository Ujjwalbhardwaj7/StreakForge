import type { Metadata } from 'next'
import { MissionDetail } from '@/components/mission/mission-detail'
import { missionDetail } from '@/lib/mission-data'

export const metadata: Metadata = {
  title: `${missionDetail.title} — StreakForge`,
  description: missionDetail.learningOutcome,
}

export default function MissionPage() {
  return <MissionDetail />
}
