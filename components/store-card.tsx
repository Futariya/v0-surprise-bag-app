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
      className="group w-full overflow-hidden rounded-2xl bg-card text-left shadow-elevation-1 transition-smooth hover:shadow-elevation-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 shadow-elevation-2">
          <ShoppingBag className="h-3.5 w-3.5 text-primary-foreground" />
          <span className="text-xs font-bold text-primary-foreground">
            {`Save ${discount}%`}
          </span>
        </div>
        {/* Flavor badge */}
        <div
          className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md ${
            store.flavor === "Savory"
              ? "bg-primary/85 text-primary-foreground"
              : store.flavor === "Sweet"
                ? "bg-pink-500/85 text-white"
                : "bg-secondary/85 text-secondary-foreground"
          }`}
        >
          {store.flavor}
        </div>
        {/* Scarcity badge - warm orange urgency */}
        {store.bagsLeft <= 2 && (
          <div className="absolute top-4 right-4 rounded-full bg-primary/90 px-3 py-1.5 shadow-elevation-2">
            <span className="text-xs font-extrabold text-primary-foreground">
              {`⚡ ${store.bagsLeft} left!`}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground">
              {store.name}
            </h3>
            <p className="text-xs font-medium text-muted-foreground">{store.category}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs font-semibold text-foreground">
              {store.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary/60" />
            <span className="font-medium">{store.distance}</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-border" />
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary/60" />
            <span>{store.pickupStart}</span>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-border/40 pt-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-muted-foreground/70 line-through">
                {`\u20B1${store.originalPrice}`}
              </span>
              <span className="text-xl font-extrabold text-primary">
                {`\u20B1${store.discountedPrice}`}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Save {discount}%
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {store.bagsLeft} left
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
