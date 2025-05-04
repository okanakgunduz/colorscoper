import { Label } from "@radix-ui/react-label"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { Color } from "chroma-js"
import { useState } from "react"
import Switch from "@components/common/switch"
import cx from "@utils/cx"

interface DemoProps {
  contrastColor: Color
  baseColor: Color
}

type TextSize = "sm" | "md" | "lg"
type FontStyle = "srf" | "s-srf" | "mono" | "disp"

export default function TextDemo({ contrastColor, baseColor }: DemoProps) {
  const [text, setText] = useState("Contrast")
  const [size, setSize] = useState<TextSize>("md")
  const [fontStyle, setFontStyle] = useState<FontStyle>("srf")
  const [inverted, setInverted] = useState<boolean>(false)

  return (
    <main className="mb-2 max-w-full space-y-4 p-2">
      {/* Display */}
      <section
        className="relative aspect-video w-full overflow-hidden rounded transition-colors duration-300"
        style={{
          background: (inverted ? contrastColor : baseColor).css(),
        }}
      >
        <p
          className={cx(
            "absolute inset-0 grid place-items-center px-4 text-center font-semibold text-balance break-all transition-colors duration-300",
            {
              "font-serif": fontStyle === "srf",
              "font-mono": fontStyle === "mono",
            },
          )}
          style={{
            color: (!inverted ? contrastColor : baseColor).css(),
            fontSize: {
              sm: "20px",
              md: "28px",
              lg: "36px",
            }[size],
          }}
        >
          {text || "Contrast"}
        </p>
      </section>

      {/* Controls */}
      <section className="space-y-3 pl-2 select-none">
        {/* Text Content */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="demo-text-content"
            className="text-caption-bold text-muted"
          >
            Text
          </Label>
          <input
            type="text"
            id="demo-text-content"
            className="bg-muted-background focus:border-accent w-36 rounded border border-transparent px-2 py-1 font-medium text-black/90"
            value={text}
            onChange={(e) =>
              e.target.value.length < 14 ? setText(e.target.value) : null
            }
          />
        </div>

        {/* Text Size */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="demo-text-size"
            className="text-caption-bold text-muted"
          >
            Size
          </Label>
          <RadioGroup.Root
            id="demo-text-size"
            value={size}
            onValueChange={(v) => setSize(v as TextSize)}
            className="bg-muted-background *:text-accent flex h-7 w-36 items-stretch justify-stretch overflow-hidden rounded *:grow *:cursor-pointer *:font-medium *:italic *:transition"
          >
            <RadioGroup.Item
              value="sm"
              className="state-checked:bg-accent state-checked:text-white/85"
            >
              <span className="text-xs">Aa</span>
            </RadioGroup.Item>
            <RadioGroup.Item
              value="md"
              className="state-checked:bg-accent state-checked:text-white/85"
            >
              <span className="text-sm">Aa</span>
            </RadioGroup.Item>
            <RadioGroup.Item
              value="lg"
              className="state-checked:bg-accent state-checked:text-white/85"
            >
              <span className="text-base">Aa</span>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </div>

        {/* Font Style */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="demo-text-style"
            className="text-caption-bold text-muted"
          >
            Style
          </Label>
          <RadioGroup.Root
            id="demo-text-style"
            value={fontStyle}
            onValueChange={(v) => setFontStyle(v as FontStyle)}
            className="bg-muted-background flex h-7 w-36 items-stretch justify-stretch overflow-hidden rounded"
          >
            <RadioGroup.Item
              value="srf"
              className="state-checked:bg-accent state-checked:text-white/85 text-accent grow cursor-pointer font-medium transition"
            >
              <span className="font-serif">Aa</span>
            </RadioGroup.Item>
            <RadioGroup.Item
              value="s-srf"
              className="state-checked:bg-accent state-checked:text-white/85 text-accent grow cursor-pointer font-medium transition"
            >
              <span className="">Aa</span>
            </RadioGroup.Item>
            <RadioGroup.Item
              value="mono"
              className="state-checked:bg-accent state-checked:text-white/85 text-accent grow cursor-pointer font-medium transition"
            >
              <span className="font-mono">Aa</span>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </div>

        {/* Inverted? */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="demo-text-invert"
            className="text-caption-bold text-muted cursor-pointer"
          >
            Invert?
          </Label>
          <Switch
            id="demo-text-invert"
            checked={inverted}
            onCheckedChange={(v) => setInverted(v)}
          />
        </div>
      </section>
    </main>
  )
}
