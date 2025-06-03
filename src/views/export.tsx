import Logo from "@/assets/Logo"
import For from "@/components/common/for"
import Select from "@/components/common/select"
import ColorDivision from "@/components/export/color-division"
import EditorPreview from "@/components/export/editor-preview"
import { ColorMode } from "@/lib/utils/color"
import { parseQuery } from "@/lib/utils/search-query"
import { useColorModeStore } from "@/stores/color-mode.store"
import { usePaletteStore } from "@/stores/palette.store"
import { useSelectionStore } from "@/stores/selection.store"
import { useSidebarStore } from "@/stores/sidebar.store"
import {
  LinkSimpleHorizontal,
  PencilSimple,
  Plus,
  Printer,
} from "@phosphor-icons/react"
import chroma from "chroma-js"
import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router"

export default function Export() {
  const { search } = useLocation()
  const navigate = useNavigate()

  const colorMode = useColorModeStore.use.mode()
  const setColorMode = useColorModeStore.use.setColorMode()

  const setPaletteColors = usePaletteStore.use.setColors()
  const clearPaletteColors = usePaletteStore.use.clearAll()
  const clearSelection = useSelectionStore.use.clearSelection()
  const setPaletteSelection = useSelectionStore.use.setPaletteSelection()
  const resetSidebar = useSidebarStore.use.reset()

  const { config } = useMemo(
    () => parseQuery(search) as { config: Array<[number, string]> },
    [search],
  )

  const foreground = useMemo(
    () =>
      config
        .filter(([isBackground]) => !isBackground)
        .map(([, hex]) => chroma(hex)),
    [config],
  )

  const background = useMemo(
    () =>
      config
        .filter(([isBackground]) => isBackground)
        .map(([, hex]) => chroma(hex)),
    [config],
  )

  return (
    <div className="w-full">
      <main className="mx-auto my-8 w-full max-w-3xl px-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo width={40} height={40} />
            <div>
              <h1 className="text-heading">ColorScope</h1>
              <p className="text-muted text-caption-bold">
                Your reliable design & photography tool.
              </p>
            </div>
          </div>
          <div className="flex items-center select-none">
            <button
              onClick={window.print}
              className="hover:bg-muted-background flex cursor-pointer flex-col items-center gap-0.5 rounded px-2 pt-1.5 pb-1 transition active:opacity-60 print:hidden"
            >
              <Printer />
              <span className="font-medium">Print</span>
            </button>
            <button
              onClick={() => {
                setPaletteColors(config.map(entry => chroma(entry[1])))
                setPaletteSelection(config.map(entry => chroma(entry[1]))[0], 0)
                resetSidebar()

                navigate("/")
              }}
              className="hover:bg-muted-background flex cursor-pointer flex-col items-center gap-0.5 rounded px-2 pt-1.5 pb-1 transition active:opacity-60 print:hidden"
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
              className="hover:bg-muted-background flex cursor-pointer flex-col items-center gap-0.5 rounded px-2 pt-1.5 pb-1 transition active:opacity-60 print:hidden"
            >
              <Plus />
              <span className="font-medium">New</span>
            </button>
            <a
              href={`${import.meta.env.VITE_BASE_URL}/export${search}`}
              className="bg-muted-accent text-accent hidden flex-col items-center rounded-lg px-2 py-1 print:flex"
            >
              <LinkSimpleHorizontal size={20} />
              <span className="font-medium">Playground</span>
            </a>
          </div>
        </header>

        <hr className="mt-2 mb-4" />

        <Select
          className="w-fit"
          title="Color Mode"
          value={colorMode}
          onValueChange={setColorMode}
        >
          <For
            each={Object.entries(ColorMode)}
            renderItem={([key, value]) => (
              <Select.Option key={key} value={value}>
                {key}
              </Select.Option>
            )}
          />
        </Select>

        {/* Main Content */}
        <div className="mt-10 space-y-8">
          <ColorDivision
            title="Foreground"
            subtitle="The foreground colors of the palette."
            colors={foreground}
          />

          <ColorDivision
            title="Background"
            subtitle="The background colors of the palette."
            colors={background}
          />

          <hr />

          <EditorPreview
            className="print:hidden"
            colors={{
              foreground,
              background,
            }}
          />
        </div>
      </main>
    </div>
  )
}
