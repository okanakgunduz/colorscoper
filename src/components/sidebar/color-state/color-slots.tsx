import { useBaseColorStore } from "@/stores/color.store"
import getOptimizedTextColor from "@/utils/get-optimized-text-color"
import { Hexagon } from "@phosphor-icons/react"

export default function ColorSlots() {
  const { baseColor } = useBaseColorStore()

  if (!baseColor) return

  return (
    <div className="px-sidebar">
      <button
        type="button"
        className="mb-4 flex w-full items-center justify-between rounded p-4"
        style={{
          background: baseColor.css(),
          color: getOptimizedTextColor(baseColor).css(),
        }}
      >
        <span className="flex gap-1 font-medium">
          <Hexagon weight="fill" size={20} />
          Base
        </span>

        <span className="text-caption no-opsz">
          {baseColor.hex().toUpperCase()}
        </span>
      </button>

      <div className="mb-4 flex justify-between">
        {new Array(6).fill(null).map((_, i) => (
          <Slot index={i} key={`color-slot-${i}`} />
        ))}
      </div>

      <div className="float-right space-x-3">
        <button>Clean</button>
        <button>Insert</button>
      </div>
    </div>
  )
}

function Slot({ index }: { index: number }) {
  return (
    <button
      data-index={index}
      className="bg-muted-background size-12 rounded border-[1.5px]"
    ></button>
  )
}
