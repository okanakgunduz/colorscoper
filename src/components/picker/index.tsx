import cx from "@/utils/cx"
import type { ClassValue } from "clsx"
import * as Tabs from "@radix-ui/react-tabs"

interface Props {
  className?: ClassValue
}

export default function Picker({ className }: Props) {
  return (
    <div className={cx(className)}>
      <Tabs.Root defaultValue="hue-saturation-wheel" className="bg-muted-background h-full w-full grid place-items-center relative">
        <Tabs.List
          aria-label="Select your color picker type."
          className="absolute top-4 bg-white border rounded-xl -space-x-1 p-1 text-sm text-gray-600 font-medium"
        >
          <Tabs.Trigger
            value="hue-saturation-wheel"
            className="px-4 py-1 radix-state-active:bg-muted-accent radix-state-active:text-accent transition-all rounded-lg"
          >
            Hue - Saturation Wheel
          </Tabs.Trigger>
          <Tabs.Trigger
            value="hue-white-balance"
            className="px-4 py-1 radix-state-active:bg-muted-accent radix-state-active:text-accent transition-all rounded-lg"
          >
            Hue - White Balance
          </Tabs.Trigger>
          <Tabs.Trigger
            value="saturation-white-balance"
            className="px-4 py-1 radix-state-active:bg-muted-accent radix-state-active:text-accent transition-all rounded-lg"
          >
            Saturation - White Balance
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="hue-saturation-wheel">hue-saturation-wheel</Tabs.Content>
        <Tabs.Content value="hue-white-balance">hue-white-balance</Tabs.Content>
        <Tabs.Content value="saturation-white-balance">saturation-white-balance</Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
