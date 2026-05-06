'use client'

import { useState } from 'react'
import { ChevronRight, X } from 'lucide-react'
import { SaveplateLogo } from './saveplate-logo'

interface TutorialSlide {
  id: number
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
}

const TUTORIAL_SLIDES: TutorialSlide[] = [
  {
    id: 1,
    title: 'Welcome to SavePlate',
    subtitle: 'Rescue Food, Save Money',
    description:
      'Grab discounted Surprise Bags from local bakeries and eateries before closing time. Save up to 70% on your favorite foods.',
    icon: (
      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
        <SaveplateLogo size="lg" showText={false} />
      </div>
    ),
  },
  {
    id: 2,
    title: 'Browse & Discover',
    subtitle: 'Find Amazing Deals',
    description:
      "Scroll through nearby surprise bags, filter by category (Rice Meals, Pastries, Snacks, Coffee), and discover what's available right now.",
    icon: (
      <div className="text-6xl">
        🔍
      </div>
    ),
  },
  {
    id: 3,
    title: 'Reserve Your Bag',
    subtitle: 'Quick & Easy',
    description:
      'Tap on any bag to see details, choose your quantity, and complete your reservation. Each bag comes with a unique pickup PIN.',
    icon: (
      <div className="text-6xl">
        ✋
      </div>
    ),
  },
  {
    id: 4,
    title: 'Pick Up Your Order',
    subtitle: 'Time-Sensitive Deals',
    description:
      "Go to the location within the pickup window shown on your ticket. The countdown timer shows how much time is left—don't miss out!",
    icon: (
      <div className="text-6xl">
        ⏰
      </div>
    ),
  },
  {
    id: 5,
    title: 'Track Your Savings',
    subtitle: 'Build a Sustainable Habit',
    description:
      'View your order history, total money saved, and meals rescued in your profile. Every purchase helps reduce food waste.',
    icon: (
      <div className="text-6xl">
        💰
      </div>
    ),
  },
]

interface TutorialProps {
  onComplete: () => void
}

export function Tutorial({ onComplete }: TutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slide = TUTORIAL_SLIDES[currentSlide]
  const isLastSlide = currentSlide === TUTORIAL_SLIDES.length - 1

  const handleNext = () => {
    if (isLastSlide) {
      onComplete()
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Close button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
        aria-label="Skip tutorial"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-6 text-center">
        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-secondary">
          {slide.icon}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-foreground">{slide.title}</h1>
          <p className="text-sm font-semibold text-primary">{slide.subtitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {slide.description}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {TUTORIAL_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-secondary hover:bg-secondary/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="absolute bottom-8 left-6 right-6 flex gap-3">
        <button
          onClick={handleSkip}
          className="flex-1 rounded-full border border-border bg-transparent px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          {isLastSlide ? 'Done' : 'Skip'}
        </button>
        <button
          onClick={handleNext}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {isLastSlide ? 'Start Exploring' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
