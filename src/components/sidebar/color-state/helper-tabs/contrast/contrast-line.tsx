import { useSidebarStore } from "@/stores/sidebar.store"
import { CircleHalfTilt } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import { useRef } from "react"
import { useColorModeStore } from "@stores/color-mode.store"
import Copy from "@components/common/copy"
import { RadixPopover } from "@components/common/popover"
import { ContrastType } from "@utils/color"
import getWcagContrastRating from "@utils/get-wcag-rating"
import Demo from "./demo"

interface Props {
  type: ContrastType
  base: Color
  contrastColor: Color
  contrastValue: number
}

export default function ContrastLine({
  contrastColor,
  contrastValue,
  base,
  type,
}: Props) {
  const getColorString = useColorModeStore.use.getColorString()
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()

  const insertSlot = useSidebarStore.use.insertSlot()

  const lineRef = useRef(null)

  return (
    <div
      ref={lineRef}
      onClick={() => insertSlot(contrastColor)}
      className="hover:bg-muted-background group mx-4 flex cursor-pointer items-center gap-4 rounded border border-transparent p-2 pr-3 transition-colors select-none active:border-black/10 active:duration-75"
    >
      {/* Indicator */}
      <RadixPopover
        title="Contrast Playground"
        sideOffset={4}
        icon={CircleHalfTilt}
        anchor={lineRef}
        trigger={
          <div
            className="flex size-13 items-center justify-center rounded-sm transition-transform hover:scale-105"
            style={{ background: base.css() }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="flex size-9 items-center justify-center rounded-full"
              style={{ background: contrastColor.css() }}
            >
              <div
                className="size-4 rounded-full"
                style={{ background: base.css() }}
              ></div>
            </div>
          </div>
        }
        content={<Demo contrastColor={contrastColor} />}
      />

      {/* Content */}
      <div className="flex grow items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="font-medium capitalize">{type}</h2>
          <Copy
            element="p"
            data={getColorString(contrastColor)}
            className="text-caption-bold !text-muted hover:!text-black"
          >
            {getRoundedColorString(contrastColor)}
          </Copy>
        </div>

        {/* Contrast Checker */}

        <div className="scale-90 space-x-1 rounded border bg-[#f8f8f8] px-2 py-0.5 transition-colors select-none group-hover:bg-white">
          <span className="text-caption-bold italic opacity-60">
            {getWcagContrastRating(contrastValue)}
          </span>
          <span className="text-caption font-semibold opacity-70">
            {contrastValue.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
