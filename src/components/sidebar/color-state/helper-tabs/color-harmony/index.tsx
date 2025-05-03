import { Shuffle } from "@phosphor-icons/react"
import { CSSProperties, useRef, useState } from "react"
import Button from "@components/common/button"
import For from "@components/common/for"
import Select from "@components/common/select"
import { pickRandom } from "@utils/array"
import { capitalize } from "@utils/casing"
import { ColorRelationship } from "@utils/color"
import ColorHarmonyPalette from "./color-harmony-palette"
import ColorHarmonyWheel from "./color-harmony-wheel"

export default function ColorHarmonyHelper() {
  const [relationship, setRelationship] = useState<ColorRelationship>(
    ColorRelationship.SquareTetrad,
  )

  const anchorRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="px-sidebar space-y-4 pb-4" ref={anchorRef}>
      {/* Select & Header */}
      <div
        className="flex items-end justify-between"
        style={
          {
            anchorName: "--color-harmony",
          } as CSSProperties
        }
      >
        <Select
          title="Relationship"
          value={relationship}
          onValueChange={(value) => setRelationship(value as ColorRelationship)}
        >
          <For
            each={Object.entries(ColorRelationship)}
            renderItem={([name, key]) => (
              <Select.Option value={key} key={key}>
                {capitalize(name)}
              </Select.Option>
            )}
          />
        </Select>
        <Button
          type="fill"
          content="icon-only"
          onClick={() =>
            setRelationship(pickRandom(Object.values(ColorRelationship)))
          }
        >
          <Shuffle weight="bold" />
        </Button>
      </div>

      {/* Palette */}
      <ColorHarmonyPalette relationship={relationship} className="mt-6!" />

      {/* Wheel */}

      <ColorHarmonyWheel
        anchorRef={anchorRef}
        relationship={relationship}
        className="mt-6!"
      />
    </div>
  )
}
