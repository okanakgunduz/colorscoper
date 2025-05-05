import { Label } from "@radix-ui/react-label"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { Fragment, useMemo, useState } from "react"
import Copy from "@components/common/copy"
import For from "@components/common/for"
import { rotateHue } from "@utils/color"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import { useColorModeStore } from "@stores/color-mode.store"
import { useSelectionStore } from "@stores/selection.store"
import { useSidebarStore } from "@stores/sidebar.store"

interface Props {
  section: number
}

type Rotation = "5" | "10" | "15"

export default function LineDetails({ section }: Props) {
  const [rotation, setRotation] = useState<Rotation>("10")

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
      {/* Header */}
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

      {/* Coverage Slider */}
      <div className="flex items-center justify-between gap-8 border-b py-3 pr-4 pl-4">
        <Label
          htmlFor="coverage-slider"
          className="text-caption-bold text-muted"
        >
          Reach
        </Label>

        <RadioGroup.Root
          id="coverage-slider"
          value={rotation}
          onValueChange={(v) => setRotation(v as Rotation)}
          className="bg-muted-background flex h-7 w-36 items-stretch justify-stretch overflow-hidden rounded"
        >
          <RadioGroup.Item
            value="5"
            className="text-caption-bold state-checked:bg-accent state-checked:text-white/85 text-accent grow cursor-pointer transition"
          >
            5°
          </RadioGroup.Item>
          <RadioGroup.Item
            value="10"
            className="text-caption-bold state-checked:bg-accent state-checked:text-white/85 text-accent grow cursor-pointer transition"
          >
            10°
          </RadioGroup.Item>
          <RadioGroup.Item
            value="15"
            className="text-caption-bold state-checked:bg-accent state-checked:text-white/85 text-accent grow cursor-pointer transition"
          >
            15°
          </RadioGroup.Item>
        </RadioGroup.Root>
      </div>

      {/* Line Details */}
      <div className="grid w-full grid-cols-[1fr_1fr_1fr] place-items-stretch gap-x-1.5 gap-y-1 p-3 pt-4">
        <div className="text-caption grid place-items-center pb-2 opacity-80">
          -{rotation}°
        </div>
        <div className="text-caption grid place-items-center pb-2">Self</div>
        <div className="text-caption grid place-items-center pb-2 opacity-80">
          +{rotation}°
        </div>

        <For
          times={9}
          renderItem={(i) => (
            <Fragment key={`line-details-lum-${i}`}>
              <div
                className="flex h-8 cursor-pointer items-center justify-center rounded transition duration-100 select-none active:scale-95"
                style={{
                  background: rotateHue(baseColor, -rotation)
                    .luminance(0.1 * i + 0.1)
                    .css(),
                }}
                onClick={() =>
                  insertSlot(
                    rotateHue(baseColor, -rotation).luminance(0.1 * i + 0.1),
                  )
                }
              >
                <span
                  className="text-caption-bold opacity-60"
                  style={{
                    color: getOptimizedTextColor(
                      rotateHue(baseColor, -rotation).luminance(0.1 * i + 0.1),
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
                  background: rotateHue(baseColor, +rotation)
                    .luminance(0.1 * i + 0.1)
                    .css(),
                }}
                onClick={() =>
                  insertSlot(
                    rotateHue(baseColor, +rotation).luminance(0.1 * i + 0.1),
                  )
                }
              >
                <span
                  className="text-caption-bold opacity-60"
                  style={{
                    color: getOptimizedTextColor(
                      rotateHue(baseColor, +rotation).luminance(0.1 * i + 0.1),
                    ).css(),
                  }}
                >
                  {9 - i}00
                </span>
              </div>
            </Fragment>
          )}
        />
      </div>
    </div>
  )
}
