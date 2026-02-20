"use client"

import { ArrowLeft, Clock, MapPin, CheckCircle2 } from "lucide-react"
import type { Store } from "@/lib/data"

interface PickupTicketProps {
  store: Store
  onBack: () => void
}

export function PickupTicket({ store, onBack }: PickupTicketProps) {
  const orderPin = "4827"

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
        <div className="flex items-center gap-2 rounded-xl bg-success/10 border border-success/20 p-4">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <span className="text-sm font-bold text-success">
            Ready for Pickup
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            {`Before ${store.pickupEnd}`}
          </span>
        </div>

        {/* QR / PIN Ticket */}
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-card border border-border p-6">
          {/* QR Code placeholder rendered as grid pattern */}
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
            <div className="absolute -left-9 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background" />
            <div className="absolute -right-9 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background" />
          </div>

          {/* Order PIN */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">Order PIN</p>
            <div className="flex gap-3">
              {orderPin.split("").map((digit, i) => (
                <div
                  key={i}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-2xl font-extrabold text-foreground"
                >
                  {digit}
                </div>
              ))}
            </div>
          </div>

          {/* Store info */}
          <p className="text-center text-sm text-muted-foreground">
            {`Show this to the cashier at `}
            <span className="font-bold text-foreground">{store.name}</span>
          </p>
        </div>

        {/* Map placeholder */}
        <div className="overflow-hidden rounded-2xl bg-card border border-border">
          <div className="relative h-40 w-full bg-secondary">
            {/* Stylized mini map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Route line */}
                <div className="absolute left-6 top-1/2 h-0.5 w-24 -translate-y-1/2 bg-primary" />
                {/* Start dot */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                {/* End dot */}
                <div className="absolute left-28 top-1/2 -translate-y-1/2">
                  <MapPin className="h-6 w-6 fill-primary text-primary" />
                </div>
                {/* Grid for streets */}
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
                Walking directions to {store.name}
              </span>
            </div>
          </div>
        </div>

        {/* Pickup details */}
        <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-4">
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
              {`\u20B1${store.discountedPrice} paid`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
