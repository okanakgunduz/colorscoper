import BuyMeCoffee from "@/assets/BuyMeCoffee"
import Github from "@/assets/Github"
import { useGithubStars } from "@/lib/hooks/useGithubStars"
import { useTotalCupsGifted } from "@/lib/hooks/useTotalCupsGifted"
import { Heart } from "@phosphor-icons/react"

export default function SupportUs() {
  const { totalCups } = useTotalCupsGifted()
  const { stars } = useGithubStars("https://github.com/XenoverseUp/colorscope")

  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-heading flex items-center gap-1.5">
          <Heart weight="fill" className="text-pink-500" size={24} />
          Support Us
        </h2>
        <p>If you liked ColorScope, you can consider supporting us!</p>
      </div>

      <a
        href={import.meta.env.VITE_BMAC_PROFILE_URL}
        target="_blank"
        className="ring-accent mt-6 flex h-28 w-full cursor-pointer items-center justify-between rounded-3xl bg-yellow-400 pr-12 pl-8 active:brightness-95"
      >
        <BuyMeCoffee className="max-w-56" />
        <p className="text-sm">
          🍵 <strong>{totalCups ?? 0}</strong> cups gifted.
        </p>
      </a>
      <a
        href="https://github.com/XenoverseUp/colorscope"
        target="_blank"
        className="ring-accent mt-4 flex h-28 w-full cursor-pointer items-center justify-between rounded-3xl bg-slate-900 pr-12 pl-8 active:brightness-95"
      >
        <Github className="max-w-48" />
        <p className="text-sm text-slate-300">
          ⭐ <strong>{stars ?? 0}</strong> stars given.
        </p>
      </a>
    </div>
  )
}
