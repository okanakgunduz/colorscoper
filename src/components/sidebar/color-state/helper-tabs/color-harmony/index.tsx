import { CircleHalfTilt, Shuffle } from "@phosphor-icons/react"
import { CSSProperties, useState } from "react"
import Button from "@components/common/button"
import For from "@components/common/for"
import Popover from "@components/common/popover"
import Portal from "@components/common/portal"
import Select from "@components/common/select"
import { pickRandom } from "@utils/array"
import { capitalize } from "@utils/casing"
import romanize from "@utils/romanize"
import ColorHarmonyWheel, { relationshipMap } from "./color-harmony-wheel"
import LineDetails from "./line-details"


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
      <Portal containerId="popover-container">
        <For each={relationshipMap[relationship]}>
          {(section) => (
            <Popover
              id={`line-details-${section}`}
              positionAnchor="--color-harmony"
              title={`Section ${romanize(section + 1)}`}
              icon={CircleHalfTilt}
              offsetX={16}
              offsetY={-48}
              key={`popover-${section}`}
            >
              <LineDetails section={section} />
            </Popover>
          )}
        </For>
      </Portal>
    </div>
  )
}
