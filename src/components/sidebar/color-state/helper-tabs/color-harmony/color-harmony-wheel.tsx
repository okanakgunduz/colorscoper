import { AnimatePresence } from "motion/react"
import { RefObject, useState } from "react"
import For from "@components/common/for"
import { ColorRelationship, getHueSections } from "@utils/color"
import cx, { Class } from "@utils/cx"
import { useSelectionStore } from "@stores/selection.store"
import Node from "./node"
import ReferenceLine from "./reference-line"

const slices = [
  "M 0 0 L 0 -140 A 140 140 0 0 1 70 -121 Z",
  "M 0 0 L 70 -121 A 140 140 0 0 1 121 -70 Z",
  "M 0 0 L 121 -70 A 140 140 0 0 1 140 0 Z",
  "M 0 0 L 140 0 A 140 140 0 0 1 121 70 Z",
  "M 0 0 L 121 70 A 140 140 0 0 1 70 121 Z",
  "M 0 0 L 70 121 A 140 140 0 0 1 0 140 Z",
  "M 0 0 L 0 140 A 140 140 0 0 1 -70 121 Z",
  "M 0 0 L -70 121 A 140 140 0 0 1 -121 70 Z",
  "M 0 0 L -121 70 A 140 140 0 0 1 -140 0 Z",
  "M 0 0 L -140 0 A 140 140 0 0 1 -121 -70 Z",
  "M 0 0 L -121 -70 A 140 140 0 0 1 -70 -121 Z",
  "M 0 0 L -70 -121 A 140 140 0 0 1 0 -140 Z",
]

interface Props {
  relationship: ColorRelationship
  className?: Class
  anchorRef?: RefObject<HTMLElement>
}

export default function ColorHarmonyWheel({
  relationship,
  className,
  anchorRef,
}: Props) {
  const getHueRotated = useSelectionStore.use.getHueRotated()
  const [hovering, setHovering] = useState<number | null>(null)

  return (
    <svg
      viewBox="-160 -160 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className={cx("w-full", className)}
    >
      {/* Color Wheel Slices */}
      <g id="color-wheel" transform="rotate(-15)">
        <For
          each={slices}
          renderItem={(path, section) => (
            <path
              key={`harmony-slices-${section}`}
              d={path}
              fill={getHueRotated(section * 30)!.css()}
              className={cx({
                "opacity-50": hovering !== null && hovering !== section,
              })}
            />
          )}
        />
      </g>

      {/* Visual Reference Lines */}

      <g id="reference-lines">
        {relationship !== "analogous" && (
          <For
            element={AnimatePresence}
            each={getHueSections(relationship)}
            renderItem={(section, i, sections) => {
              if (sections.length === 1) return
              if (sections.length === 2 && i === 0) return

              if (i == sections.length - 1)
                return (
                  <ReferenceLine
                    key={`${relationship}-reference-line-${section}`}
                    from={section}
                    to={sections[0]}
                  />
                )

              return (
                <ReferenceLine
                  key={`${relationship}-reference-line-${section}`}
                  from={section}
                  to={sections[i + 1]}
                />
              )
            }}
          />
        )}
      </g>

      {/* Color Stop Nodes */}

      <g id="nodes">
        <For
          element={AnimatePresence}
          each={getHueSections(relationship)}
          renderItem={(section) => (
            <Node
              key={`relationship-node-${section}`}
              r={1}
              color={getHueRotated(section * 30)!}
              {...{ setHovering, section }}
              anchorRef={anchorRef}
            />
          )}
        />
      </g>
    </svg>
  )
}
