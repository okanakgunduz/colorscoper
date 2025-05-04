import * as Tabs from "@radix-ui/react-tabs"
import chroma, { Color } from "chroma-js"
import For from "@components/common/for"
import { useSelectionStore } from "@stores/selection.store"
import PatternDemo from "./demo/pattern-demo"
import TextDemo from "./demo/text-demo"

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
