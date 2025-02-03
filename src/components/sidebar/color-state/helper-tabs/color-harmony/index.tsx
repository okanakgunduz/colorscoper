import { Shuffle } from "@phosphor-icons/react"
import { useState } from "react"
import Button from "@components/common/button"
import For from "@components/common/for"
import Select from "@components/common/select"
import { pickRandom } from "@utils/array"
import { capitalize } from "@utils/casing"
import ColorHarmonyWheel from "./color-harmony-wheel"

export const ColorRelationship = {
  Monochromatic: "monochromatic",
  DiadPositive: "diad-positive",
  DiadNegative: "diad-negative",
  Complementary: "complementary",
  SplitComplementary: "split-complementary",
  Triad: "triad",
  Analogous: "analogous",
  DoubleComplementaryPositive: "double-complementary-positive",
  DoubleComplementaryNegative: "double-complementary-negative",
  RectangularTetradPositive: "rectangular-tetrad-positive",
  RectangularTetradNegative: "rectangular-tetrad-negative",
  SquareTetrad: "square-tetrad",
  Polychromatic: "polychromatic",
} as const

export type ColorRelationship = Enumize<typeof ColorRelationship>

export default function ColorHarmonyHelper() {
  const [relationship, setRelationship] = useState<ColorRelationship>(
    ColorRelationship.SquareTetrad,
  )

  return (
    <div className="px-sidebar space-y-4 pb-4">
      <div className="flex items-end justify-between">
        <Select
          title="Relationship"
          value={relationship}
          onValueChange={(value) => setRelationship(value as ColorRelationship)}
        >
          <For each={Object.entries(ColorRelationship)}>
            {([name, key]) => (
              <Select.Option value={key} key={key}>
                {capitalize(name)}
              </Select.Option>
            )}
          </For>
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
      <ColorHarmonyWheel relationship={relationship} />
      <div
        // @ts-expect-error (Not supported yet, but polyfilled)
        popover="auto"
        id="pop"
        className="m-auto flex h-16 w-32 items-center justify-center rounded shadow-md backdrop:bg-black/50"
      >
        Hello World!
      </div>
    </div>
  )
}
