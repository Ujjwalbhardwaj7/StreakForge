'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { PhoneMock } from './phone-mock'

import { LogoReveal } from '@/components/ui/logo-reveal'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:pt-36">
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.62_0.2_292/22%),transparent)] blur-3xl" />

      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          {/* Featured Premium 3D Glass Logo Reveal */}
          <motion.div variants={item} className="mb-6 flex flex-col items-center lg:items-start">
            <LogoReveal size={140} showReplayButton />
          </motion.div>

          <motion.a
            variants={item}
            href="#"
            className="inline-flex items-center gap-2 rounded-full glass border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="flex items-center gap-1 font-semibold text-ember">
              <Flame className="h-3.5 w-3.5 fill-ember" /> New
            </span>
            Cohort 07 starts Monday
            <ArrowRight className="h-3 w-3" />
          </motion.a>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance sm:text-6xl"
          >
            Build every day. Grow every day.{' '}
            <span className="text-gradient-ember">Get hired faster.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground lg:mx-0"
          >
            Join a 60-day coding journey where every commit, every project, and
            every LinkedIn post builds your portfolio, your confidence, and your
            career.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="/welcome"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-violet px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-ember transition-transform active:scale-95 sm:w-auto"
            >
              Start your 60-day journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="flex w-full items-center justify-center rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
          >
            <div className="flex -space-x-2">
              {['from-ember to-violet', 'from-violet to-ember', 'from-ember to-destructive', 'from-violet to-primary'].map(
                (g, i) => (
                  <div
                    key={i}
                    className={`h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br ${g}`}
                  />
                ),
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">12,400+</span>{' '}
              developers building daily
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhoneMock />
        </motion.div>
      </div>
    </section>
  )
}
