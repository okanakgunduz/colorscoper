import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import chroma from "chroma-js"
import { useCallback, useMemo, useState } from "react"
import Button from "@components/common/button"
import Copy from "@components/common/copy"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import romanize from "@utils/romanize"
import { useColorModeStore } from "@stores/color-mode.store"
import { useSelectionStore } from "@stores/selection.store"

interface Props {
  section: number
}

const HUE_SHIFT = 20
const SECTION_ANGLE = 30
const STEPS = 8
const MAX_LUMINOSITY = 0.875

export default function LineDetails({ section }: Props) {
  const [hueOffset, setHueOffset] = useState(0)
  const getHueRotated = useSelectionStore.use.getHueRotated()
  const getColorString = useColorModeStore.use.getColorString()
  const baseColor = getHueRotated(section * SECTION_ANGLE + hueOffset)!

  const showLeftButton = hueOffset >= -HUE_SHIFT && hueOffset !== -HUE_SHIFT

  const showRightButton = hueOffset <= HUE_SHIFT && hueOffset !== HUE_SHIFT

  const handleDecrease = useCallback(() => {
    setHueOffset(hueOffset === HUE_SHIFT ? 0 : -HUE_SHIFT)
  }, [hueOffset])

  const handleIncrease = useCallback(() => {
    setHueOffset(hueOffset === -HUE_SHIFT ? 0 : HUE_SHIFT)
  }, [hueOffset])

  const luminositySteps = useMemo(
    () =>
      Array.from({ length: STEPS - 1 }, (_, i) => {
        const luminosity = (STEPS - 1 - i) * (MAX_LUMINOSITY / (STEPS - 1))
        return {
          color: chroma(baseColor).luminance(luminosity),
          luminosity,
        }
      }),
    [baseColor],
  )

  return (
    <div className="grow space-y-6 overflow-hidden p-4">
      <div className="relative h-8 shrink-0 text-center">
        {showLeftButton && (
          <Button
            type="default"
            content="icon-only"
            className="absolute left-0 h-8 w-8"
            onClick={handleDecrease}
          >
            <CaretLeft weight="bold" />
          </Button>
        )}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h3 className="font-medium">Section {romanize(section + 1)}</h3>
          <p className="text-sm text-neutral-400">
            {section * SECTION_ANGLE + hueOffset}°
          </p>
        </div>
        {showRightButton && (
          <Button
            type="default"
            content="icon-only"
            className="absolute right-0 h-8 w-8"
            onClick={handleIncrease}
          >
            <CaretRight weight="bold" />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {luminositySteps.map(({ color, luminosity }, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="h-8 grow rounded transition-[background-color] duration-300"
              style={{ backgroundColor: color.css() }}
            >
              <div className="flex h-full items-center justify-between px-4">
                <span
                  className="text-xs"
                  style={{
                    color: getOptimizedTextColor(color).css(),
                  }}
                >
                  {(luminosity * 100).toFixed(1)}%
                </span>
                <Copy
                  data={getColorString(color)}
                  className="text-xs"
                  style={{
                    color: getOptimizedTextColor(color).css(),
                  }}
                >
                  {getColorString(color)}
                </Copy>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
