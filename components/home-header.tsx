"use client"

import { MapPin, Bell, Coins } from "lucide-react"
import { SaveplateLogo } from "./saveplate-logo"

interface HomeHeaderProps {
  totalSaved: number
}

export function HomeHeader({ totalSaved }: HomeHeaderProps) {
  return (
    <header className="flex flex-col gap-4 px-5 pt-4 pb-4">
      {/* Brand Logo */}
      <SaveplateLogo size="md" showText={true} />
      
      {/* Location and stats */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/60">
            <MapPin className="h-4.5 w-4.5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Location</p>
            <p className="text-sm font-semibold text-foreground">
              University Belt
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-secondary/60 px-3.5 py-2">
            <Coins className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">
              {`\u20B1${totalSaved.toLocaleString()}`}
            </span>
          </div>
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 transition-smooth hover:bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow-elevation-1" />
          </button>
        </div>
      </div>
    </header>
  )
}
