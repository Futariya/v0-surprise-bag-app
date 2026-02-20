"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, X, Clock, TrendingUp, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { stores, CATEGORIES, type Store, type Category } from "@/lib/data"

interface SearchSheetProps {
  open: boolean
  onClose: () => void
  onSelectStore: (store: Store) => void
}

const RECENT_SEARCHES = ["Rice Bowl", "Cold Brew", "Empanada"]
const TRENDING = ["Bento Box", "Study Pack", "High Protein"]

export function SearchSheet({ open, onClose, onSelectStore }: SearchSheetProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<Category>("All")
  const inputRef = useRef<HTMLInputElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ startY: 0, currentY: 0, isDragging: false })

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200)
    } else {
      setQuery("")
      setCategory("All")
    }
  }, [open])

  const results = stores.filter((store) => {
    const matchesCategory = category === "All" || store.category === category
    const q = query.trim().toLowerCase()
    const matchesSearch =
      q === "" ||
      store.name.toLowerCase().includes(q) ||
      store.category.toLowerCase().includes(q) ||
      store.tags.some((t) => t.toLowerCase().includes(q))
    return matchesCategory && matchesSearch
  })

  const hasQuery = query.trim() !== ""

  // Swipe-to-dismiss on the drag handle
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragRef.current.startY = e.touches[0].clientY
    dragRef.current.isDragging = true
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragRef.current.isDragging) return
    dragRef.current.currentY = e.touches[0].clientY
    const delta = dragRef.current.currentY - dragRef.current.startY
    if (delta > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    const delta = dragRef.current.currentY - dragRef.current.startY
    dragRef.current.isDragging = false
    if (sheetRef.current) {
      sheetRef.current.style.transform = ""
    }
    if (delta > 100) {
      onClose()
    }
  }, [onClose])

  const handleQuickSearch = (term: string) => {
    setQuery(term)
    inputRef.current?.focus()
  }

  const handleSelect = (store: Store) => {
    onClose()
    setTimeout(() => onSelectStore(store), 150)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search stores"
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl bg-card shadow-2xl transition-transform duration-300 ease-out sm:max-h-[90vh] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div
          className="flex shrink-0 items-center justify-center pb-2 pt-3"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Search input */}
        <div className="shrink-0 px-5 pb-3">
          <div className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bakeries, food types..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("")
                  inputRef.current?.focus()
                }}
                className="shrink-0"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Category chips - horizontally scrollable */}
        <div className="flex shrink-0 gap-2 overflow-x-auto px-5 pb-3 scrollbar-none">
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
                onClick={() => setCategory(cat)}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <span className="text-sm leading-none">{icon}</span>
                {cat}
              </button>
            )
          })}
        </div>

        {/* Scrollable results area */}
        <div className="flex-1 overflow-y-auto px-5 pb-10 scrollbar-none">
          {/* If no query: show suggestions */}
          {!hasQuery && category === "All" ? (
            <div className="flex flex-col gap-6 pt-2">
              {/* Recent */}
              <section>
                <h3 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </section>

              {/* Trending */}
              <section>
                <h3 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Trending Now
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TRENDING.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleQuickSearch(term)}
                      className="rounded-full bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </section>

              {/* All nearby */}
              <section>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  All Nearby
                </h3>
                <div className="flex flex-col gap-2.5">
                  {stores.map((store) => (
                    <SearchResultRow
                      key={store.id}
                      store={store}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </section>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <Search className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No stores found. Try a different search.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 pt-1">
              <p className="text-xs text-muted-foreground">
                {results.length === 1
                  ? "1 result"
                  : `${results.length} results`}
              </p>
              {results.map((store) => (
                <SearchResultRow
                  key={store.id}
                  store={store}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function SearchResultRow({
  store,
  onSelect,
}: {
  store: Store
  onSelect: (store: Store) => void
}) {
  const discount = Math.round(
    ((store.originalPrice - store.discountedPrice) / store.originalPrice) * 100
  )

  return (
    <button
      onClick={() => onSelect(store)}
      className="flex w-full items-start gap-3 rounded-xl bg-secondary/50 p-3 text-left transition-colors active:bg-secondary"
    >
      {/* Thumbnail */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={store.image}
          alt={store.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      {/* Info - takes remaining space, truncates */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <h4 className="truncate text-sm font-bold text-foreground">
              {store.name}
            </h4>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none ${
                store.flavor === "Savory"
                  ? "bg-primary/15 text-primary"
                  : store.flavor === "Sweet"
                    ? "bg-pink-500/15 text-pink-400"
                    : "bg-secondary text-secondary-foreground"
              }`}
            >
              {store.flavor}
            </span>
          </div>
          <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary">
            {`-${discount}%`}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-hidden text-[11px] text-muted-foreground">
            <span className="flex shrink-0 items-center gap-0.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{store.distance}</span>
            </span>
            <span className="shrink-0 text-border">{'|'}</span>
            <span className="flex shrink-0 items-center gap-0.5">
              <Star className="h-3 w-3 shrink-0 fill-primary text-primary" />
              {store.rating}
            </span>
            <span className="shrink-0 text-border">{'|'}</span>
            <span className="flex shrink-0 items-center gap-0.5">
              <Clock className="h-3 w-3 shrink-0" />
              {store.pickupStart}
            </span>
          </div>
          <span className="shrink-0 text-sm font-extrabold text-primary">
            {`\u20B1${store.discountedPrice}`}
          </span>
        </div>
      </div>
    </button>
  )
}
