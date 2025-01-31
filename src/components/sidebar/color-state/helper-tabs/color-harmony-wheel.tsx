import type { Color } from "chroma-js"
import { ColorRelationship } from "./color-harmony-helper"
import For from "@/components/common/for"
import rotateHue from "@/utils/rotate-color"
import cx, { Class } from "@/utils/cx"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"
import { Dispatch, SetStateAction, useState } from "react"

interface Props {
  baseColor: Color
  relationship: ColorRelationship
}

const relationshipMap: Record<ColorRelationship, Array<number>> = {
  monochromatic: [0],
  "diad-positive": [0, 2],
  "diad-negative": [0, 10],
  complementary: [0, 6],
  "split-complementary": [0, 5, 7],
  triad: [0, 4, 8],
  analogous: [0, 1, 11],
  "double-complementary-positive": [0, 1, 6, 7],
  "double-complementary-negative": [0, 5, 6, 11],
  "rectangular-tetrad-positive": [0, 2, 6, 8],
  "rectangular-tetrad-negative": [0, 4, 6, 10],
  "square-tetrad": [0, 3, 6, 9],
  polychromatic: [0, 2, 4, 6, 8, 10],
}

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

export default function ColorHarmonyWheel({ baseColor, relationship }: Props) {
  const [hovering, setHovering] = useState<number | null>(null)

  return (
    <svg
      viewBox="-160 -160 320 320"
      width="300px"
      height="300px"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Color Wheel Slices */}
      <g transform="rotate(-15)">
        <For each={slices}>
          {(path, i) => (
            <path
              key={`harmony-slices-${i}`}
              d={path}
              fill={rotateHue(baseColor, i * 30).css()}
              className={cx("transition", {
                "opacity-50": hovering !== null && hovering !== i,
              })}
            />
          )}
        </For>
      </g>

      {/* Visual Reference Lines */}

      {relationship !== "analogous" && (
        <For element={AnimatePresence} each={relationshipMap[relationship]}>
          {(section, i, sections) => {
            if (sections.length === 1) return
            if (sections.length === 2 && i === 0) return

            if (i == sections.length - 1)
              return (
                <Line
                  key={`${relationship}-reference-line-${section}`}
                  from={section}
                  to={sections[0]}
                />
              )

            return (
              <Line
                key={`${relationship}-reference-line-${section}`}
                from={section}
                to={sections[i + 1]}
              />
            )
          }}
        </For>
      )}

      {/* Nodes */}

      <For element={AnimatePresence} each={relationshipMap[relationship]}>
        {(section) => (
          <Node
            key={`relationship-node-${section}`}
            r={1}
            color={rotateHue(baseColor, section * 30)}
            {...{ setHovering, section }}
          />
        )}
      </For>
    </svg>
  )
}

/* Node */

interface NodeProps {
  color: Color
  section: number
  r?: 1 | 0.8 | 0.6 | 0.4 | 0.2
  circleRadius?: number
  className?: Class
  setHovering: Dispatch<SetStateAction<number | null>>
}

function Node({
  section,
  color,
  r = 1,
  className,
  setHovering,
  circleRadius = 140,
}: NodeProps) {
  return (
    <motion.circle
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      cx={
        r * circleRadius * Math.cos(((((section + 12) % 12) - 3) * Math.PI) / 6)
      }
      cy={
        r * circleRadius * Math.sin(((((section + 12) % 12) - 3) * Math.PI) / 6)
      }
      r={20}
      fill={color.css()}
      stroke="white"
      strokeWidth={4}
      className={cx(className, "cursor-pointer outline-hidden")}
      onMouseEnter={() => setHovering(section)}
      onMouseLeave={() => setHovering(null)}
    />
  )
}

/* Line */

interface LineProps {
  from: number
  to: number
  circleRadius?: number
  strokeColor?: string
}

const Line: React.FC<LineProps> = ({
  from,
  to,
  circleRadius = 140,
  strokeColor = "white",
}) => {
  const angleFrom = ((from - 3) * Math.PI) / 6
  const angleTo = ((to - 3) * Math.PI) / 6

  const fromX = circleRadius * Math.cos(angleFrom)
  const fromY = circleRadius * Math.sin(angleFrom)
  const toX = circleRadius * Math.cos(angleTo)
  const toY = circleRadius * Math.sin(angleTo)

  return (
    <motion.line
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.75 },
      }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      x1={fromX}
      y1={fromY}
      x2={toX}
      y2={toY}
      stroke={strokeColor}
      strokeWidth={5}
    />
  )
}
