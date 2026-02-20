"use client"

import { MapPin, Bell, Coins } from "lucide-react"

export function HomeHeader() {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Your location</p>
          <p className="text-sm font-semibold text-foreground">
            University Belt
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5">
          <Coins className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-bold text-primary">
            {"Saved: \u20B1450"}
          </span>
        </div>
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-foreground" />
          <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  )
}
