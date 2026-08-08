'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('streakforge_theme') as 'dark' | 'light' | null
      const initialTheme = stored || 'dark'
      setTheme(initialTheme)

      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('streakforge_theme', nextTheme)

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === 'dark' ? 'Light (Sage Cream)' : 'Dark'} mode`}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-[#4a5c46] transition-transform hover:-rotate-12" />
      )}
    </button>
  )
}
