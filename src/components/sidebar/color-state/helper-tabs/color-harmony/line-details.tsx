import { useMemo } from "react"
import For from "@components/common/for"
import { rotateHue } from "@utils/color"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import { useColorModeStore } from "@stores/color-mode.store"
import { useSelectionStore } from "@stores/selection.store"
import Copy from "@components/common/copy"

const HUE_DIFFERENCE_RATE = 20

interface Props {
  section: number
}

export default function LineDetails({ section }: Props) {
  const getHueRotated = useSelectionStore.use.getHueRotated()
  const getColorString = useColorModeStore.use.getColorString()

  const baseColor = useMemo(
    () => getHueRotated(section * 30)!,
    [getHueRotated, section],
  )

  return (
    <div className="grow">
      <header className="border-b border-black/10 text-heading-2 p-3 pt-2 flex flex-col gap-1.5">
        <div className="flex justify-between items-center p-1">
          <p className="text-caption-bold">Section Color</p>
          <span className="text-caption opacity-60">{section * 30}° rotation</span>
        </div>
        <div className="w-full h-10 rounded" style={{ background: baseColor.css() }}>
          <Copy data={getColorString(baseColor)} className="w-full h-full flex items-center justify-center" style={{ color: getOptimizedTextColor(baseColor).css() }}>
            {getColorString(baseColor)}
          </Copy>
        </div>
      </header>
      <div className="grid w-full grid-cols-[1fr_1fr_1fr] place-items-stretch gap-x-0.5 gap-y-0.5 p-3 pt-4">
        <div className="text-caption grid place-items-center pb-2 opacity-80"> -{HUE_DIFFERENCE_RATE}° </div>
        <div className="text-caption grid place-items-center pb-2">Self</div>
        <div className="text-caption grid place-items-center pb-2 opacity-80"> +{HUE_DIFFERENCE_RATE}°</div>

        <For times={9}>
          {(i) => (
            <>
              <div
                className="flex h-8 items-center justify-center rounded"
                style={{
                  background: rotateHue(baseColor, -HUE_DIFFERENCE_RATE)
                    .luminance(0.1 * i + 0.1)
                    .css()
                }}
              >
                <span
                  className="text-caption-bold opacity-60"
                  style={{
                    color: getOptimizedTextColor(
                      rotateHue(baseColor, -HUE_DIFFERENCE_RATE).luminance(0.1 * i + 0.1),
                    ).css(),
                  }}
                >
                  {9 - i}00
                </span>
              </div>
              <div
                className="flex h-8 items-center justify-center rounded"
                style={{
                  background: baseColor.luminance(0.1 * i + 0.1).css(),
                }}
              >
                <span
                  className="text-caption-bold opacity-60"
                  style={{
                    color: getOptimizedTextColor(
                      baseColor.luminance(0.1 * i + 0.1),
                    ).css(),
                  }}
                >
                  {9 - i}00
                </span>
              </div>
              <div
                className="flex h-8 items-center justify-center rounded"
                style={{
                  background: rotateHue(baseColor, 30)
                    .luminance(0.1 * i + 0.1)
                    .css(),
                }}
              >
                <span
                  className="text-caption-bold opacity-60"
                  style={{
                    color: getOptimizedTextColor(
                      rotateHue(baseColor, 30).luminance(0.1 * i + 0.1),
                    ).css(),
                  }}
                >
                  {9 - i}00
                </span>
              </div>
            </>
          )}
        </For>
      </div>
    </div>
  )
}
