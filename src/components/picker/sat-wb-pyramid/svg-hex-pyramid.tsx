import chroma from "chroma-js"
import { motion } from "motion/react"
import { MouseEventHandler, useRef } from "react"
import { GridGenerator, HexGrid, Hexagon, Layout } from "react-hexgrid"
import { easeInQuad } from "@utils/easing"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

interface Props {
  size: number
  factor?: number
  style: object
  hue: number
  handleMouseDown: MouseEventHandler<SVGGElement>
  handleMouseMove: MouseEventHandler<SVGGElement>
  handleMouseUp: (func?: () => void) => void
}

export default function SVGHexPyramid({
  size,
  factor = 1,
  style,
  hue,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
}: Props) {
  const setPickerSelection = useSelectionStore.use.setPickerSelection()
  const grid = useRef(GridGenerator.triangle(size))

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={style}
    >
      <HexGrid
        viewBox="-500 -500 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full transform-fill"
      >
        <Layout size={{ x: 40 * factor, y: 40 * factor }}>
          {grid.current.map(({ q, r, s }, i) => {
            const color = chroma.hsl(
              hue,
              map(r + q, 0, size, 0.2, 1),
              map(s + r, -size, 0, 0.05, 0.9, easeInQuad),
            )

            return (
              <g className="group" key={`pyramid-hex-grid-${size}-${i}`}>
                <Hexagon
                  q={q - size / 4}
                  r={r - size / 4}
                  s={s - size / 4}
                  className="group pointer-events-none origin-center rotate-30 transform-fill [&_polygon]:transition-transform [&_polygon]:group-hover:scale-88"
                  cellStyle={{
                    transform: "scale(0.95)",
                    fill: color.css(),
                  }}
                  stroke={chroma.hsl(hue, 1, 0.7).css()}
                >
                  <circle
                    r={3 * factor}
                    className="fill-white/20 stroke-0 transition group-hover:fill-white"
                  ></circle>
                </Hexagon>
                <Hexagon
                  q={q - size / 4}
                  r={r - size / 4}
                  s={s - size / 4}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={() =>
                    handleMouseUp(() => setPickerSelection(color))
                  }
                  className="rotate-30 cursor-pointer fill-transparent"
                ></Hexagon>
              </g>
            )
          })}
        </Layout>
      </HexGrid>
    </motion.div>
  )
}
