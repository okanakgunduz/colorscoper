import { Play } from "@phosphor-icons/react"
import For from "@components/common/for"
import Select from "@components/common/select"
import { ColorMode } from "@utils/color"
import cx, { Class } from "@utils/cx"
import { useColorModeStore } from "@stores/color-mode.store"

interface Props {
  className?: Class
}

export default function Actions({ className }: Props) {
  const colorMode = useColorModeStore.use.mode()
  const setColorMode = useColorModeStore.use.setColorMode()

  return (
    <div className={cx(className, "flex h-full items-center gap-4")}>
      <Select
        title="Color Mode"
        value={colorMode}
        onValueChange={(mode) => setColorMode(mode as ColorMode)}
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

      <button className="px-sidebar group hover:bg-muted-background text-accent flex h-full cursor-pointer items-center justify-center gap-1.5 border-l">
        <Play weight="fill" className="size-5 group-active:opacity-50" />
        <span className="text-heading-3 font-normal group-active:opacity-50">
          Export
        </span>
      </button>
    </div>
  )
}
