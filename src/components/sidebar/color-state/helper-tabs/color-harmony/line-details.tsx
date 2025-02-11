import { Fragment, useMemo } from "react"
import Copy from "@components/common/copy"
import For from "@components/common/for"
import { rotateHue } from "@utils/color"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import { useColorModeStore } from "@stores/color-mode.store"
import { useSelectionStore } from "@stores/selection.store"
import { useSidebarStore } from "@stores/sidebar.store"

const HUE_DIFFERENCE_RATE = 20

interface Props {
  section: number
}

export default function LineDetails({ section }: Props) {
  const getHueRotated = useSelectionStore.use.getHueRotated()
  const getColorString = useColorModeStore.use.getColorString()
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()

  const baseColor = useMemo(
    () => getHueRotated(section * 30)!,
    [getHueRotated, section],
  )

  const insertSlot = useSidebarStore.use.insertSlot()

  return (
    <div className="grow">
      <header className="text-heading-2 flex flex-col gap-1.5 border-b border-black/10 p-3 pt-2">
        <div className="flex items-center justify-between p-1">
          <p className="text-caption-bold">Section Color</p>
          <span className="text-caption opacity-60">
            {section * 30}° rotation
          </span>
        </div>
        <div
          className="h-10 w-full rounded"
          style={{ background: baseColor.css() }}
        >
          <Copy
            data={getColorString(baseColor)}
            className="flex h-full w-full items-center justify-center"
            style={{ color: getOptimizedTextColor(baseColor).css() }}
          >
            {getRoundedColorString(baseColor)}
          </Copy>
        </div>
      </header>
      <div className="grid w-full grid-cols-[1fr_1fr_1fr] place-items-stretch gap-x-1.5 gap-y-1 p-3 pt-4">
        <div className="text-caption grid place-items-center pb-2 opacity-80">
          -{HUE_DIFFERENCE_RATE}°
        </div>
        <div className="text-caption grid place-items-center pb-2">Self</div>
        <div className="text-caption grid place-items-center pb-2 opacity-80">
          +{HUE_DIFFERENCE_RATE}°
        </div>

        <For times={9}>
          {(i) => (
            <Fragment key={`line-details-lum-${i}`}>
              <div
                className="flex h-8 cursor-pointer items-center justify-center rounded transition duration-100 select-none active:scale-95"
                style={{
                  background: rotateHue(baseColor, -HUE_DIFFERENCE_RATE)
                    .luminance(0.1 * i + 0.1)
                    .css(),
                }}
                onClick={() =>
                  insertSlot(
                    rotateHue(baseColor, -HUE_DIFFERENCE_RATE).luminance(
                      0.1 * i + 0.1,
                    ),
                  )
                }
              >
                <span
                  className="text-caption-bold opacity-60"
                  style={{
                    color: getOptimizedTextColor(
                      rotateHue(baseColor, -HUE_DIFFERENCE_RATE).luminance(
                        0.1 * i + 0.1,
                      ),
                    ).css(),
                  }}
                >
                  {9 - i}00
                </span>
              </div>
              <div
                className="flex h-8 cursor-pointer items-center justify-center rounded transition duration-100 select-none active:scale-95"
                style={{
                  background: baseColor.luminance(0.1 * i + 0.1).css(),
                }}
                onClick={() => insertSlot(baseColor.luminance(0.1 * i + 0.1))}
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
                className="flex h-8 cursor-pointer items-center justify-center rounded transition duration-100 select-none active:scale-95"
                style={{
                  background: rotateHue(baseColor, 30)
                    .luminance(0.1 * i + 0.1)
                    .css(),
                }}
                onClick={() =>
                  insertSlot(rotateHue(baseColor, 30).luminance(0.1 * i + 0.1))
                }
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
            </Fragment>
          )}
        </For>
      </div>
    </div>
  )
}
