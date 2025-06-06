import Logo from "@/assets/Logo"
import Announcement from "@/components/announcement"
import { appConfig } from "@/config"
import useMediaQuery from "@/lib/hooks/useMediaQuery"
import { DeviceMobileCamera } from "@phosphor-icons/react"
import BottomBar from "@components/bottombar"
import Picker from "@components/picker"
import Sidebar from "@components/sidebar"

export default function Editor() {
  const mobile = useMediaQuery("(max-width: 64rem)")

  if (mobile)
    return (
      <main className="flex h-dvh max-h-dvh min-h-dvh flex-col items-stretch">
        <Announcement />
        <div className="flex w-full grow flex-col items-start justify-end space-y-2 p-12">
          <h1 className="flex items-center gap-1 text-xl font-medium">
            <Logo width={28} height={28} />
            <span>{appConfig.appName}</span>
          </h1>
          <p className="text-muted flex items-center">
            <DeviceMobileCamera />
            Please use your desktop to continue.
          </p>
        </div>
      </main>
    )

  return (
    <main className="flex h-dvh max-h-dvh min-h-dvh flex-col items-stretch">
      <Announcement />
      <div className="grid w-full grow grid-cols-[21rem_1fr] grid-rows-[1fr_3.75rem] divide-x divide-y overflow-hidden">
        <Sidebar className="col-span-1 row-span-2 block" />
        <Picker className="col-span-1 row-span-1 flex min-h-0 overflow-hidden" />
        <BottomBar className="col-span-1 row-span-1" />
      </div>
    </main>
  )
}
