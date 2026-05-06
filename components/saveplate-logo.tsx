import Image from "next/image"

interface SaveplateLogo {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function SaveplateLogo({ size = "md", showText = true }: SaveplateLogo) {
  const sizes = {
    sm: { img: 24, text: "text-sm" },
    md: { img: 32, text: "text-base" },
    lg: { img: 48, text: "text-xl" },
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
        <span className="text-lg font-bold text-primary-foreground">SP</span>
      </div>
      {showText && (
        <div className="flex flex-col gap-0.5">
          <span className={`font-bold text-foreground ${sizes[size].text}`}>
            SavePlate
          </span>
          <span className="text-[9px] font-medium tracking-widest text-primary/80 uppercase">
            Rescue Food, Save Money
          </span>
        </div>
      )}
    </div>
  )
}
