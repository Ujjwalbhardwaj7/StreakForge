'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { Logo } from './logo'

export function CTA() {
  return (
    <section id="cta" className="scroll-mt-24 px-4 pb-8 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-ember/20 via-card to-card px-5 py-10 text-center"
      >
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative">
          <h2 className="mx-auto mt-2 max-w-xl font-display text-2xl font-extrabold tracking-tight text-foreground text-balance sm:text-4xl">
            Your day-1 starts now.
          </h2>
          <p className="mx-auto mt-3 text-xs leading-relaxed text-muted-foreground">
            Join 12,400+ developers building every day, growing every day, and getting hired faster.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <a
              href="/dashboard"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow transition-transform active:scale-95"
            >
              Start your 60-day journey free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              or see how it works
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

import { BrandWatermarkReveal } from '@/components/ui/brand-watermark-reveal'

export function Footer() {
  const cols = [
    { title: 'Product', links: ['Missions', 'Streaks', 'Leaderboards'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers'] },
  ]
  return (
    <footer className="relative overflow-hidden border-t border-border px-4 pt-8 pb-0">
      <div className="mx-auto grid max-w-md gap-6 grid-cols-2">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Forge a coding habit that actually sticks. 60 days, one mission at a
            time.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold text-foreground">{c.title}</p>
            <ul className="mt-3 space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-border pt-6 pb-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} StreakForge. All rights reserved.</p>
        <p>Built for developers who show up.</p>
      </div>

      {/* End-of-Page Cinematic Brand Reveal Watermark */}
      <BrandWatermarkReveal appName="STREAKFORGE" />
    </footer>
  )
}
