'use client'

import { Home, Target, Trophy, User } from 'lucide-react'
import { useState } from 'react'

export type TabId = 'home' | 'missions' | 'leaderboard' | 'profile'

const items: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'missions', label: 'Missions', icon: Target },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'profile', label: 'Profile', icon: User },
]

type BottomNavProps = {
  activeTab?: TabId
  onTabChange?: (tab: TabId) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [localActive, setLocalActive] = useState<TabId>('home')

  const currentActive = activeTab ?? localActive

  const handleClick = (id: TabId) => {
    if (onTabChange) {
      onTabChange(id)
    } else {
      setLocalActive(id)
    }
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border">
      <div className="glass mx-auto flex max-w-md items-center justify-around px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {items.map((item) => {
          const isActive = currentActive === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5 cursor-pointer"
            >
              <span
                className={`flex h-10 w-16 items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-ember/15 text-ember glow-ember'
                    : 'text-muted-foreground hover:text-foreground'
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
