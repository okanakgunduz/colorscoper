import { Heart } from "@phosphor-icons/react"

export default function SupportUs() {
  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-heading flex items-center gap-1.5">
          <Heart weight="bold" />
          Support Us
        </h2>
        <p>If you liked our product, you can consider supporting us!</p>
      </div>

      <button className="bg-muted-background mt-6 h-32 w-full rounded-4xl border"></button>
      <button className="bg-muted-background mt-2 h-32 w-full rounded-4xl border"></button>
    </div>
  )
}
