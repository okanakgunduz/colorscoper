import cx from "@/utils/cx"
import type { ClassValue } from "clsx"
import * as Tabs from "@radix-ui/react-tabs"

interface Props {
  className?: ClassValue
}

export default function Picker({ className }: Props) {
  return (
    <div className={cx(className)}>
      <Tabs.Root
        defaultValue="hue-saturation-wheel"
        className="bg-muted-background relative grid h-full w-full place-items-center"
      >
        <Tabs.List
          aria-label="Select your color picker type."
          className="absolute top-4 -space-x-1.5 rounded-xl border bg-white p-1 text-sm text-gray-600"
        >
          {Object.entries({
            "hue-saturation-wheel": "Hue - Saturation Wheel",
            "hue-white-balance": "Hue - White Balance",
            "saturation-white-balance": "Saturation - White Balance",
          }).map(([key, value]) => (
            <Tabs.Trigger
              value={key}
              className="state-active:bg-muted-accent state-active:text-accent cursor-pointer rounded-lg px-5 py-1"
            >
              {value}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value="hue-saturation-wheel">
          hue-saturation-wheel
        </Tabs.Content>
        <Tabs.Content value="hue-white-balance">hue-white-balance</Tabs.Content>
        <Tabs.Content value="saturation-white-balance">
          saturation-white-balance
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
