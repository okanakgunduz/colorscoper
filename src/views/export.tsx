import Logo from "@/assets/Logo"
import For from "@/components/common/for"
import Select from "@/components/common/select"
import ColorDivision from "@/components/export/color-division"
import EditorPreview from "@/components/export/editor-preview"
import SupportUs from "@/components/export/support-us"
import { ToolboxButton, ToolboxLink } from "@/components/export/toolbox"
import useCopyToClipboard from "@/lib/hooks/useCopyToClipboard"
import { ColorMode } from "@/lib/utils/color"
import { parseQuery } from "@/lib/utils/search-query"
import { useColorModeStore } from "@/stores/color-mode.store"
import { usePaletteStore } from "@/stores/palette.store"
import { useSelectionStore } from "@/stores/selection.store"
import { useSidebarStore } from "@/stores/sidebar.store"
import {
  ClipboardText,
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

  const { copy } = useCopyToClipboard({
    data: `${window.location.origin}/export${search}`,
  })

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
            <ToolboxButton
              onClick={() => {
                setPaletteColors(config.map(entry => chroma(entry[1])))
                setPaletteSelection(config.map(entry => chroma(entry[1]))[0], 0)
                resetSidebar()

                navigate("/")
              }}
              icon={PencilSimple}
              title="Edit"
            />

            <ToolboxButton
              onClick={() => {
                clearPaletteColors()
                clearSelection()
                resetSidebar()

                navigate("/")
              }}
              icon={Plus}
              title="New"
            />

            <ToolboxLink
              href={`${window.location.origin}/export${search}`}
              icon={LinkSimpleHorizontal}
              title="Edit"
              className="text-accent bg-muted-accent hidden print:flex"
            />

            <ToolboxButton onClick={copy} icon={ClipboardText} title="Copy" />

            <ToolboxButton
              onClick={window.print}
              icon={Printer}
              title="Print"
            />
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

          <hr className="print:hidden" />

          <EditorPreview
            className="print:hidden"
            colors={{
              foreground,
              background,
            }}
          />

          <hr className="break-before-page" />
          <SupportUs />
        </div>
      </main>
    </div>
  )
}
