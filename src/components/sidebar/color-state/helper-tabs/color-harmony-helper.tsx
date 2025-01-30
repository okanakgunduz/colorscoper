import Button from "@components/common/button"
import For from "@components/common/for"
import Select from "@components/common/select"
import { capitalize } from "@utils/casing"

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
  return (
    <div>
      <div className="px-sidebar flex justify-between">
        <Select title="Relationship" defaultValue={ColorRelationship.Analogous}>
          <For each={Object.entries(ColorRelationship)}>
            {([name, key]) => (
              <Select.Option value={key}>{capitalize(name)}</Select.Option>
            )}
          </For>
        </Select>
        <Button type="fill">Shuffle</Button>
      </div>
    </div>
  )
}
