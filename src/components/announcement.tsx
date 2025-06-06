import { appConfig } from "@/config"

export default function Announcement() {
  if (!appConfig.announcement) return null

  return (
    <div className="bg-muted-background text-caption-bold flex h-8 w-full items-center justify-center">
      {appConfig.announcement}
    </div>
  )
}
