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
  Minus,
  Plus,
  CheckCircle2,
} from "lucide-react"
import type { Store } from "@/lib/data"

interface BagDetailProps {
  store: Store
  onBack: () => void
  onReserve: (store: Store, quantity: number) => void
}

export function BagDetail({ store, onBack, onReserve }: BagDetailProps) {
  const [countdown, setCountdown] = useState(1800)
  const [quantity, setQuantity] = useState(1)
  const [confirming, setConfirming] = useState(false)

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

  const maxQuantity = Math.min(store.bagsLeft, 3) // max 3 per order
  const totalPrice = store.discountedPrice * quantity
  const totalSavings =
    (store.originalPrice - store.discountedPrice) * quantity

  const handleReserve = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    onReserve(store, quantity)
  }

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
      <div className="relative z-10 -mt-8 flex flex-1 flex-col gap-5 px-5 pb-40">
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
              <span className="text-xs text-muted-foreground">
                {`(${store.reviewCount})`}
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
                {`${store.pickupStart} - ${store.pickupEnd}`}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{store.address}</p>
        </div>

        {/* Urgency countdown */}
        <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4">
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
            {store.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center justify-between rounded-xl bg-card p-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-foreground">
              How many bags?
            </span>
            <span className="text-xs text-muted-foreground">
              {`Max ${maxQuantity} per order`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors disabled:opacity-30"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-lg font-extrabold text-foreground">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
              disabled={quantity >= maxQuantity}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="flex flex-col gap-3 rounded-xl bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {`Surprise Bag x${quantity}`}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {`\u20B1${(store.originalPrice * quantity).toLocaleString()}`}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">You pay</span>
            <span className="text-2xl font-extrabold text-primary">
              {`\u20B1${totalPrice.toLocaleString()}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              {`You save \u20B1${totalSavings.toLocaleString()} on this order!`}
            </span>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-background/95 px-5 py-4 backdrop-blur-lg">
        {confirming ? (
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm text-muted-foreground">
              {`Confirm reservation of ${quantity} bag${quantity > 1 ? "s" : ""} for \u20B1${totalPrice.toLocaleString()}?`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-2xl bg-secondary py-3.5 text-center text-sm font-bold text-secondary-foreground transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={handleReserve}
                className="flex-1 rounded-2xl bg-primary py-3.5 text-center text-sm font-extrabold text-primary-foreground transition-all active:scale-[0.98] hover:brightness-110"
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleReserve}
            className="w-full rounded-2xl bg-primary py-4 text-center text-base font-extrabold text-primary-foreground transition-all active:scale-[0.98] hover:brightness-110"
          >
            {`Reserve ${quantity} bag${quantity > 1 ? "s" : ""} for \u20B1${totalPrice.toLocaleString()}`}
          </button>
        )}
      </div>
    </div>
  )
}
