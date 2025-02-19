import { Hexagon, freeHexPyramid, generateHexPyramid } from "@wasm/index"
import { useEffect, useState } from "react"

export default function SaturationWBPyramid() {
  return (
    <div className="grid size-full place-items-center font-mono">
      <HexagonalPyramidSVG svgWidth={764} size={12} gap={4} />
    </div>
  )
}

const HexagonalPyramidSVG = ({
  svgWidth,
  size,
  gap,
}: {
  svgWidth: number
  size: number
  gap: number
}) => {
  const [hexagons, setHexagons] = useState<Hexagon[]>([])
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const { hexagons, svgHeight, ptr } = generateHexPyramid({
      svgWidth,
      size,
      gap,
    })
    setHexagons(hexagons)
    setHeight(svgHeight)

    return () => freeHexPyramid(ptr)
  }, [size, gap, svgWidth])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`-10 -10 ${svgWidth + 20} ${height + 20}`}
      width={svgWidth}
      height={height}
    >
      {hexagons.map((hexagon, index) => (
        // <polygon
        //   key={index}
        //   points={hexagon.points.map(([x, y]) => `${x},${y}`).join(" ")}
        //   fill="blue"
        //   stroke="black"
        //   strokeWidth="1"
        // />

        <path
          d={hexagonToRoundedPath(
            hexagon.points.map(([x, y]) => ({ x, y })),
            4,
          )}
          fill="blue"
          stroke="black"
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

type Point = { x: number; y: number }

/**
 * Converts hexagon points into a rounded SVG path using Bézier curves.
 * @param points - An array of 6 points representing the hexagon corners.
 * @param cornerRadius - The radius for smooth rounded corners.
 * @returns An SVG path string.
 */
function hexagonToRoundedPath(points: Point[], cornerRadius: number): string {
  if (points.length !== 6) {
    throw new Error("Hexagon must have exactly 6 points.")
  }

  let pathData = ""

  for (let i = 0; i < points.length; i++) {
    const current = points[i]
    const next = points[(i + 1) % points.length] // Next point (wraps around)
    const prev = points[(i - 1 + points.length) % points.length] // Previous point

    // Compute vector directions
    const dx1 = current.x - prev.x,
      dy1 = current.y - prev.y
    const dx2 = next.x - current.x,
      dy2 = next.y - current.y

    // Normalize vectors
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

    if (len1 === 0 || len2 === 0) continue // Prevent division by zero

    const unit1 = { x: dx1 / len1, y: dy1 / len1 }
    const unit2 = { x: dx2 / len2, y: dy2 / len2 }

    // Offset points inward to create the rounded effect
    const start: Point = {
      x: current.x - unit1.x * cornerRadius,
      y: current.y - unit1.y * cornerRadius,
    }
    const end: Point = {
      x: current.x + unit2.x * cornerRadius,
      y: current.y + unit2.y * cornerRadius,
    }

    // Move to first point (or use L for continuity)
    if (i === 0) {
      pathData += `M ${start.x},${start.y} `
    } else {
      pathData += `L ${start.x},${start.y} `
    }

    // Smooth curve between the two adjusted points
    pathData += `Q ${current.x},${current.y} ${end.x},${end.y} `
  }

  pathData += "Z" // Close the path
  return pathData
}
