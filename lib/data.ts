export interface Store {
  id: string
  name: string
  image: string
  category: string
  tags: string[]
  originalPrice: number
  discountedPrice: number
  distance: string
  distanceMeters: number
  pickupStart: string
  pickupEnd: string
  bagsLeft: number
  rating: number
  reviewCount: number
  description: string
  address: string
}

export interface Order {
  id: string
  store: Store
  quantity: number
  totalPrice: number
  pin: string
  status: "active" | "completed" | "cancelled"
  reservedAt: number
}

export const CATEGORIES = ["All", "Bakery", "Pastry", "Eatery", "Cafe"] as const
export type Category = (typeof CATEGORIES)[number]

export function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export const stores: Store[] = [
  {
    id: "francis-bakes",
    name: "Francis Bakes",
    image: "/images/store-1.jpg",
    category: "Bakery",
    tags: ["Bread", "Croissants", "Savory Pastries"],
    originalPrice: 300,
    discountedPrice: 99,
    distance: "300m walk",
    distanceMeters: 300,
    pickupStart: "8:30 PM",
    pickupEnd: "9:00 PM",
    bagsLeft: 2,
    rating: 4.8,
    reviewCount: 142,
    description:
      "A mix of day-old artisan breads, buttery croissants, and savory pastries. Perfect for tomorrow's breakfast or a late-night snack.",
    address: "123 Recto Ave, University Belt, Manila",
  },
  {
    id: "sweet-surrender",
    name: "Sweet Surrender",
    image: "/images/store-2.jpg",
    category: "Pastry",
    tags: ["Donuts", "Cream Puffs", "Seasonal Pastries"],
    originalPrice: 250,
    discountedPrice: 79,
    distance: "450m walk",
    distanceMeters: 450,
    pickupStart: "9:00 PM",
    pickupEnd: "9:30 PM",
    bagsLeft: 5,
    rating: 4.6,
    reviewCount: 98,
    description:
      "An assortment of glazed donuts, cream puffs, and seasonal pastries. Great value for your sweet cravings.",
    address: "45 C.M. Recto Ave, Sampaloc, Manila",
  },
  {
    id: "marias-empanada",
    name: "Maria's Empanada",
    image: "/images/store-3.jpg",
    category: "Eatery",
    tags: ["Empanadas", "Meat Pies", "Savory Filling"],
    originalPrice: 350,
    discountedPrice: 120,
    distance: "200m walk",
    distanceMeters: 200,
    pickupStart: "8:00 PM",
    pickupEnd: "8:30 PM",
    bagsLeft: 1,
    rating: 4.9,
    reviewCount: 203,
    description:
      "Hearty savory empanadas and meat pies with a variety of fillings. A filling meal at a fraction of the price.",
    address: "78 Legarda St, Sampaloc, Manila",
  },
  {
    id: "golden-crust",
    name: "Golden Crust Bakery",
    image: "/images/store-4.jpg",
    category: "Bakery",
    tags: ["Cinnamon Rolls", "Danish Pastries", "Sweet Buns"],
    originalPrice: 280,
    discountedPrice: 89,
    distance: "600m walk",
    distanceMeters: 600,
    pickupStart: "9:30 PM",
    pickupEnd: "10:00 PM",
    bagsLeft: 3,
    rating: 4.7,
    reviewCount: 167,
    description:
      "Freshly baked cinnamon rolls, Danish pastries, and cream-topped buns. A sweet surprise to end your day.",
    address: "210 Espana Blvd, Sampaloc, Manila",
  },
]
