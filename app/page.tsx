'use client'

import Link from 'next/link'
import { Hero } from '@/components/landing/hero'
import { Why } from '@/components/landing/why'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Features } from '@/components/landing/features'
import { DailyJourney } from '@/components/landing/daily-journey'
import { Testimonials } from '@/components/landing/testimonials'
import { FAQ } from '@/components/landing/faq'
import { CTA } from '@/components/landing/cta'
import { Logo } from '@/components/landing/logo'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Top Navbar for Mobile 390px Viewport */}
      <header className="sticky top-0 z-50 glass border-b border-border/40 px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Logo />
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-sm transition-transform active:scale-95"
          >
            Dashboard
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-md">
        <Hero />
        <Why />
        <HowItWorks />
        <Features />
        <DailyJourney />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
    </div>
  )
}
