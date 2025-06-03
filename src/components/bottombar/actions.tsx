import SceneAnalyzer from "@/components/bottombar/scene-analyzer"
import { usePaletteStore } from "@/stores/palette.store"
import { ChartDonut, Play } from "@phosphor-icons/react"
import { useColorModeStore } from "@stores/color-mode.store"
import For from "@components/common/for"
import Modal from "@components/common/modal"
import Select from "@components/common/select"
import { ColorMode } from "@utils/color"
import cx, { Class } from "@utils/cx"
import Export from "./export"

interface Props {
  className?: Class
}

export default function Actions({ className }: Props) {
  const colorMode = useColorModeStore.use.mode()
  const setColorMode = useColorModeStore.use.setColorMode()

  const paletteColors = usePaletteStore.use.colors()

  return (
    <div className={cx(className, "flex h-full items-center")}>
      <Select
        className="mr-4"
        title="Color Mode"
        value={colorMode}
        onValueChange={mode => setColorMode(mode as ColorMode)}
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

      <Modal content={() => <SceneAnalyzer />}>
        <button className="px-sidebar group hover:bg-muted-background text-accent flex h-full cursor-pointer items-center justify-center gap-1.5 border-l select-none">
          <ChartDonut
            weight="fill"
            className="size-5 group-active:opacity-50"
          />
          <span className="text-heading-3 hidden font-normal group-active:opacity-50 xl:inline">
            Scene Analyzer
          </span>
        </button>
      </Modal>

      <Modal content={() => <Export />}>
        <button
          disabled={paletteColors.length < 3}
          {...(paletteColors.length < 3 && { "data-disabled": true })}
          className="px-sidebar disabled:text-muted group hover:bg-muted-background text-accent flex h-full cursor-pointer items-center justify-center gap-1.5 border-l select-none disabled:pointer-events-none disabled:opacity-75"
        >
          <Play weight="fill" className="size-5 group-active:opacity-50" />
          <span className="text-heading-3 hidden font-normal group-active:opacity-50 xl:inline">
            Export
          </span>
        </button>
      </Modal>
    </div>
  )
}
