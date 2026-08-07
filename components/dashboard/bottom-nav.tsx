'use client'

import { Home, Target, Trophy, User } from 'lucide-react'
import { useState } from 'react'

const items = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'missions', label: 'Missions', icon: Target },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const [active, setActive] = useState('home')

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border">
      <div className="glass mx-auto flex max-w-md items-center justify-around px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <span
                className={`flex h-10 w-16 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-ember/15 text-ember glow-ember'
                    : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
              </span>
              <span
                className={`text-[10px] font-medium ${isActive ? 'text-ember' : 'text-muted-foreground'}`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
