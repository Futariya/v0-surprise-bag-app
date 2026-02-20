"use client"

import { useState, useMemo, useCallback } from "react"
import { HomeHeader } from "@/components/home-header"
import { StoreCard } from "@/components/store-card"
import { BagDetail } from "@/components/bag-detail"
import { PickupTicket } from "@/components/pickup-ticket"
import { OrdersScreen } from "@/components/orders-screen"
import { ProfileScreen } from "@/components/profile-screen"
import { BottomNav } from "@/components/bottom-nav"
import {
  stores,
  CATEGORIES,
  generatePin,
  type Store,
  type Order,
  type Category,
} from "@/lib/data"
import { Search, X } from "lucide-react"

type Screen = "home" | "detail" | "ticket" | "orders" | "profile"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home")
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [orders, setOrders] = useState<Order[]>([])
  const [activeOrder, setActiveOrder] = useState<Order | null>(null)

  // Compute total savings across completed + active orders
  const totalSaved = useMemo(() => {
    return orders.reduce((sum, o) => {
      if (o.status !== "cancelled") {
        return sum + (o.store.originalPrice - o.store.discountedPrice) * o.quantity
      }
      return sum
    }, 0)
  }, [orders])

  // Filter stores by search + category
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesCategory =
        activeCategory === "All" || store.category === activeCategory
      const matchesSearch =
        searchQuery.trim() === "" ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        )
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, activeCategory])

  const handleSelectStore = useCallback((store: Store) => {
    setSelectedStore(store)
    setScreen("detail")
  }, [])

  const handleReserve = useCallback(
    (store: Store, quantity: number) => {
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
    },
    []
  )

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

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      if (tab === "home") {
        setScreen("home")
        setSelectedStore(null)
      } else if (tab === "orders") {
        setScreen("orders")
      } else if (tab === "profile") {
        setScreen("profile")
      } else if (tab === "search") {
        setScreen("home")
        setSelectedStore(null)
        // Focus search on next tick handled by the search input
      }
    },
    []
  )

  const handleViewTicket = useCallback((order: Order) => {
    setActiveOrder(order)
    setSelectedStore(order.store)
    setScreen("ticket")
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

  // Home / Discovery Feed
  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <HomeHeader totalSaved={totalSaved} />

      {/* Search bar */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bakeries, eateries..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="shrink-0"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Quick filters */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-none">
        {CATEGORIES.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveCategory(filter)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              activeCategory === filter
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

      {/* Store cards */}
      <main className="flex flex-col gap-4 px-5">
        {filteredStores.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Search className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No stores found. Try a different search or filter.
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

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        orderCount={orders.filter((o) => o.status === "active").length}
      />
    </div>
  )
}
