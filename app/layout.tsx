import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

const display = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'StreakForge — Forge a 60-day coding habit',
  description:
    'StreakForge turns a 60-day coding challenge into an addictive daily habit. Ship code, keep your streak alive, earn XP and badges, and get coached along the way.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f4ee',
  userScalable: false,
}

import { PageLoadLogoReveal } from '@/components/ui/logo-reveal'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <PageLoadLogoReveal />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
