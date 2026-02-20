"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react"
import type { Store } from "@/lib/data"

interface BagDetailProps {
  store: Store
  onBack: () => void
  onReserve: (store: Store) => void
}

export function BagDetail({ store, onBack, onReserve }: BagDetailProps) {
  const [countdown, setCountdown] = useState(1800) // 30 min countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60

  const discount = Math.round(
    ((store.originalPrice - store.discountedPrice) / store.originalPrice) * 100
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero image */}
      <div className="relative h-64 w-full">
        <Image
          src={store.image}
          alt={`Food from ${store.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5">
          <ShoppingBag className="h-3.5 w-3.5 text-primary-foreground" />
          <span className="text-sm font-bold text-primary-foreground">
            {`Save ${discount}%`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 px-5 pb-28 -mt-8 relative z-10">
        {/* Store info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">
                {store.name}
              </h1>
              <p className="text-sm text-muted-foreground">{store.category}</p>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-foreground">
                {store.rating}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{store.distance}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                {`Pickup: ${store.pickupStart} - ${store.pickupEnd}`}
              </span>
            </div>
          </div>
        </div>

        {/* Urgency countdown */}
        <div className="flex items-center gap-3 rounded-xl bg-destructive/10 border border-destructive/20 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/20">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-destructive">
              {`Only ${store.bagsLeft} bag${store.bagsLeft > 1 ? "s" : ""} left!`}
            </span>
            <span className="text-xs text-muted-foreground">
              {`Pickup window closes in ${minutes}:${seconds.toString().padStart(2, "0")}`}
            </span>
          </div>
          <div className="ml-auto font-mono text-xl font-extrabold text-destructive">
            {`${minutes}:${seconds.toString().padStart(2, "0")}`}
          </div>
        </div>

        {/* What to expect */}
        <div className="flex flex-col gap-3 rounded-xl bg-card p-4">
          <h2 className="text-base font-bold text-foreground">
            What to expect
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {store.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {["Bread", "Pastries", "Savory"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between rounded-xl bg-card p-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">Surprise Bag</span>
            <span className="text-sm text-muted-foreground line-through">
              {`\u20B1${store.originalPrice}`}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">You pay</span>
            <span className="text-2xl font-extrabold text-primary">
              {`\u20B1${store.discountedPrice}`}
            </span>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-background/95 px-5 py-4 backdrop-blur-lg">
        <button
          onClick={() => onReserve(store)}
          className="w-full rounded-2xl bg-primary py-4 text-center text-base font-extrabold text-primary-foreground transition-all active:scale-[0.98] hover:brightness-110"
        >
          {`Reserve for \u20B1${store.discountedPrice}`}
        </button>
      </div>
    </div>
  )
}
