import Button from "@components/common/button"
import For from "@components/common/for"
import Select from "@components/common/select"
import { Shuffle } from "@phosphor-icons/react"
import { capitalize } from "@utils/casing"
import ColorHarmonyWheel from "./color-harmony-wheel"
import { useBaseColorStore } from "@/stores/base-color.store"
import { useState } from "react"
import { useDebug } from "@/hooks/useDebug"
import { pickRandom } from "@/utils/array"

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
  const baseColor = useBaseColorStore((state) => state.baseColor)

  const [relationship, setRelationship] = useState<ColorRelationship>(
    ColorRelationship.Triad,
  )

  useDebug(relationship)

  return (
    <div className="space-y-4">
      <div className="px-sidebar flex items-end justify-between">
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
      <ColorHarmonyWheel baseColor={baseColor!} relationship={relationship} />
    </div>
  )
}
