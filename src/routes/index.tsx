import BottomBar from "@/components/bottombar"
import Picker from "@/components/picker"
import Sidebar from "@/components/sidebar"

export default function Editor() {
  return (
    <main className="grid h-screen grid-cols-[21rem_1fr] grid-rows-[1fr_4rem] divide-x divide-y overflow-hidden">
      <Sidebar className="col-span-1 row-span-2" />
      <Picker className="col-span-1 row-span-1" />
      <BottomBar className="col-span-1 row-span-1" />
      <div />
    </main>
  )
}
