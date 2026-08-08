'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, CheckCircle2, Zap } from 'lucide-react'
import type { Badge } from '@/lib/mission-data'

type BadgeModalProps = {
  badge: Badge | null
  onClose: () => void
}

export function BadgeModal({ badge, onClose }: BadgeModalProps) {
  if (!badge) return null

  const Icon = badge.icon

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl"
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center text-center">
            {/* Badge Icon Container */}
            <div
              className={`relative flex h-24 w-24 items-center justify-center rounded-3xl border-2 transition-transform ${
                badge.unlocked
                  ? 'border-ember/50 bg-gradient-to-br from-ember/30 via-card to-card text-ember glow-ember'
                  : 'border-border bg-secondary/80 text-muted-foreground grayscale'
              }`}
            >
              <Icon className="h-12 w-12" />
              {!badge.unlocked && (
                <div className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-secondary text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
              {badge.name}
            </h3>

            {/* Status Pill */}
            <div className="mt-2 flex items-center gap-1.5">
              {badge.unlocked ? (
                <span className="flex items-center gap-1 rounded-full bg-ember/20 px-3 py-1 text-xs font-semibold text-ember">
                  <CheckCircle2 className="h-3.5 w-3.5 text-ember" />
                  {badge.earnedInfo}
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  {badge.earnedInfo}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground text-pretty">
              {badge.description}
            </p>

            {/* XP Bonus */}
            <div className="mt-4 flex w-full items-center justify-between rounded-2xl border border-border bg-secondary/40 px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Bonus XP</span>
              <span className="flex items-center gap-1 text-xs font-bold text-ember">
                <Zap className="h-3.5 w-3.5 fill-ember text-ember" />
                +{badge.xpBonus} XP
              </span>
            </div>

            {/* Action */}
            <button
              onClick={onClose}
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-xs font-bold text-primary-foreground glow-ember transition-transform active:scale-[0.98] cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
