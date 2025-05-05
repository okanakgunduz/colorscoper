import chroma from "chroma-js"
import { motion } from "motion/react"
import { MouseEventHandler, useRef } from "react"
import { GridGenerator, HexGrid, Hexagon, Layout } from "react-hexgrid"
import hexToAngle from "@utils/hex-to-angle"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

interface Props {
  size: number
  factor?: number
  style: object
  luminosity: number
  handleMouseDown: MouseEventHandler<SVGGElement>
  handleMouseMove: MouseEventHandler<SVGGElement>
  handleMouseUp: (func?: () => void) => void
}

export default function SVGHexGrid({
  size,
  factor = 1,
  style,
  luminosity,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
}: Props) {
  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  const grid = useRef(GridGenerator.hexagon(size))

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
            const distance = (Math.abs(q) + Math.abs(r) + Math.abs(s)) / 2

            let hue = 0
            const angle = hexToAngle(q, r, s)
            hue = angle

            const saturation = Math.min(map(distance, 0, size, 0, 1), 1)

            const color = chroma.hsl(hue, saturation, luminosity)

            return (
              <g className="group" key={`pyramid-hex-grid-${size}-${i}`}>
                <Hexagon
                  q={q}
                  r={r}
                  s={s}
                  className="group pointer-events-none origin-center rotate-30 transform-fill [&_polygon]:transition-transform [&_polygon]:group-hover:scale-88"
                  cellStyle={{
                    transform: "scale(0.95)",
                    fill: color.css(),
                  }}
                >
                  <circle
                    r={3 * factor}
                    className="fill-white/20 stroke-0 transition group-hover:fill-white"
                  ></circle>
                </Hexagon>
                <Hexagon
                  q={q}
                  r={r}
                  s={s}
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
