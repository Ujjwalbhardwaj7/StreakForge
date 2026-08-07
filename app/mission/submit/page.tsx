import type { Metadata } from 'next'
import { SubmissionFlow } from '@/components/mission/submission-flow'

export const metadata: Metadata = {
  title: 'Submit Mission · StreakForge',
  description: 'Push your code, share your win, and claim your XP.',
}

export default function SubmitMissionPage() {
  return <SubmissionFlow />
}
