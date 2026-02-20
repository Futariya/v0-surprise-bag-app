"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, ChevronRight, Package, XCircle, Clock } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import type { Order } from "@/lib/data"

interface OrdersScreenProps {
  orders: Order[]
  onViewTicket: (order: Order) => void
  onTabChange: (tab: string) => void
  activeTab: string
}

type OrderFilter = "all" | "active" | "completed" | "cancelled"

export function OrdersScreen({
  orders,
  onViewTicket,
  onTabChange,
  activeTab,
}: OrdersScreenProps) {
  const [filter, setFilter] = useState<OrderFilter>("all")

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter)

  const activeCount = orders.filter((o) => o.status === "active").length

  const filters: { id: OrderFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <header className="px-5 pt-4 pb-2">
        <h1 className="text-2xl font-extrabold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">
          {activeCount > 0
            ? `${activeCount} active order${activeCount > 1 ? "s" : ""}`
            : "No active orders"}
        </p>
      </header>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 pb-4">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Order list */}
      <div className="flex flex-col gap-3 px-5">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {filter === "all"
                ? "No orders yet. Reserve a Surprise Bag to get started!"
                : `No ${filter} orders.`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => onViewTicket(order)}
              className="flex items-center gap-3 rounded-xl bg-card p-3 text-left transition-all hover:ring-1 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={order.store.image}
                  alt={order.store.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-foreground">
                    {order.store.name}
                  </span>
                  {order.status === "active" && (
                    <span className="shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                      Active
                    </span>
                  )}
                  {order.status === "completed" && (
                    <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                      Done
                    </span>
                  )}
                  {order.status === "cancelled" && (
                    <span className="shrink-0 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold text-destructive">
                      Cancelled
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {order.status === "active" ? (
                    <Clock className="h-3 w-3" />
                  ) : order.status === "completed" ? (
                    <Package className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  <span>
                    {`${order.quantity} bag${order.quantity > 1 ? "s" : ""} \u2022 \u20B1${order.totalPrice.toLocaleString()}`}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {`PIN: ${order.pin} \u2022 ${order.store.pickupStart} - ${order.store.pickupEnd}`}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          ))
        )}
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        orderCount={activeCount}
      />
    </div>
  )
}
