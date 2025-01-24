import cx from "@/utils/cx"
import type { ClassValue } from "clsx"
import * as Tabs from "@radix-ui/react-tabs"
import HueSaturationWheel from "./hue-saturation-wheel"
import HueWhiteBalance from "./hue-white-balance"
import SaturationWhiteBalance from "./saturation-white-balance"

interface Props {
  className?: ClassValue
}

enum TabKeys {
  HueSaturationWheel = "hue-saturation-wheel",
  HueWhiteBalance = "hue-white-balance",
  SaturationWhiteBalance = "saturation-white-balance",
}

export default function Picker({ className }: Props) {
  return (
    <div className={cx(className)}>
      <Tabs.Root
        defaultValue={TabKeys.HueWhiteBalance}
        className="bg-muted-background relative grid h-full w-full place-items-center"
      >
        <Tabs.List
          aria-label="Select your color picker type."
          className="absolute top-4 -space-x-1.5 rounded-xl border bg-white p-1 text-sm text-gray-600"
        >
          {Object.entries({
            [TabKeys.HueSaturationWheel]: "Hue - Saturation Wheel",
            [TabKeys.HueWhiteBalance]: "Hue - White Balance",
            [TabKeys.SaturationWhiteBalance]: "Saturation - White Balance",
          }).map(([key, value]) => (
            <Tabs.Trigger
              key={`tab-${key}`}
              value={key}
              className="state-active:bg-muted-accent state-active:text-accent cursor-pointer rounded-lg px-5 py-1"
            >
              {value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {Object.entries({
          [TabKeys.HueSaturationWheel]: HueSaturationWheel,
          [TabKeys.HueWhiteBalance]: HueWhiteBalance,
          [TabKeys.SaturationWhiteBalance]: SaturationWhiteBalance,
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
