import Logo from "@/assets/Logo"
import { parseQuery } from "@/lib/utils/search-query"
import { usePaletteStore } from "@/stores/palette.store"
import { useSelectionStore } from "@/stores/selection.store"
import { useSidebarStore } from "@/stores/sidebar.store"
import { PencilSimple, Plus } from "@phosphor-icons/react"
import chroma from "chroma-js"
import { useLocation, useNavigate } from "react-router"

export default function Export() {
  const { search } = useLocation()
  const navigate = useNavigate()

  const { config } = parseQuery(search) as {
    config: Array<[number, string]>
  }

  const setPaletteColors = usePaletteStore.use.setColors()
  const clearPaletteColors = usePaletteStore.use.clearAll()
  const clearSelection = useSelectionStore.use.clearSelection()
  const resetSidebar = useSidebarStore.use.reset()

  return (
    <div className="w-full">
      <main className="mx-auto mt-8 w-full max-w-2xl px-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo width={40} height={40} />
            <div>
              <h1 className="text-xl font-medium">ColorScope</h1>
              <p className="text-muted text-caption-bold">
                Your reliable design & photography tool.
              </p>
            </div>
          </div>
          <div className="flex items-center select-none">
            <button
              onClick={() => {
                setPaletteColors(config.map(entry => chroma(entry[1])))
                clearSelection()
                resetSidebar()

                navigate("/")
              }}
              className="hover:bg-muted-background flex cursor-pointer flex-col items-center gap-0.5 rounded px-2 pt-1.5 pb-1 transition active:opacity-60"
            >
              <PencilSimple />
              <span className="font-medium">Edit</span>
            </button>
            <button
              onClick={() => {
                clearPaletteColors()
                clearSelection()
                resetSidebar()

                navigate("/")
              }}
              className="hover:bg-muted-background flex cursor-pointer flex-col items-center gap-0.5 rounded px-2 pt-1.5 pb-1 transition active:opacity-60"
            >
              <Plus />
              <span className="font-medium">New</span>
            </button>
          </div>
        </header>
        <hr className="mt-2" />
        <div className="mt-20">
          <h1 className="text-caption-bold">Extracted</h1>
          <pre className="mb-2">{search}</pre>
          <h1 className="text-caption-bold">Decoded</h1>
          <pre className="mb-2">
            {JSON.stringify(parseQuery(search), null, 4)}
          </pre>
        </div>
      </main>
    </div>
  )
}
