import cx from "@/utils/cx"
import type { ClassValue } from "clsx"
import * as Tabs from "@radix-ui/react-tabs"
import HueSaturationWheel from "./hue-saturation-wheel"
import HueWBMap from "./hue-wb-map"
import SaturationWBPyramid from "./saturation-wb-pyramid"

interface Props {
  className?: ClassValue
}

enum TabKeys {
  HueSaturationWheel = "hue-saturation-wheel",
  HueWBMap = "hue-luminosity-map",
  SaturationWBPyramid = "saturation-white-balance",
}

export default function Picker({ className }: Props) {
  return (
    <div className={cx(className)}>
      <Tabs.Root
        defaultValue={TabKeys.HueWBMap}
        className="bg-muted-background relative grid h-full w-full place-items-center"
      >
        <Tabs.List
          aria-label="Select your color picker type."
          className="absolute top-4 -space-x-1.5 rounded-xl border bg-white p-1 text-sm text-gray-500"
        >
          {Object.entries({
            [TabKeys.HueSaturationWheel]: "Hue &#45; Saturation Wheel",
            [TabKeys.HueWBMap]: "Hue &#45; W/B Map",
            [TabKeys.SaturationWBPyramid]: "Saturation &#45; W/B Pyramid",
          }).map(([key, value]) => (
            <Tabs.Trigger
              key={`tab-${key}`}
              value={key}
              className="state-active:bg-muted-accent state-active:text-accent cursor-pointer rounded-lg px-5 py-1 transition"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ))}
        </Tabs.List>

        {Object.entries({
          [TabKeys.HueSaturationWheel]: HueSaturationWheel,
          [TabKeys.HueWBMap]: HueWBMap,
          [TabKeys.SaturationWBPyramid]: SaturationWBPyramid,
        }).map(([key, Component]) => (
          <Tabs.Content
            key={`tab-content-${key}`}
            value={key}
            className="size-full"
          >
            <Component />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  )
}
