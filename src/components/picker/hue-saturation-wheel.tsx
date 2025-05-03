import chroma from "chroma-js"
import { motion } from "motion/react"
import { useRef, useState } from "react"
import { GridGenerator, HexGrid, Hexagon, Layout } from "react-hexgrid"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import useZoomableGrid from "@hooks/useZoomableGrid"
import hexToAngle from "@utils/hex-to-angle"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

const LARGE_SIZE = 6
const SMALL_SIZE = 12

export default function HueSaturationWheel() {
  const [luminosity, setLuminosity] = useState(0.5 /* [0, 1] range */)

  const largeGrid = useRef(GridGenerator.hexagon(LARGE_SIZE))
  const smallGrid = useRef(GridGenerator.hexagon(SMALL_SIZE))

  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  const { zoomLevel, style, handleMouseDown, handleMouseUp, handleMouseMove } =
    useZoomableGrid({
      transitionPoints: [1.75],
      transitionSpan: 0.05,
    })

  return (
    <div className="grid size-full place-items-center overflow-hidden">
      <TransformWrapper
        centerZoomedOut
        onZoom={({ state: { scale } }) => zoomLevel.set(scale)}
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{
            height: "100%",
            width: "100%",
          }}
          contentStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          <div className="relative size-full">
            {/* Large Grid */}

            <motion.div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={style[0]}
            >
              <HexGrid
                viewBox="-500 -500 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full transform-fill"
              >
                <Layout size={{ x: 40, y: 40 }}>
                  {largeGrid.current.map(({ q, r, s }, i) => {
                    // Calculate distance from center (0,0,0)
                    const distance =
                      (Math.abs(q) + Math.abs(r) + Math.abs(s)) / 2

                    // Calculate hue based on angle
                    let hue = 0 // Base hue is fixed at 0 (red)
                    const angle = hexToAngle(q, r, s)
                    hue = angle // Hue directly corresponds to angle

                    const saturation = Math.min(
                      map(distance, 0, LARGE_SIZE, 0, 1),
                      1,
                    )

                    const color = chroma.hsl(hue, saturation, luminosity)

                    return (
                      <g
                        className="group"
                        key={`pyramid-hex-grid-${LARGE_SIZE}-${i}`}
                      >
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
                          {/* <Text>
                            {q} {r} {s}
                          </Text> */}
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

            {/* Small Grid */}

            <motion.div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={style[1]}
            >
              <HexGrid
                viewBox="-500 -500 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full transform-fill"
              >
                <Layout
                  size={{
                    x: 40 * (LARGE_SIZE / SMALL_SIZE),
                    y: 40 * (LARGE_SIZE / SMALL_SIZE),
                  }}
                >
                  {smallGrid.current.map(({ q, r, s }, i) => {
                    // Calculate distance from center (0,0,0)
                    const distance =
                      (Math.abs(q) + Math.abs(r) + Math.abs(s)) / 2

                    // Calculate hue based on angle
                    let hue = 0 // Base hue is fixed at 0 (red)
                    // For non-center cells, calculate hue based on angle
                    if (q !== 0 || r !== 0 || s !== 0) {
                      const angle = hexToAngle(q, r, s)
                      hue = angle // Hue directly corresponds to angle
                    }

                    // Saturation increases from center to edge
                    const saturation = Math.min(
                      map(distance, 0, SMALL_SIZE, 0, 1),
                      1,
                    )

                    const color = chroma.hsl(hue, saturation, luminosity)

                    return (
                      <g
                        className="group"
                        key={`pyramid-hex-grid-${SMALL_SIZE}-${i}`}
                      >
                        <Hexagon
                          q={q}
                          r={r}
                          s={s}
                          className="group pointer-events-none origin-center rotate-30 transform-fill [&_polygon]:transition-transform [&_polygon]:group-hover:scale-88"
                          cellStyle={{
                            transform: "scale(0.93)",
                            fill: color.css(),
                          }}
                        >
                          <circle
                            r={3 * (LARGE_SIZE / SMALL_SIZE)}
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
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Hue Slider */}

      <ExpandableSlider
        layoutkey="hue-saturation-wheel"
        value={luminosity * 100}
        onValueChange={(value) => setLuminosity(value / 100)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        title="Luminosity"
        min={15}
        max={75}
        format={(value) => `${value.toFixed(0)}%`}
        debounceTimeout={150}
      />
    </div>
  )
}
