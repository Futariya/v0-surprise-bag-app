"use client"

import Image from "next/image"
import { Clock, MapPin, ShoppingBag, Star } from "lucide-react"
import type { Store } from "@/lib/data"

interface StoreCardProps {
  store: Store
  onSelect: (store: Store) => void
  priority?: boolean
}

export function StoreCard({ store, onSelect, priority = false }: StoreCardProps) {
  const discount = Math.round(
    ((store.originalPrice - store.discountedPrice) / store.originalPrice) * 100
  )

  return (
    <button
      onClick={() => onSelect(store)}
      className="group w-full overflow-hidden rounded-xl bg-card text-left transition-all hover:ring-1 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="relative h-36 w-full overflow-hidden">
        <Image
          src={store.image}
          alt={`Food from ${store.name}`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        {/* Discount badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1">
          <ShoppingBag className="h-3 w-3 text-primary-foreground" />
          <span className="text-xs font-bold text-primary-foreground">
            {`-${discount}%`}
          </span>
        </div>
        {/* Flavor badge */}
        <div
          className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${
            store.flavor === "Savory"
              ? "bg-primary/80 text-primary-foreground"
              : store.flavor === "Sweet"
                ? "bg-pink-500/80 text-white"
                : "bg-secondary/80 text-secondary-foreground"
          }`}
        >
          {store.flavor}
        </div>
        {/* Scarcity badge - warm orange urgency */}
        {store.bagsLeft <= 2 && (
          <div className="absolute top-3 right-3 rounded-full bg-primary/90 px-2.5 py-1">
            <span className="text-xs font-bold text-primary-foreground">
              {`Only ${store.bagsLeft} left!`}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">
              {store.name}
            </h3>
            <p className="text-xs text-muted-foreground">{store.category}</p>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs font-semibold text-foreground">
              {store.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs">{store.distance}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">
                {`${store.pickupStart} - ${store.pickupEnd}`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-2.5">
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <Clock className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {`Pickup: ${store.pickupStart}`}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-muted-foreground line-through">
              {`\u20B1${store.originalPrice}`}
            </span>
            <span className="text-lg font-extrabold text-primary">
              {`\u20B1${store.discountedPrice}`}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
