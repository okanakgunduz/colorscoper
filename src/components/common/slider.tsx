import * as RadixSlider from "@radix-ui/react-slider"
import { useState } from "react"
import { useDebounce } from "@hooks/useThrottle"
import cx, { Class } from "@utils/cx"

interface Props {
  className?: Class
  value: number
  onValueChange: (value: number) => void
  min: number
  max: number
  step?: number
  debounceTimeout?: number
  format?: (value: number) => string
}

export default function Slider({
  className,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  debounceTimeout = 200,
  format = (value) => value.toString(),
}: Props) {
  const [localValue, setLocalValue] = useState(value)
  const debounce = useDebounce()

  const handleChange = (val: number[]) => {
    setLocalValue(val[0])
    debounce(() => onValueChange(val[0]), debounceTimeout)
  }

  return (
    <RadixSlider.Root
      className={cx(className, "w-full")}
      value={[localValue]}
      onValueChange={handleChange}
      onPointerUp={() => onValueChange(localValue)}
      min={min}
      max={max}
      step={step}
    >
      {/* <RadixSlider.Track className="bg-accent block h-full w-full"></RadixSlider.Track> */}

      <RadixSlider.Track className="relative flex h-2 w-full items-center justify-center rounded border bg-gray-300">
        <RadixSlider.Range className="bg-accent absolute h-full rounded" />
        <RadixSlider.Thumb className="bg-muted-accent text-accent text-caption-bold cursor-grab rounded p-1 select-none active:cursor-grabbing">
          {format(localValue)}
        </RadixSlider.Thumb>
      </RadixSlider.Track>
    </RadixSlider.Root>
  )
}
