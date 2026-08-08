'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Logo } from './logo'

const links = [
  { label: 'Why StreakForge', href: '#why' },
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass border border-border' : 'border border-transparent'
        }`}
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/dashboard"
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Log in
          </a>
          <a
            href="/dashboard"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform active:scale-95"
          >
            Start free
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
