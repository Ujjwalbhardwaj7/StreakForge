'use client'

import { motion } from 'framer-motion'
import { Flame, Zap, Award, Trophy, Bot, CalendarDays } from 'lucide-react'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

// Weekly heatmap sample intensities (0-3)
const heat = [2, 3, 1, 3, 2, 0, 3, 3, 2, 3, 1, 3, 3, 2]

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold text-ember">Features</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Every mechanic pulls you back tomorrow
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* big streak feature */}
          <motion.div
            variants={reveal}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-ember/15 via-card to-violet/10 p-6 md:col-span-4 md:row-span-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ember/20 text-ember">
              <Flame className="h-5 w-5 fill-ember" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-foreground text-balance">
              Streaks that reward everything, punish nothing
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              A living streak counter, freeze tokens for real life, and
              milestone celebrations at 7, 30, and 60 days. Momentum you can
              feel.
            </p>

            <div className="mt-6 grid grid-cols-10 gap-1.5">
              {Array.from({ length: 40 }).map((_, i) => (
                <span
                  key={i}
                  className={`aspect-square rounded-[3px] ${
                    i < 31 ? 'bg-ember/70' : 'bg-secondary'
                  } ${i === 30 ? 'bg-ember glow-ember' : ''}`}
                />
              ))}
            </div>
          </motion.div>

          <FeatureCard
            i={1}
            icon={Zap}
            title="XP & levels"
            body="Bank XP for every mission and level up from Novice to Forgemaster."
          />
          <FeatureCard
            i={2}
            icon={Award}
            title="Badges"
            body="Unlock collectible badges for milestones, comebacks, and perfect weeks."
          />

          <FeatureCard
            i={3}
            icon={Trophy}
            title="Leaderboard"
            body="Compete with the developers who started their journey the same day you did."
            className="md:col-span-2"
          />
          <FeatureCard
            i={4}
            icon={Bot}
            title="AI coach"
            body="A personal mentor that reviews your code, unblocks you, and tunes tomorrow’s mission."
            className="md:col-span-2"
          />

          {/* weekly heatmap card */}
          <motion.div
            variants={reveal}
            custom={5}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl border border-border bg-card p-5 md:col-span-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-violet">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-foreground">
              Weekly heatmap
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              See your consistency at a glance, week over week.
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              {heat.map((v, i) => (
                <span
                  key={i}
                  className={`h-4 w-4 rounded-[3px] ${
                    v === 0
                      ? 'bg-secondary'
                      : v === 1
                        ? 'bg-ember/30'
                        : v === 2
                          ? 'bg-ember/60'
                          : 'bg-ember'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  i,
  icon: Icon,
  title,
  body,
  className = '',
}: {
  i: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  className?: string
}) {
  return (
    <motion.div
      variants={reveal}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={`rounded-3xl border border-border bg-card p-5 md:col-span-2 ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-violet">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
        {body}
      </p>
    </motion.div>
  )
}
