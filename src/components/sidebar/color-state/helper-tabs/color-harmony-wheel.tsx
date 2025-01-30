import type { Color } from "chroma-js"

interface Props {
  baseColor: Color
}

export default function ColorHarmonyWheel({ baseColor }: Props) {
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
        <path
          d="M 0 0 L 0 -140 A 140 140 0 0 1 70 -121 Z"
          fill={baseColor.css()}
        />
        <path
          d="M 0 0 L 70 -121 A 140 140 0 0 1 121 -70 Z"
          fill={baseColor.css()}
          className="hue-rotate-30"
        />
        <path
          d="M 0 0 L 121 -70 A 140 140 0 0 1 140 0 Z"
          fill={baseColor.css()}
          className="hue-rotate-60"
        />
        <path
          d="M 0 0 L 140 0 A 140 140 0 0 1 121 70 Z"
          fill={baseColor.css()}
          className="hue-rotate-90"
        />
        <path
          d="M 0 0 L 121 70 A 140 140 0 0 1 70 121 Z"
          fill={baseColor.css()}
          className="hue-rotate-120"
        />
        <path
          d="M 0 0 L 70 121 A 140 140 0 0 1 0 140 Z"
          fill={baseColor.css()}
          className="hue-rotate-150"
        />
        <path
          d="M 0 0 L 0 140 A 140 140 0 0 1 -70 121 Z"
          fill={baseColor.css()}
          className="hue-rotate-180"
        />
        <path
          d="M 0 0 L -70 121 A 140 140 0 0 1 -121 70 Z"
          fill={baseColor.css()}
          className="hue-rotate-210"
        />
        <path
          d="M 0 0 L -121 70 A 140 140 0 0 1 -140 0 Z"
          fill={baseColor.css()}
          className="hue-rotate-240"
        />
        <path
          d="M 0 0 L -140 0 A 140 140 0 0 1 -121 -70 Z"
          fill={baseColor.css()}
          className="hue-rotate-270"
        />
        <path
          d="M 0 0 L -121 -70 A 140 140 0 0 1 -70 -121 Z"
          fill={baseColor.css()}
          className="hue-rotate-300"
        />
        <path
          d="M 0 0 L -70 -121 A 140 140 0 0 1 0 -140 Z"
          fill={baseColor.css()}
          className="hue-rotate-330"
        />
      </g>
      {/* Visual Reference Lines */}
      <line x1={0} y1={0} x2={121} y2={70} stroke="white" strokeWidth={4} />
      <line x1={0} y1={0} x2={-140} y2={0} stroke="white" strokeWidth={4} />

      <Node r={1} section={4} {...{ baseColor }} />
      <Node r={1} section={9} {...{ baseColor }} />

      <circle cx={0} cy={0} r={8} fill="#fff" />
    </svg>
  )
}

interface NodeProps {
  baseColor: Color
  section: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  r?: 1 | 0.8 | 0.6 | 0.4 | 0.2
}

function Node({ section, baseColor, r = 1 }: NodeProps) {
  return (
    <circle
      cx={r * 140 * Math.cos(((section - 3) * Math.PI) / 6)}
      cy={r * 140 * Math.sin(((section - 3) * Math.PI) / 6)}
      r={20}
      fill={baseColor.css()}
      stroke="white"
      strokeWidth={4}
    />
  )
}
