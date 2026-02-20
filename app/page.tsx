"use client"

import { useState } from "react"
import { HomeHeader } from "@/components/home-header"
import { StoreCard } from "@/components/store-card"
import { BagDetail } from "@/components/bag-detail"
import { PickupTicket } from "@/components/pickup-ticket"
import { BottomNav } from "@/components/bottom-nav"
import { stores, type Store } from "@/lib/data"
import { Search } from "lucide-react"

type Screen = "home" | "detail" | "ticket"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home")
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [activeTab, setActiveTab] = useState("home")

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store)
    setScreen("detail")
  }

  const handleReserve = (store: Store) => {
    setSelectedStore(store)
    setScreen("ticket")
  }

  const handleBack = () => {
    if (screen === "ticket") {
      setScreen("detail")
    } else {
      setScreen("home")
      setSelectedStore(null)
    }
  }

  // Detail screen
  if (screen === "detail" && selectedStore) {
    return (
      <BagDetail
        store={selectedStore}
        onBack={handleBack}
        onReserve={handleReserve}
      />
    )
  }

  // Ticket screen
  if (screen === "ticket" && selectedStore) {
    return <PickupTicket store={selectedStore} onBack={handleBack} />
  }

  // Home / Discovery Feed
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <HomeHeader />

      {/* Search bar */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Search bakeries, eateries...
          </span>
        </div>
      </div>

      {/* Quick filters */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-none">
        {["All", "Bakery", "Pastry", "Eatery", "Cafe"].map((filter, i) => (
          <button
            key={filter}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              i === 0
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Section heading */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <h2 className="text-lg font-bold text-foreground">Nearby Surprise Bags</h2>
        <span className="text-xs text-muted-foreground">
          {`${stores.length} available`}
        </span>
      </div>

      {/* Store cards */}
      <main className="flex flex-col gap-4 px-5">
        {stores.map((store, index) => (
          <StoreCard
            key={store.id}
            store={store}
            onSelect={handleSelectStore}
            priority={index === 0}
          />
        ))}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
