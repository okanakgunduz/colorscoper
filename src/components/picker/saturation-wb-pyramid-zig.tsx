import { Hexagon, freeHexPyramid, generateHexPyramid } from "@wasm/index"
import { useEffect, useState } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import map from "@utils/map"

export default function SaturationWBPyramid() {
  const [hue, setHue] = useState<number>(240)

  return (
    <div className="grid size-full place-items-center overflow-hidden">
      <TransformWrapper
        centerZoomedOut
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
          contentStyle={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HexagonalPyramidSVG svgWidth={600} size={10} gap={2} hue={hue} />
        </TransformComponent>
      </TransformWrapper>

      <ExpandableSlider
        layoutkey="saturation-wb-pyramid"
        value={hue}
        onValueChange={setHue}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        title="Hue"
        min={0}
        max={360}
        debounceTimeout={150}
      />
    </div>
  )
}

const HexagonalPyramidSVG = ({
  svgWidth,
  size,
  gap,
  hue,
}: {
  svgWidth: number
  size: number
  gap: number
  hue: number
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

  const getHexagonColor = (index: number, totalHexagons: number) => {
    let row = 0
    let count = 0

    while (count + (row + 1) <= index) {
      count += row + 1
      row++
    }

    const posInRow = index - count
    const rowSize = row + 1

    // Calculate color parameters
    const saturation = 0.1 + (row / (size - 1)) * 0.9 // Increases from bottom (0.1) to top (1.0)
    const lightness = ((posInRow - 1) / row) * 100 // Varies from 0% (left) to 100% (right)

    return `hsl(${hue}, ${saturation * 100}%, ${map(lightness, 0, 90, 30, 90)}%)`
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`-10 -10 ${svgWidth + 20} ${height + 20}`}
      width={svgWidth}
      height={height}
      className="w-full **:transform-fill"
    >
      {hexagons.map((hexagon, index) => (
        <g key={`pyramid-hexagon-group-${index}`}>
          <path
            d={hexagonToRoundedPath(hexagon.points, 4)}
            fill={getHexagonColor(index, hexagons.length)}
            className="peer origin-center cursor-pointer transition hover:scale-90"
          ></path>
          <circle
            cx={hexagon.points.reduce((prev, curr) => prev + curr[0], 0) / 6}
            cy={hexagon.points.reduce((prev, curr) => prev + curr[1], 0) / 6}
            r={2}
            className="pointer-events-none origin-center fill-white/50 transition peer-hover:fill-white peer-active:scale-125"
          />
        </g>
      ))}
    </svg>
  )
}

function hexagonToRoundedPath(
  points: [number, number][],
  cornerRadius: number,
): string {
  if (points.length !== 6) {
    throw new Error("Hexagon must have exactly 6 points.")
  }

  let pathData = ""

  for (let i = 0; i < points.length; i++) {
    const current = points[i]
    const next = points[(i + 1) % points.length] // Next point (wraps around)
    const prev = points[(i - 1 + points.length) % points.length] // Previous point

    // Compute vector directions
    const dx1 = current[0] - prev[0],
      dy1 = current[1] - prev[1]
    const dx2 = next[0] - current[0],
      dy2 = next[1] - current[1]

    // Normalize vectors
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

    if (len1 === 0 || len2 === 0) continue // Prevent division by zero

    const unit1 = { x: dx1 / len1, y: dy1 / len1 }
    const unit2 = { x: dx2 / len2, y: dy2 / len2 }

    // Offset points inward to create the rounded effect
    const start = {
      x: current[0] - unit1.x * cornerRadius,
      y: current[1] - unit1.y * cornerRadius,
    }
    const end = {
      x: current[0] + unit2.x * cornerRadius,
      y: current[1] + unit2.y * cornerRadius,
    }

    // Move to first point (or use L for continuity)
    if (i === 0) {
      pathData += `M ${start.x},${start.y} `
    } else {
      pathData += `L ${start.x},${start.y} `
    }

    // Smooth curve between the two adjusted points
    pathData += `Q ${current[0]},${current[1]} ${end.x},${end.y} `
  }

  pathData += "Z" // Close the path
  return pathData
}
