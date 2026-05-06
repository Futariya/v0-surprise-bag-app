"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { HomeHeader } from "@/components/home-header"
import { StoreCard } from "@/components/store-card"
import { BagDetail } from "@/components/bag-detail"
import { PickupTicket } from "@/components/pickup-ticket"
import { OrdersScreen } from "@/components/orders-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { BottomNav } from "@/components/bottom-nav"
import { SearchSheet } from "@/components/search-sheet"
import { Tutorial } from "@/components/tutorial"
import {
  stores,
  CATEGORIES,
  generatePin,
  type Store,
  type Order,
  type Category,
} from "@/lib/data"

type Screen = "home" | "detail" | "ticket" | "orders" | "profile"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home")
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [activeTab, setActiveTab] = useState("home")
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [orders, setOrders] = useState<Order[]>([])
  const [activeOrder, setActiveOrder] = useState<Order | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialCompleted, setTutorialCompleted] = useState(false)

  // Check if tutorial has been completed on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem('saveplate-tutorial-completed') === 'true'
      setTutorialCompleted(completed)
      if (!completed) {
        setShowTutorial(true)
      }
    }
  }, [])

  const handleTutorialComplete = useCallback(() => {
    setShowTutorial(false)
    setTutorialCompleted(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('saveplate-tutorial-completed', 'true')
    }
  }, [])

  // Swipe-up detection - only trigger from near bottom of screen
  const swipeRef = useRef({ startY: 0, startTime: 0, active: false })

  const totalSaved = useMemo(() => {
    return orders.reduce((sum, o) => {
      if (o.status !== "cancelled") {
        return sum + (o.store.originalPrice - o.store.discountedPrice) * o.quantity
      }
      return sum
    }, 0)
  }, [orders])

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      return activeCategory === "All" || store.category === activeCategory
    })
  }, [activeCategory])

  const handleSelectStore = useCallback((store: Store) => {
    setSelectedStore(store)
    setScreen("detail")
  }, [])

  const handleReserve = useCallback((store: Store, quantity: number) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      store,
      quantity,
      totalPrice: store.discountedPrice * quantity,
      pin: generatePin(),
      status: "active",
      reservedAt: Date.now(),
    }
    setOrders((prev) => [newOrder, ...prev])
    setActiveOrder(newOrder)
    setScreen("ticket")
  }, [])

  const handleCompleteOrder = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "completed" } : o))
    )
    setActiveOrder(null)
    setScreen("home")
    setActiveTab("home")
  }, [])

  const handleCancelOrder = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o))
    )
    setActiveOrder(null)
    setScreen("home")
    setActiveTab("home")
  }, [])

  const handleBack = useCallback(() => {
    if (screen === "ticket") {
      setScreen("home")
      setActiveTab("home")
      setSelectedStore(null)
    } else if (screen === "detail") {
      setScreen("home")
      setSelectedStore(null)
    }
  }, [screen])

  const handleTabChange = useCallback((tab: string) => {
    if (tab === "search") {
      setSearchOpen(true)
      return
    }
    setActiveTab(tab)
    if (tab === "home") {
      setScreen("home")
      setSelectedStore(null)
    } else if (tab === "orders") {
      setScreen("orders")
    } else if (tab === "profile") {
      setScreen("profile")
    }
  }, [])

  const handleViewTicket = useCallback((order: Order) => {
    setActiveOrder(order)
    setSelectedStore(order.store)
    setScreen("ticket")
  }, [])

  // Swipe-up handler for the feed area to open search
  // Only trigger if swiping from near the bottom (last 100px of screen)
  const handleFeedTouchStart = useCallback((e: React.TouchEvent) => {
    const touchY = e.touches[0].clientY
    const bottomThreshold = window.innerHeight - 100
    if (touchY > bottomThreshold) {
      swipeRef.current.startY = touchY
      swipeRef.current.startTime = Date.now()
      swipeRef.current.active = true
    }
  }, [])

  const handleFeedTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!swipeRef.current.active) return
    swipeRef.current.active = false
    const endY = e.changedTouches[0].clientY
    const delta = swipeRef.current.startY - endY // positive = upward
    const timeDelta = Date.now() - swipeRef.current.startTime
    const velocity = Math.abs(delta) / timeDelta // pixels per millisecond
    
    // Trigger search only for deliberate upward swipes (high velocity + distance)
    // Requires: 60px minimum distance OR fast swipe (>0.3 px/ms)
    if (delta > 60 && velocity > 0.15) {
      setSearchOpen(true)
    }
  }, [])

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
  if (screen === "ticket" && activeOrder) {
    return (
      <PickupTicket
        order={activeOrder}
        onBack={handleBack}
        onComplete={handleCompleteOrder}
        onCancel={handleCancelOrder}
      />
    )
  }

  // Orders screen
  if (screen === "orders") {
    return (
      <OrdersScreen
        orders={orders}
        onViewTicket={handleViewTicket}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
    )
  }

  // Profile screen
  if (screen === "profile") {
    return (
      <ProfileScreen
        totalSaved={totalSaved}
        totalOrders={orders.filter((o) => o.status !== "cancelled").length}
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
    )
  }

  // Show tutorial overlay if needed
  if (showTutorial) {
    return <Tutorial onComplete={handleTutorialComplete} />
  }

  // Home / Discovery Feed
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <HomeHeader totalSaved={totalSaved} />

      {/* Tappable search bar that opens the search sheet */}
      <div className="px-5 py-3">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-left"
          aria-label="Open search"
        >
          <svg
            className="h-4 w-4 shrink-0 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <span className="flex-1 text-sm text-muted-foreground">
            Search bakeries, eateries...
          </span>
        </button>
      </div>

      {/* Category filter chips - scrollable with icons */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const icon =
            cat === "All"
              ? "\u2728"
              : cat === "Rice Meals"
                ? "\u{1F35A}"
                : cat === "Pastries"
                  ? "\u{1F950}"
                  : cat === "Snacks"
                    ? "\u{1F371}"
                    : "\u2615"
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="text-sm leading-none">{icon}</span>
              {cat}
            </button>
          )
        })}
      </div>

      {/* Section heading */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <h2 className="text-lg font-bold text-foreground">
          {activeCategory === "All"
            ? "Nearby Surprise Bags"
            : `${activeCategory} Bags`}
        </h2>
        <span className="text-xs text-muted-foreground">
          {filteredStores.length === 1
            ? "1 available"
            : `${filteredStores.length} available`}
        </span>
      </div>

      {/* Store cards - swipe up to open search */}
      <main
        className="flex flex-col gap-4 px-5"
        onTouchStart={handleFeedTouchStart}
        onTouchEnd={handleFeedTouchEnd}
      >
        {filteredStores.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <svg
              className="h-10 w-10 text-muted-foreground/40"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <p className="text-sm text-muted-foreground">
              No stores in this category yet.
            </p>
          </div>
        ) : (
          filteredStores.map((store, index) => (
            <StoreCard
              key={store.id}
              store={store}
              onSelect={handleSelectStore}
              priority={index === 0}
            />
          ))
        )}
      </main>

      {/* Search bottom sheet */}
      <SearchSheet
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectStore={handleSelectStore}
      />

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        orderCount={orders.filter((o) => o.status === "active").length}
      />
    </div>
  )
}
