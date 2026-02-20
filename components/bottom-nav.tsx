"use client"

import { Home, Search, ShoppingBag, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  orderCount?: number
}

export function BottomNav({
  activeTab,
  onTabChange,
  orderCount = 0,
}: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur-lg">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const showBadge = tab.id === "orders" && orderCount > 0
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1"
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                {showBadge && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                    {orderCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
