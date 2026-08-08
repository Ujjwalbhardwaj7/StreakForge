'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame, Snowflake, TrendingUp, Calendar } from 'lucide-react'
import { student } from '@/lib/mission-data'

type StreakGraphModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function StreakGraphModal({ isOpen, onClose }: StreakGraphModalProps) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(0)

  if (!isOpen) return null

  // Graph data points representing streak progression & activity
  const dataPoints = [
    { day: 'Day 1', xp: 50, date: 'Jul 17', label: 'Streak started' },
    { day: 'Day 5', xp: 45, date: 'Jul 21', label: 'Core JS sprint' },
    { day: 'Day 10', xp: 22, date: 'Jul 26', label: 'Freeze token used' },
    { day: 'Day 15', xp: 18, date: 'Jul 31', label: 'React Hooks mission' },
    { day: 'Day 20', xp: 12, date: 'Aug 5', label: 'TypeScript challenge' },
    { day: 'Day 23', xp: 8, date: 'Today', label: 'Streak active' },
  ]

  // Graph point coordinates (320x160 viewBox)
  const points = [
    { x: 30, y: 20 },
    { x: 80, y: 35 },
    { x: 135, y: 95 },
    { x: 190, y: 110 },
    { x: 240, y: 125 },
    { x: 290, y: 135 },
  ]

  // Cubic Bezier curve path string
  const svgPath = `M ${points[0].x} ${points[0].y} ` +
    `C 70 22, 100 70, ${points[2].x} ${points[2].y} ` +
    `S 240 120, ${points[5].x} ${points[5].y}`

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-xl"
        >
          {/* Header section matching screenshot design */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-foreground">
                  {student.streak}
                </span>
                <Flame className="h-6 w-6 fill-ember text-ember animate-pulse" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">day streak</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close streak graph"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SVG Line Graph Container */}
          <div className="relative mt-6 rounded-2xl border border-border/60 bg-background/60 p-4">
            <div className="relative h-44 w-full">
              <svg viewBox="0 0 320 160" className="h-full w-full overflow-visible">
                <defs>
                  {/* Glowing line gradient */}
                  <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>

                  {/* Area fill gradient */}
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </linearGradient>

                  {/* Glow Filter */}
                  <filter id="streakGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="25" y1="20" x2="300" y2="20" stroke="currentColor" className="text-border/40" strokeWidth="1" />
                <line x1="25" y1="80" x2="300" y2="80" stroke="currentColor" className="text-border/40" strokeWidth="1" />
                <line x1="25" y1="140" x2="300" y2="140" stroke="currentColor" className="text-border/40" strokeWidth="1" />

                {/* Vertical Dashed Guide Line */}
                <line x1="135" y1="20" x2="135" y2="140" stroke="currentColor" className="text-border/70" strokeDasharray="4 4" strokeWidth="1.2" />

                {/* Y-Axis Labels */}
                <text x="306" y="24" className="text-[11px] font-semibold fill-muted-foreground">50</text>
                <text x="306" y="84" className="text-[11px] font-semibold fill-muted-foreground">25</text>
                <text x="306" y="144" className="text-[11px] font-semibold fill-muted-foreground">0</text>

                {/* Area under curve */}
                <path
                  d={`${svgPath} L 290 140 L 30 140 Z`}
                  fill="url(#areaGradient)"
                />

                {/* Glowing Curved Line */}
                <path
                  d={svgPath}
                  fill="none"
                  stroke="url(#streakGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#streakGlow)"
                />

                {/* Interactive Data Nodes */}
                {points.map((pt, idx) => {
                  const isSelected = activePointIndex === idx
                  return (
                    <g key={idx} className="cursor-pointer" onClick={() => setActivePointIndex(idx)}>
                      {/* Touch Area */}
                      <circle cx={pt.x} cy={pt.y} r="12" fill="transparent" />
                      
                      {/* Outer Ring */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? '6.5' : '4.5'}
                        fill="#090A0F"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        className="transition-all duration-200"
                      />
                      
                      {/* Center White Dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="1.8"
                        fill="#FFFFFF"
                      />
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Selected Node Tooltip Banner */}
            {activePointIndex !== null && (
              <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/60 p-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-ember" />
                  <span className="font-semibold text-foreground">
                    {dataPoints[activePointIndex].day} • {dataPoints[activePointIndex].date}
                  </span>
                </div>
                <span className="font-bold text-ember">
                  {dataPoints[activePointIndex].label}
                </span>
              </div>
            )}
          </div>

          {/* Bottom Summary Stats */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-secondary/30 p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-ember" />
                <span>Streak Momentum</span>
              </div>
              <p className="mt-1 font-display text-lg font-bold text-foreground">+23 Days Active</p>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/30 p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Snowflake className="h-3.5 w-3.5 text-violet" />
                <span>Streak Freezes</span>
              </div>
              <p className="mt-1 font-display text-lg font-bold text-foreground">
                {student.streakFreezes} Saved
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
