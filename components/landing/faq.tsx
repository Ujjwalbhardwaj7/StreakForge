'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need to be an experienced developer?',
    a: 'Not at all. You pick a track and a difficulty, and daily missions scale to your level. Complete beginners and career switchers make up a huge part of every cohort.',
  },
  {
    q: 'How much time does it take each day?',
    a: 'Most missions take 30–60 minutes, including shipping your code and posting your win. The whole point is that it’s small enough to do every single day.',
  },
  {
    q: 'What if I miss a day?',
    a: 'Life happens. You get freeze tokens that protect your streak for planned breaks, and the AI coach helps you get back on track without guilt spirals.',
  },
  {
    q: 'Do I really have to post on LinkedIn?',
    a: 'It’s strongly encouraged, not forced. Public accountability is what makes streaks stick — and students consistently tell us the daily posts are what got recruiters into their DMs.',
  },
  {
    q: 'Will this actually help me get hired?',
    a: 'StreakForge builds the three things recruiters look for: a real portfolio of shipped work, a growing public presence, and 60 days of proof that you show up. It’s not magic — it’s reps.',
  },
  {
    q: 'Is it free to start?',
    a: 'Yes. You can start your first cohort free with no card required. Paid plans unlock the AI coach, private pods, and advanced tracks.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-ember">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Questions, answered
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-foreground">
                    {f.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-ember transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground text-pretty">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
