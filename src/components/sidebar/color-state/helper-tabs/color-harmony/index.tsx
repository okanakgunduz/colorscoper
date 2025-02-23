import { CircleHalfTilt, Shuffle } from "@phosphor-icons/react"
import { CSSProperties, useState } from "react"
import Button from "@components/common/button"
import For from "@components/common/for"
import Popover from "@components/common/popover"
import Portal from "@components/common/portal"
import Select from "@components/common/select"
import { pickRandom } from "@utils/array"
import { capitalize } from "@utils/casing"
import { ColorRelationship, getHueSections } from "@utils/color"
import romanize from "@utils/romanize"
import ColorHarmonyPalette from "./color-harmony-palette"
import ColorHarmonyWheel from "./color-harmony-wheel"
import LineDetails from "./line-details"

export default function ColorHarmonyHelper() {
  const [relationship, setRelationship] = useState<ColorRelationship>(
    ColorRelationship.SquareTetrad,
  )

  return (
    <div className="px-sidebar space-y-4 pb-4">
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

      <>
        <ColorHarmonyWheel relationship={relationship} className="mt-6!" />
        <Portal containerId="popover-container">
          <For
            each={getHueSections(relationship)}
            renderItem={(section) => (
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
          />
        </Portal>
      </>
    </div>
  )
}
