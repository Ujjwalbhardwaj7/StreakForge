import { Nav } from '@/components/landing/nav'
import { Hero } from '@/components/landing/hero'
import { Why } from '@/components/landing/why'
import { HowItWorks } from '@/components/landing/how-it-works'
import { DailyJourney } from '@/components/landing/daily-journey'
import { Testimonials } from '@/components/landing/testimonials'
import { Features } from '@/components/landing/features'
import { FAQ } from '@/components/landing/faq'
import { CTA, Footer } from '@/components/landing/cta'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />
      <Hero />
      <Why />
      <HowItWorks />
      <DailyJourney />
      <Testimonials />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
