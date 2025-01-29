import For from "@/components/common/for"
import { useBaseColorStore } from "@/stores/color.store"
import getOptimizedTextColor from "@/utils/get-optimized-text-color"
import { Hexagon } from "@phosphor-icons/react"
import { Color } from "chroma-js"

export default function ColorSlots() {
  const { baseColor } = useBaseColorStore()

  if (!baseColor) return

  return (
    <div className="px-sidebar">
      <ColorDisplay color={baseColor} />

      {/* Color Slots */}

      <div className="mb-4 flex justify-between">
        <For times={6}>{(i) => <Slot index={i} key={`color-slot-${i}`} />}</For>
      </div>

      {/* Buttons */}

      <div className="float-right space-x-3">
        <button>Clean</button>
        <button>Insert</button>
      </div>
    </div>
  )
}

function ColorDisplay({ color }: { color: Color }) {
  return (
    <button
      type="button"
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

      <span className="text-caption no-opsz">{color.hex().toUpperCase()}</span>
    </button>
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
