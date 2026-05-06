"use client"

import {
  User,
  Coins,
  ShoppingBag,
  Leaf,
  MapPin,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { SaveplateLogo } from "./saveplate-logo"

interface ProfileScreenProps {
  totalSaved: number
  totalOrders: number
  onTabChange: (tab: string) => void
  activeTab: string
}

export function ProfileScreen({
  totalSaved,
  totalOrders,
  onTabChange,
  activeTab,
}: ProfileScreenProps) {
  const mealsRescued = totalOrders
  const co2Saved = (mealsRescued * 2.5).toFixed(1) // rough est: 2.5kg CO2 per meal

  const menuItems = [
    { icon: MapPin, label: "Saved Locations" },
    { icon: Bell, label: "Notification Preferences" },
    { icon: HelpCircle, label: "Help & Support" },
    { icon: LogOut, label: "Sign Out" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <header className="flex items-center justify-between px-5 pt-4 pb-3">
        <SaveplateLogo size="md" showText={false} />
        <h1 className="text-2xl font-extrabold text-foreground">Profile</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </header>

      <div className="flex flex-col gap-5 px-5 py-4">
        {/* User card */}
        <div className="flex items-center gap-4 rounded-2xl bg-card p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-extrabold text-foreground">
              Architecture Student
            </span>
            <span className="text-sm text-muted-foreground">
              University Belt, Manila
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-4">
            <Coins className="h-5 w-5 text-primary" />
            <span className="text-lg font-extrabold text-foreground">
              {`\u20B1${totalSaved.toLocaleString()}`}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Total Saved
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-4">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="text-lg font-extrabold text-foreground">
              {mealsRescued}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Meals Rescued
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-4">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-lg font-extrabold text-foreground">
              {`${co2Saved}kg`}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {"CO\u2082 Saved"}
            </span>
          </div>
        </div>

        {/* Impact message */}
        {mealsRescued > 0 && (
          <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
            <p className="text-center text-sm leading-relaxed text-foreground">
              {`You've rescued ${mealsRescued} meal${mealsRescued > 1 ? "s" : ""} from going to waste and saved `}
              <span className="font-extrabold text-primary">
                {`\u20B1${totalSaved.toLocaleString()}`}
              </span>
              {" in the process. Keep it up!"}
            </p>
          </div>
        )}

        {/* Menu list */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-card">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isLast = idx === menuItems.length - 1
            return (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary/50 ${
                  !isLast ? "border-b border-border" : ""
                } ${item.label === "Sign Out" ? "text-destructive" : "text-foreground"}`}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${item.label === "Sign Out" ? "text-destructive" : "text-muted-foreground"}`}
                />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.label !== "Sign Out" && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}
