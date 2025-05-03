import { Label } from "@radix-ui/react-label"
import * as RadioGroup from "@radix-ui/react-radio-group"
import * as Tabs from "@radix-ui/react-tabs"
import chroma, { Color } from "chroma-js"
import { useState } from "react"
import For from "@components/common/for"
import cx from "@utils/cx"
import { useSelectionStore } from "@stores/selection.store"

interface Props {
  contrastColor: Color
}

enum TabKeys {
  Text = "text",
  Pattern = "pattern",
}

export default function Playground({ contrastColor }: Props) {
  const baseColor: Color =
    useSelectionStore.use.color()?.value ?? chroma("#fff")

  return (
    <div className="grid min-h-48 place-items-center">
      <Tabs.Root defaultValue={TabKeys.Text} className="h-full w-full">
        {/* Triggers */}
        <Tabs.List
          aria-label="Select your demonstration type."
          className="text-caption space-x-1 border-b bg-white px-2 py-1.5 text-gray-600"
        >
          <For
            each={Object.entries({
              [TabKeys.Text]: "Text",
              [TabKeys.Pattern]: "Pattern",
            })}
            renderItem={([key, value]) => (
              <Tabs.Trigger
                key={`tab-${key}`}
                value={key}
                className="state-active:bg-muted-accent hover:bg-muted-background state-active:text-accent cursor-pointer rounded px-2 py-1 font-[480] transition"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            )}
          />
        </Tabs.List>

        {/* Playground Content */}

        <For
          each={Object.entries({
            [TabKeys.Text]: TextDemo,
            [TabKeys.Pattern]: PatternDemo,
          })}
          renderItem={([key, Component]) => (
            <Tabs.Content
              key={`tab-content-${key}`}
              value={key}
              className="size-full"
            >
              <Component contrastColor={contrastColor} baseColor={baseColor} />
            </Tabs.Content>
          )}
        />
      </Tabs.Root>
    </div>
  )
}

interface DemoProps {
  contrastColor: Color
  baseColor: Color
}

type TextSize = "sm" | "md" | "lg"
type FontStyle = "srf" | "s-srf" | "mono" | "disp"

function TextDemo({ contrastColor, baseColor }: DemoProps) {
  const [text, setText] = useState("Contrast")
  const [size, setSize] = useState<TextSize>("md")
  const [fontStyle, setFontStyle] = useState<FontStyle>("srf")

  return (
    <main className="mb-2 max-w-full space-y-4 p-2">
      {/* Display */}
      <section
        className="relative aspect-video w-full overflow-hidden rounded"
        style={{
          background: baseColor.css(),
        }}
      >
        <p
          className={cx(
            "absolute inset-0 grid place-items-center px-4 text-center font-semibold text-balance break-all",
            {
              "font-serif": fontStyle === "srf",
              "font-mono": fontStyle === "mono",
            },
          )}
          style={{
            color: contrastColor.css(),
            fontSize: {
              sm: "20px",
              md: "28px",
              lg: "36px",
            }[size],
          }}
        >
          {text.substring(0, 14) || "Contrast"}
        </p>
      </section>

      {/* Controls */}
      <section className="space-y-3 pl-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="demo-text" className="text-caption-bold text-muted">
            Text
          </Label>
          <input
            type="text"
            id="demo-text"
            className="bg-muted-background focus:border-accent w-36 rounded border border-transparent px-2 py-1 font-medium text-black/90"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-caption-bold text-muted">Size</Label>
          <RadioGroup.Root
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
        <div className="flex items-center justify-between">
          <Label className="text-caption-bold text-muted">Style</Label>
          <RadioGroup.Root
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
      </section>
    </main>
  )
}

function PatternDemo({ contrastColor, baseColor }: DemoProps) {
  return <main>fmacd</main>
}
