import BottomBar from "@/components/bottombar.tsx"
import Help from "@/components/help"
import Picker from "@/components/picker"
import Sidebar from "@/components/sidebar"

export default function Editor() {
  return (
    <main className="grid grid-cols-[1fr,18rem] grid-rows-[1fr,4rem] h-screen overflow-hidden divide-x divide-y">
      <Picker className="col-span-1 row-span-1" />
      <Sidebar className="col-span-1 row-span-2" />
      <BottomBar className="col-span-1 row-span-1" />
      <Help className="absolute right-5 bottom-5" />
    </main>
  )
}
