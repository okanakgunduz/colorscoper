import { appConfig } from "@/config"

export default function Announcement() {
  if (!appConfig.announcement) return null

  return (
    <div className="bg-muted-background text-caption-bold flex h-auto w-full shrink-0 items-center justify-center">
      {appConfig.announcement}
    </div>
  )
}
