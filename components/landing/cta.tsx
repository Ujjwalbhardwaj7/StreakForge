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
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-ember/20 via-card to-violet/20 px-6 py-14 text-center sm:py-20"
      >
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full glass border border-border px-3 py-1.5 text-xs font-semibold text-ember">
            <Flame className="h-3.5 w-3.5 fill-ember" /> Cohort 07 · closes Sunday
          </span>
          <h2 className="mx-auto mt-5 max-w-xl font-display text-3xl font-extrabold tracking-tight text-foreground text-balance sm:text-5xl">
            Your day-1 starts now.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Join 12,400+ developers building every day, growing every day, and
            getting hired faster. Free to start — no card, just a commit.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/welcome"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-violet px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-ember transition-transform active:scale-95 sm:w-auto"
            >
              Start your 60-day journey free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
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
    { title: 'Product', links: ['Missions', 'Streaks', 'Leaderboards', 'Pricing'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
  ]
  return (
    <footer className="relative overflow-hidden border-t border-border px-4 pt-12 pb-0">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 md:grid-cols-4">
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
