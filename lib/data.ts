export type Flavor = "Savory" | "Sweet" | "Mixed"

export interface Store {
  id: string
  name: string
  image: string
  category: string
  flavor: Flavor
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

export const CATEGORIES = ["All", "Rice Meals", "Pastries", "Snacks", "Coffee/Drinks"] as const
export type Category = (typeof CATEGORIES)[number]

export function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export const stores: Store[] = [
  {
    id: "dorm-side-diner",
    name: "Dorm-Side Diner",
    image: "/images/store-5.jpg",
    category: "Rice Meals",
    flavor: "Savory",
    tags: ["Rice", "High Protein", "Grilled Meat", "Vegetables"],
    originalPrice: 150,
    discountedPrice: 65,
    distance: "100m walk",
    distanceMeters: 100,
    pickupStart: "8:00 PM",
    pickupEnd: "8:30 PM",
    bagsLeft: 3,
    rating: 4.8,
    reviewCount: 215,
    description:
      "A Chef's Surprise Bowl packed with rice, grilled protein (chicken or pork), and a side of vegetables. High-calorie fuel for Hell Week study sessions.",
    address: "12 Dorm Row, University Belt, Manila",
  },
  {
    id: "campus-cafe",
    name: "The Campus Cafe",
    image: "/images/store-6.jpg",
    category: "Coffee/Drinks",
    flavor: "Mixed",
    tags: ["Cold Brew", "Sandwich", "Study Fuel", "Late Night"],
    originalPrice: 320,
    discountedPrice: 110,
    distance: "250m walk",
    distanceMeters: 250,
    pickupStart: "9:00 PM",
    pickupEnd: "9:30 PM",
    bagsLeft: 4,
    rating: 4.7,
    reviewCount: 178,
    description:
      "Midnight Study Pack: a surprise sandwich (ham & cheese or tuna melt) plus a large cold brew. Everything you need for an all-nighter.",
    address: "3F Student Center, Espana Blvd, Manila",
  },
  {
    id: "unimart-rte",
    name: "Uni-Mart Ready-to-Eat",
    image: "/images/store-7.jpg",
    category: "Snacks",
    flavor: "Savory",
    tags: ["Bento Box", "Fried Chicken", "Budget Meal", "Quick Pickup"],
    originalPrice: 180,
    discountedPrice: 55,
    distance: "350m walk",
    distanceMeters: 350,
    pickupStart: "8:30 PM",
    pickupEnd: "9:00 PM",
    bagsLeft: 2,
    rating: 4.5,
    reviewCount: 132,
    description:
      "Bento Box Surplus: a balanced tray with rice, fried chicken karaage, pickled vegetables, and egg. Grab-and-go nutrition at rock-bottom price.",
    address: "Uni-Mart, Legarda St, Sampaloc, Manila",
  },
  {
    id: "francis-bakes",
    name: "Francis Bakes",
    image: "/images/store-1.jpg",
    category: "Pastries",
    flavor: "Mixed",
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
    category: "Pastries",
    flavor: "Sweet",
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
    category: "Snacks",
    flavor: "Savory",
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
    category: "Pastries",
    flavor: "Sweet",
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
