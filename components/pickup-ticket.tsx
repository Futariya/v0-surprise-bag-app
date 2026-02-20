"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Package,
} from "lucide-react"
import type { Order } from "@/lib/data"

interface PickupTicketProps {
  order: Order
  onBack: () => void
  onComplete: (orderId: string) => void
  onCancel: (orderId: string) => void
}

export function PickupTicket({
  order,
  onBack,
  onComplete,
  onCancel,
}: PickupTicketProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [elapsedSecs, setElapsedSecs] = useState(0)

  const store = order.store

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSecs(Math.floor((Date.now() - order.reservedAt) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [order.reservedAt])

  const elapsedMin = Math.floor(elapsedSecs / 60)
  const elapsedSecDisplay = elapsedSecs % 60

  const statusColor =
    order.status === "active"
      ? "text-success"
      : order.status === "completed"
        ? "text-primary"
        : "text-destructive"

  const statusBg =
    order.status === "active"
      ? "bg-success/10 border-success/20"
      : order.status === "completed"
        ? "bg-primary/10 border-primary/20"
        : "bg-destructive/10 border-destructive/20"

  const statusLabel =
    order.status === "active"
      ? "Ready for Pickup"
      : order.status === "completed"
        ? "Picked Up"
        : "Cancelled"

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-4 pb-2">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Your Pickup</h1>
      </header>

      <div className="flex flex-1 flex-col gap-5 px-5 py-4">
        {/* Status badge */}
        <div
          className={`flex items-center gap-2 rounded-xl border p-4 ${statusBg}`}
        >
          {order.status === "active" ? (
            <CheckCircle2 className={`h-5 w-5 ${statusColor}`} />
          ) : order.status === "completed" ? (
            <Package className={`h-5 w-5 ${statusColor}`} />
          ) : (
            <XCircle className={`h-5 w-5 ${statusColor}`} />
          )}
          <span className={`text-sm font-bold ${statusColor}`}>
            {statusLabel}
          </span>
          {order.status === "active" && (
            <span className="ml-auto text-xs text-muted-foreground">
              {`Before ${store.pickupEnd}`}
            </span>
          )}
        </div>

        {/* Time since reservation for active orders */}
        {order.status === "active" && (
          <div className="flex items-center gap-2 rounded-xl bg-card p-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {`Reserved ${elapsedMin}:${elapsedSecDisplay.toString().padStart(2, "0")} ago`}
            </span>
          </div>
        )}

        {/* QR / PIN Ticket */}
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-6">
          {/* QR Code pattern */}
          <div className="flex flex-col items-center gap-3">
            <div className="grid grid-cols-7 gap-1 rounded-xl bg-foreground p-4">
              {Array.from({ length: 49 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-sm ${
                    [
                      0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35,
                      36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 8,
                      10, 12, 15, 17, 19, 22, 24, 26, 29, 31, 33,
                    ].includes(i)
                      ? "bg-background"
                      : "bg-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Scan QR or use PIN below
            </p>
          </div>

          {/* Dashed divider */}
          <div className="relative w-full">
            <div className="border-t border-dashed border-border" />
            <div className="absolute -left-9 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
            <div className="absolute -right-9 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
          </div>

          {/* Order PIN */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Order PIN</p>
            <div className="flex gap-3">
              {order.pin.split("").map((digit, i) => (
                <div
                  key={i}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-2xl font-extrabold text-foreground"
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>

          {/* Order details */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-center text-sm text-muted-foreground">
              {`Show this to the cashier at `}
              <span className="font-bold text-foreground">{store.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {`${order.quantity} bag${order.quantity > 1 ? "s" : ""} \u2022 \u20B1${order.totalPrice.toLocaleString()} paid`}
            </p>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-40 w-full bg-secondary">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute left-6 top-1/2 h-0.5 w-24 -translate-y-1/2 bg-primary" />
                <div className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-primary bg-background" />
                <div className="absolute left-28 top-1/2 -translate-y-1/2">
                  <MapPin className="h-6 w-6 fill-primary text-primary" />
                </div>
                <div className="h-24 w-44 opacity-20">
                  <div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-sm bg-muted-foreground"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground">
                {store.distance}
              </span>
              <span className="text-xs text-muted-foreground">
                {store.address}
              </span>
            </div>
          </div>
        </div>

        {/* Pickup details */}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Clock className="h-5 w-5 text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">
              Pickup Window
            </span>
            <span className="text-xs text-muted-foreground">
              {`${store.pickupStart} - ${store.pickupEnd}`}
            </span>
          </div>
          <div className="ml-auto rounded-full bg-primary/15 px-3 py-1">
            <span className="text-xs font-bold text-primary">
              {`\u20B1${order.totalPrice.toLocaleString()} paid`}
            </span>
          </div>
        </div>

        {/* Actions for active orders */}
        {order.status === "active" && (
          <div className="flex flex-col gap-3 pb-6">
            <button
              onClick={() => onComplete(order.id)}
              className="w-full rounded-2xl bg-primary py-4 text-center text-base font-extrabold text-primary-foreground transition-all active:scale-[0.98] hover:brightness-110"
            >
              Mark as Picked Up
            </button>
            {showCancelConfirm ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 rounded-2xl bg-secondary py-3 text-center text-sm font-bold text-secondary-foreground transition-all active:scale-[0.98]"
                >
                  Keep Order
                </button>
                <button
                  onClick={() => onCancel(order.id)}
                  className="flex-1 rounded-2xl bg-destructive py-3 text-center text-sm font-bold text-destructive-foreground transition-all active:scale-[0.98]"
                >
                  Yes, Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full rounded-2xl border border-border py-3 text-center text-sm font-semibold text-muted-foreground transition-all active:scale-[0.98] hover:text-destructive"
              >
                Cancel Order
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
