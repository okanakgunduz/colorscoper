import chroma from "chroma-js"
import { motion } from "motion/react"
import { useMemo, useState } from "react"
import { GridGenerator, HexGrid, Hexagon, Layout } from "react-hexgrid"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import useZoomableGrid from "@hooks/useZoomableGrid"
import { easeInQuad } from "@utils/easing"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

const LARGE_SIZE = 12
const SMALL_SIZE = 18

export default function SaturationWBPyramid() {
  const [hue, setHue] = useState(227 /* [0, 360] degrees */)

  const largePyramid = useMemo(() => GridGenerator.triangle(LARGE_SIZE), [])
  const smallPyramid = useMemo(() => GridGenerator.triangle(SMALL_SIZE), [])

  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  const { zoomLevel, style, handleMouseDown, handleMouseUp, handleMouseMove } =
    useZoomableGrid({
      transition: 1.75,
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
              style={style.largeGrid}
            >
              <HexGrid
                viewBox="-500 -500 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full transform-fill"
              >
                <Layout size={{ x: 40, y: 40 }}>
                  {largePyramid.map(({ q, r, s }, i) => {
                    const color = chroma.hsl(
                      hue,
                      map(r + q, 0, LARGE_SIZE, 0.2, 1),
                      map(s + r, -LARGE_SIZE, 0, 0.05, 0.9, easeInQuad),
                    )

                    return (
                      <g
                        className="group"
                        key={`pyramid-hex-grid-${LARGE_SIZE}-${i}`}
                      >
                        <Hexagon
                          q={q - LARGE_SIZE / 4}
                          r={r - LARGE_SIZE / 4}
                          s={s - LARGE_SIZE / 4}
                          className="group pointer-events-none origin-center rotate-30 transform-fill [&_polygon]:transition-transform [&_polygon]:group-hover:scale-88"
                          cellStyle={{
                            transform: "scale(0.95)",
                            fill: color.css(),
                          }}
                          stroke={chroma.hsl(hue, 1, 0.7).css()}
                        >
                          <circle
                            r={3}
                            className="fill-white/20 stroke-0 transition group-hover:fill-white"
                          ></circle>
                        </Hexagon>
                        <Hexagon
                          q={q - LARGE_SIZE / 4}
                          r={r - LARGE_SIZE / 4}
                          s={s - LARGE_SIZE / 4}
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
              style={style.smallGrid}
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
                  {smallPyramid.map(({ q, r, s }, i) => {
                    const color = chroma.hsl(
                      hue,
                      map(r + q, 0, SMALL_SIZE, 0.2, 1),
                      map(s + r, -SMALL_SIZE, 0, 0.05, 0.9, easeInQuad),
                    )

                    return (
                      <g
                        className="group"
                        key={`pyramid-hex-grid-${SMALL_SIZE}-${i}`}
                      >
                        <Hexagon
                          q={q - SMALL_SIZE / 4}
                          r={r - SMALL_SIZE / 4}
                          s={s - SMALL_SIZE / 4}
                          className="group pointer-events-none origin-center rotate-30 transform-fill [&_polygon]:transition-transform [&_polygon]:group-hover:scale-88"
                          cellStyle={{
                            transform: "scale(0.93)",
                            fill: color.css(),
                          }}
                          stroke={chroma.hsl(hue, 1, 0.7).css()}
                        >
                          <circle
                            r={3 * (LARGE_SIZE / SMALL_SIZE)}
                            className="fill-white/20 stroke-0 transition group-hover:fill-white"
                          ></circle>
                        </Hexagon>
                        <Hexagon
                          q={q - SMALL_SIZE / 4}
                          r={r - SMALL_SIZE / 4}
                          s={s - SMALL_SIZE / 4}
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
        layoutkey="saturation-wb-pyramid"
        value={hue}
        onValueChange={setHue}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        title="Hue"
        min={0}
        max={360}
        format={(value) => `${value}°`}
        debounceTimeout={150}
      />
    </div>
  )
}
