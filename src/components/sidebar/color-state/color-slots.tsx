import Button from "@components/common/button"
import For from "@components/common/for"
import {
  BaseColorSelectionType,
  useBaseColorStore,
} from "@stores/base-color.store"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import { Hexagon } from "@phosphor-icons/react"
import { ColumnsPlusRight } from "@phosphor-icons/react/dist/ssr"
import { Color } from "chroma-js"
import useCopyToClipboard from "@hooks/useCopyToClipboard"
import useColorToString from "@hooks/useColorToString"
import { useRef } from "react"
import { useHover } from "@/hooks/useHover"

export default function ColorSlots() {
  const { selectionType, baseColor } = useBaseColorStore()

  if (selectionType === BaseColorSelectionType.None) return

  return (
    <div className="px-sidebar">
      <ColorDisplay color={baseColor} />

      {/* Color Slots */}

      <div className="mb-4 flex justify-between">
        <For times={6}>{(i) => <Slot index={i} key={`color-slot-${i}`} />}</For>
      </div>

      {/* Buttons */}

      <div className="float-right flex items-center gap-0.5">
        <Button>Clean</Button>
        <Button type="fill" icon={ColumnsPlusRight}>
          Insert
        </Button>
      </div>
    </div>
  )
}

function ColorDisplay({ color }: { color: Color }) {
  const colorToString = useColorToString()
  const [ref, hovering] = useHover<HTMLButtonElement>()
  const { copied, copy } = useCopyToClipboard({
    data: colorToString(color),
  })

  return (
    <div
      className="mb-3 flex w-full items-center justify-between rounded p-4"
      style={{
        background: color.css(),
        color: getOptimizedTextColor(color).css(),
      }}
    >
      <span className="flex gap-1 font-medium">
        <Hexagon weight="fill" size={20} />
        Base
      </span>

      <button
        type="button"
        onClick={copy}
        className="text-caption no-opsz w-16 cursor-pointer text-end"
        ref={ref}
      >
        {copied ? "Copied!" : hovering ? "Copy" : colorToString(color)}
      </button>
    </div>
  )
}

function Slot({ index }: { index: number }) {
  return (
    <button
      data-index={index}
      className="bg-muted-background size-10 rounded border-[1.5px]"
    ></button>
  )
}
