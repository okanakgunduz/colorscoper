import { Label } from "@radix-ui/react-label"
import { Color } from "chroma-js"
import { FC, useState } from "react"
import Select from "@components/common/select"
import Switch from "@components/common/switch"
import Flower from "./patterns/flower"
import RandomShapes from "./patterns/random-shapes"
import Stripes from "./patterns/stripes"

interface DemoProps {
  contrastColor: Color
  baseColor: Color
}

type Demo = "flowers" | "random-shapes" | "stripes"

export default function PatternDemo({ contrastColor, baseColor }: DemoProps) {
  const [demo, setDemo] = useState<Demo>("flowers")
  const [inverted, setInverted] = useState<boolean>(false)

  return (
    <main className="mb-2 max-w-full space-y-4 p-2">
      {/* Display */}
      <section className="relative aspect-video w-full overflow-hidden rounded">
        {(
          {
            flowers: Flower,
            "random-shapes": RandomShapes,
            stripes: Stripes,
          } as Record<Demo, FC>
        )[demo]({
          backgroundColor: !inverted ? baseColor.css() : contrastColor.css(),
          foregroundColor: !inverted ? contrastColor.css() : baseColor.css(),
        })}
      </section>

      {/* Controls */}
      <section className="space-y-3 pl-2 select-none">
        <div className="flex items-center justify-between pr-1">
          <Label
            htmlFor="demo-pattern-select"
            className="text-caption-bold text-muted"
          >
            Pattern
          </Label>
          <Select value={demo} onValueChange={(v) => setDemo(v as Demo)}>
            <Select.Option value="flowers">Flowers</Select.Option>
            <Select.Option value="random-shapes">Random Shapes</Select.Option>
            <Select.Option value="stripes">Stripes</Select.Option>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label
            htmlFor="demo-pattern-invert"
            className="text-caption-bold text-muted cursor-pointer"
          >
            Invert?
          </Label>
          <Switch
            id="demo-pattern-invert"
            checked={inverted}
            onCheckedChange={(v) => setInverted(v)}
          />
        </div>
      </section>
    </main>
  )
}
