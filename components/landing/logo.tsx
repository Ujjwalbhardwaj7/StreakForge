import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-ember to-violet glow-ember">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-primary-foreground"
        >
          <path
            d="M12 2c1.5 3.5-1 5-1 7.5 0 1 .8 1.8 1.8 1.8 1.2 0 2-1 2-2.4C17.5 11 19 13.2 19 15.7 19 19.2 15.9 22 12 22s-7-2.8-7-6.3C5 11 8.5 8 9 4c.4 2 1.5 2.5 3 0z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Streak<span className="text-gradient-ember">Forge</span>
      </span>
    </div>
  )
}
