'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Zap,
  Code2,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Share2,
  FileCode2,
  ArrowRight,
  Flame,
  Check
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  )
}

export default function ChallengeDayPage({
  params,
}: {
  params: Promise<{ day: string }>
}) {
  const resolvedParams = use(params)
  const dayNumber = resolvedParams.day || '12'

  const [githubUrl, setGithubUrl] = useState('https://github.com/alexrivera/streakforge-day12-debounced-search')
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/posts/alexrivera_buildinpublic-streakforge-day12')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isGithubValid = githubUrl.trim().includes('github.com')
  const isLinkedinValid = linkedinUrl.trim().includes('linkedin.com')
  const canSubmit = isGithubValid && isLinkedinValid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      {/* Mobile Header (390px Viewport) */}
      <header className="sticky top-0 z-40 glass border-b border-border/40 px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-transform active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground">
            <Flame className="h-3.5 w-3.5 text-ember" />
            Day {dayNumber} of 60
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-ember">
            <Zap className="h-3.5 w-3.5 fill-ember text-ember" />
            +150 XP
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 pb-32 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Track & Badge */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary">
              Frontend Track
            </span>
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              45 min est.
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-balance text-foreground">
            Day {dayNumber}: Build a Debounced Search Hook with LRU Cache
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            Implement an optimized React custom hook <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">useDebouncedSearch</code> that prevents excessive API calls during typing and caches previous search results.
          </p>

          {/* Quick Metrics */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-card p-3.5">
              <div className="text-[11px] font-semibold text-muted-foreground">XP Reward</div>
              <div className="mt-1 font-display text-xl font-extrabold text-ember flex items-center gap-1">
                <Zap className="h-4 w-4 fill-ember" />
                +150 XP
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-3.5">
              <div className="text-[11px] font-semibold text-muted-foreground">Submissions</div>
              <div className="mt-1 font-display text-xl font-extrabold text-foreground">
                348 Builders
              </div>
            </div>
          </div>

          {/* Section 1: What to Build */}
          <div className="mt-6 rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Code2 className="h-4 w-4" />
              Key Requirements
            </div>

            <ul className="mt-3 space-y-2.5 text-xs text-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Debounce user input by <strong>300ms</strong> before triggering the search query.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Maintain an in-memory cache to store queries and instantly return cached responses.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Handle abort controller signals for cancelled/stale requests.</span>
              </li>
            </ul>

            {/* Code Snippet Box */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-[#0c120c] p-4 text-[11px] font-mono text-[#d4e0cb]">
              <div className="flex items-center justify-between pb-2 text-[10px] text-muted-foreground border-b border-border/30">
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="h-3.5 w-3.5 text-primary" />
                  useDebouncedSearch.ts
                </span>
                <span>TypeScript</span>
              </div>
              <pre className="mt-2 overflow-x-auto text-xs leading-relaxed text-[#e4ebd9]">
{`export function useDebouncedSearch<T>(
  query: string,
  fetcher: (q: string) => Promise<T>,
  delay = 300
) {
  // 1. Debounce logic
  // 2. Cache check
  // 3. Return { data, loading, error }
}`}
              </pre>
            </div>
          </div>

          {/* Section 2: Submit Proof of Work */}
          <div className="mt-6 rounded-3xl border border-border bg-gradient-to-br from-card via-card to-secondary/30 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ember">
              <Sparkles className="h-4 w-4" />
              Proof of Work Submission
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Submit your GitHub commit URL and LinkedIn post to claim your Day {dayNumber} streak point & +150 XP.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label htmlFor="github" className="flex items-center justify-between text-xs font-semibold text-foreground mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <GithubIcon className="h-4 w-4 text-foreground" />
                      GitHub Commit / Repository URL
                    </span>
                    {isGithubValid && <Check className="h-3.5 w-3.5 text-primary" />}
                  </label>
                  <input
                    id="github"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repo/commit/..."
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="linkedin" className="flex items-center justify-between text-xs font-semibold text-foreground mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <LinkedinIcon className="h-4 w-4 text-[#0a66c2]" />
                      LinkedIn Post URL
                    </span>
                    {isLinkedinValid && <Check className="h-3.5 w-3.5 text-primary" />}
                  </label>
                  <input
                    id="linkedin"
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/posts/username_..."
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-transform active:scale-[0.98] disabled:opacity-40 disabled:grayscale cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-primary-foreground" />
                      Submit Day {dayNumber} Proof & Claim +150 XP
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-2xl border border-primary/40 bg-primary/10 p-4 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                  Day {dayNumber} Submitted! 🎉
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your proof of work has been logged. Streak extended to 43 days (+150 XP added)!
                </p>

                <Link
                  href="/dashboard"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow transition-transform active:scale-95"
                >
                  Back to Dashboard
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
