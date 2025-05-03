import { CircleHalfTilt } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import Copy from "@components/common/copy"
import { RadixPopover } from "@components/common/popover"
import { ContrastType } from "@utils/color"
import getWcagContrastRating from "@utils/get-wcag-rating"
import { useColorModeStore } from "@stores/color-mode.store"
import Playground from "./playground"

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

  return (
    <RadixPopover
      title="Contrast Playground"
      sideOffset={4}
      icon={CircleHalfTilt}
      trigger={
        <div className="hover:bg-muted-background mx-4 flex items-center gap-4 rounded border border-transparent p-2 pr-3 transition-colors select-none active:border-black/10 active:duration-75">
          {/* Indicator */}
          <div
            className="flex size-13 items-center justify-center rounded-xs"
            style={{ background: base.css() }}
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

          {/* Content */}
          <div className="flex grow items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="font-medium capitalize">Luminosity</h2>
              <Copy
                element="p"
                data={getColorString(contrastColor)}
                className="text-caption-bold !text-muted"
              >
                {getRoundedColorString(contrastColor)}
              </Copy>
            </div>

            {/* Contrast Checker */}

            <div className="space-x-1 rounded border bg-white px-2 py-0.5 select-none">
              <span className="text-caption-bold italic opacity-60">
                {getWcagContrastRating(contrastValue)}
              </span>
              <span className="text-caption font-semibold opacity-70">
                {contrastValue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      }
      content={<Playground contrastColor={contrastColor} />}
    />
  )
}
