'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { missionDetail } from '@/lib/mission-data'

export function Checklist({ onProgress }: { onProgress?: (done: number, total: number) => void }) {
  const items = missionDetail.checklist
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] }
    setChecked(next)
    onProgress?.(Object.values(next).filter(Boolean).length, items.length)
  }

  const doneCount = Object.values(checked).filter(Boolean).length

  return (
    <section className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Checklist</h3>
        <span className="text-xs font-medium text-muted-foreground">
          {doneCount}/{items.length} done
        </span>
      </div>

      <ul className="mt-4 space-y-1">
        {items.map((item) => {
          const isChecked = !!checked[item.id]
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                aria-pressed={isChecked}
                className="flex w-full items-center gap-3 rounded-2xl px-2 py-2.5 text-left transition-colors active:bg-secondary/60"
              >
                <span
                  className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
                    isChecked
                      ? 'border-ember bg-ember'
                      : 'border-border bg-transparent'
                  }`}
                >
                  <motion.span
                    initial={false}
                    animate={isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                  >
                    <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3.5} />
                  </motion.span>
                  {isChecked && (
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-lg bg-ember/40"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 2.1, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  )}
                </span>
                <span
                  className={`text-sm leading-snug transition-colors ${
                    isChecked
                      ? 'text-muted-foreground line-through'
                      : 'text-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
