export interface Store {
  id: string
  name: string
  image: string
  category: string
  originalPrice: number
  discountedPrice: number
  distance: string
  pickupStart: string
  pickupEnd: string
  bagsLeft: number
  rating: number
  description: string
}

export const stores: Store[] = [
  {
    id: "francis-bakes",
    name: "Francis Bakes",
    image: "/images/store-1.jpg",
    category: "Bakery",
    originalPrice: 300,
    discountedPrice: 99,
    distance: "300m walk",
    pickupStart: "8:30 PM",
    pickupEnd: "9:00 PM",
    bagsLeft: 2,
    rating: 4.8,
    description:
      "A mix of day-old artisan breads, buttery croissants, and savory pastries. Perfect for tomorrow's breakfast or a late-night snack.",
  },
  {
    id: "sweet-surrender",
    name: "Sweet Surrender",
    image: "/images/store-2.jpg",
    category: "Pastry Shop",
    originalPrice: 250,
    discountedPrice: 79,
    distance: "450m walk",
    pickupStart: "9:00 PM",
    pickupEnd: "9:30 PM",
    bagsLeft: 5,
    rating: 4.6,
    description:
      "An assortment of glazed donuts, cream puffs, and seasonal pastries. Great value for your sweet cravings.",
  },
  {
    id: "marias-empanada",
    name: "Maria's Empanada",
    image: "/images/store-3.jpg",
    category: "Eatery",
    originalPrice: 350,
    discountedPrice: 120,
    distance: "200m walk",
    pickupStart: "8:00 PM",
    pickupEnd: "8:30 PM",
    bagsLeft: 1,
    rating: 4.9,
    description:
      "Hearty savory empanadas and meat pies with a variety of fillings. A filling meal at a fraction of the price.",
  },
  {
    id: "golden-crust",
    name: "Golden Crust Bakery",
    image: "/images/store-4.jpg",
    category: "Bakery",
    originalPrice: 280,
    discountedPrice: 89,
    distance: "600m walk",
    pickupStart: "9:30 PM",
    pickupEnd: "10:00 PM",
    bagsLeft: 3,
    rating: 4.7,
    description:
      "Freshly baked cinnamon rolls, Danish pastries, and cream-topped buns. A sweet surprise to end your day.",
  },
]
