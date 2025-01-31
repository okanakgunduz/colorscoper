import type { Color } from "chroma-js"
import { ColorRelationship } from "./color-harmony-helper"
import For from "@/components/common/for"
import rotateHue from "@/utils/rotate-color"
import { Class } from "@/utils/cx"
import * as motion from "motion/react-client"
import { AnimatePresence } from "motion/react"

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
  "double-complementary-negative": [0, 11, 6, 5],
  "rectangular-tetrad-positive": [0, 2, 6, 8],
  "rectangular-tetrad-negative": [0, 10, 6, 4],
  "square-tetrad": [0, 3, 6, 9],
  polychromatic: [0, 2, 4, 6, 8, 10],
}

export default function ColorHarmonyWheel({ baseColor, relationship }: Props) {
  return (
    <svg
      viewBox="-160 -160 320 320"
      width="300px"
      height="300px"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Color Wheel Slices */}
      <g transform="rotate(-15)" className="stroke-white">
        <path
          d="M 0 0 L 0 -140 A 140 140 0 0 1 70 -121 Z"
          fill={baseColor.css()}
          data-selected={relationshipMap[relationship].includes(0)}
        />
        <path
          d="M 0 0 L 70 -121 A 140 140 0 0 1 121 -70 Z"
          fill={rotateHue(baseColor, 30).css()}
          data-selected={relationshipMap[relationship].includes(1)}
        />
        <path
          d="M 0 0 L 121 -70 A 140 140 0 0 1 140 0 Z"
          fill={rotateHue(baseColor, 60).css()}
          data-selected={relationshipMap[relationship].includes(2)}
        />
        <path
          d="M 0 0 L 140 0 A 140 140 0 0 1 121 70 Z"
          fill={rotateHue(baseColor, 90).css()}
          data-selected={relationshipMap[relationship].includes(3)}
        />
        <path
          d="M 0 0 L 121 70 A 140 140 0 0 1 70 121 Z"
          fill={rotateHue(baseColor, 120).css()}
          data-selected={relationshipMap[relationship].includes(4)}
        />
        <path
          d="M 0 0 L 70 121 A 140 140 0 0 1 0 140 Z"
          fill={rotateHue(baseColor, 150).css()}
          data-selected={relationshipMap[relationship].includes(5)}
        />
        <path
          d="M 0 0 L 0 140 A 140 140 0 0 1 -70 121 Z"
          fill={rotateHue(baseColor, 180).css()}
          data-selected={relationshipMap[relationship].includes(6)}
        />
        <path
          d="M 0 0 L -70 121 A 140 140 0 0 1 -121 70 Z"
          fill={rotateHue(baseColor, 210).css()}
          data-selected={relationshipMap[relationship].includes(7)}
        />
        <path
          d="M 0 0 L -121 70 A 140 140 0 0 1 -140 0 Z"
          fill={rotateHue(baseColor, 240).css()}
          data-selected={relationshipMap[relationship].includes(8)}
        />
        <path
          d="M 0 0 L -140 0 A 140 140 0 0 1 -121 -70 Z"
          fill={rotateHue(baseColor, 270).css()}
          data-selected={relationshipMap[relationship].includes(9)}
        />
        <path
          d="M 0 0 L -121 -70 A 140 140 0 0 1 -70 -121 Z"
          fill={rotateHue(baseColor, 300).css()}
          data-selected={relationshipMap[relationship].includes(10)}
        />
        <path
          d="M 0 0 L -70 -121 A 140 140 0 0 1 0 -140 Z"
          fill={rotateHue(baseColor, 330).css()}
          data-selected={relationshipMap[relationship].includes(11)}
        />
      </g>
      {/* Visual Reference Lines */}
      {/* <line x1={0} y1={0} x2={121} y2={70} stroke="white" strokeWidth={4} />
      <line x1={0} y1={0} x2={-140} y2={0} stroke="white" strokeWidth={4} /> */}

      <For element={AnimatePresence} each={relationshipMap[relationship]}>
        {(section) => (
          <Node
            key={`relationship-node-${section}`}
            r={1}
            section={section}
            color={rotateHue(baseColor, section * 30)}
            className="cursor-pointer"
          />
        )}
      </For>
    </svg>
  )
}

interface NodeProps {
  color: Color
  section: number
  r?: 1 | 0.8 | 0.6 | 0.4 | 0.2
  className?: Class
}

function Node({ section, color, r = 1, className }: NodeProps) {
  return (
    <motion.circle
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      cx={r * 140 * Math.cos(((((section + 12) % 12) - 3) * Math.PI) / 6)}
      cy={r * 140 * Math.sin(((((section + 12) % 12) - 3) * Math.PI) / 6)}
      r={20}
      fill={color.css()}
      stroke="white"
      strokeWidth={4}
      className={className as string}
    />
  )
}
