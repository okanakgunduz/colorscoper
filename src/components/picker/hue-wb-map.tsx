import chroma from "chroma-js"
import { motion } from "motion/react"
import { useMemo, useState } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import For from "@components/common/for"
import { useDebug } from "@hooks/useDebug"
import useDimensions from "@hooks/useDimensions"
import useZoomableGrid from "@hooks/useZoomableGrid"
import cx from "@utils/cx"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

const CELL_SIZE_LARGE = 80
const CELL_SIZE_SMALL = 40
const GRID_GAP_LARGE = 3
const GRID_GAP_SMALL = 1.5
const PADDING = {
  x: 40,
  y: 80,
}

const getCells = (width: number, height: number, size: number) => {
  const x = Math.floor((width - PADDING.x * 2) / size) & ~1
  const y = Math.floor((height - PADDING.y * 2) / size)

  if (width === 0 && height === 0)
    return {
      x: 0,
      y: 0,
      count: 0,
    }

  return {
    x,
    y,
    count: x * y,
  }
}

const luminosityScale = chroma.scale(["#e0e0e0", "#4a4a4a"]).mode("hsi")

const getGridHueLum = (cells: ReturnType<typeof getCells>, i: number) => {
  const { x, y } = linearTo2D(i, cells.x)

  const hue =
    x < Math.floor(cells.x / 2)
      ? map(y, 0, cells.y - 1, 0, 150)
      : map(y, 0, cells.y - 1, 330, 180)

  const normalizedX =
    x < Math.floor(cells.x / 2)
      ? x / (cells.x / 2 - 1)
      : 1 - (x - cells.x / 2) / (cells.x / 2 - 1)

  const luminosity = luminosityScale(normalizedX).luminance()

  return { hue, luminosity }
}

export default function HueWBMap() {
  const [saturation, setSaturation] = useState<number>(75 /* range: [0, 100] */)
  const [ref, rect] = useDimensions<HTMLDivElement>()
  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  const { zoomLevel, style, handleMouseDown, handleMouseUp, handleMouseMove } =
    useZoomableGrid()

  const largeCells = useMemo(
    () => getCells(rect.width, rect.height, CELL_SIZE_LARGE),
    [rect.width, rect.height],
  )
  const smallCells = useMemo(
    () => getCells(rect.width, rect.height, CELL_SIZE_SMALL),
    [rect.width, rect.height],
  )

  useDebug(largeCells.count)

  const gridHueLum = useMemo(() => {
    const cache = new Map<string, { hue: number; luminosity: number }>()
    return (cells: ReturnType<typeof getCells>, i: number) => {
      const key = `${cells.x},${cells.y},${i}`
      if (!cache.has(key)) cache.set(key, getGridHueLum(cells, i))
      return cache.get(key)!
    }
  }, [])

  return (
    <div
      className="relative size-full touch-none overflow-hidden overscroll-none"
      ref={ref}
    >
      <TransformWrapper
        centerZoomedOut
        onZoom={({ state: { scale } }) => zoomLevel.set(scale)}
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
          }}
        >
          <div className="relative size-full">
            {/* Large Grid */}

            <motion.div
              className={cx("absolute inset-0 grid overflow-hidden")}
              style={{
                gridTemplateColumns: `repeat(${largeCells.x}, 1fr)`,
                gridTemplateRows: `repeat(${largeCells.y}, 1fr)`,
                gap: `${GRID_GAP_LARGE}px`,
                paddingInline: PADDING.x,
                paddingBlock: PADDING.y,
                ...style.largeGrid,
              }}
            >
              <For
                times={largeCells.count}
                renderItem={(i) => {
                  const { hue, luminosity } = gridHueLum(largeCells, i)

                  const color = chroma.hsl(
                    hue,
                    map(saturation, 0, 100, 0, 1),
                    luminosity,
                  )

                  return (
                    <motion.div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={() =>
                        handleMouseUp(() => setPickerSelection(color))
                      }
                      key={`hue-wb-map-cell-${i}-${CELL_SIZE_LARGE}`}
                      className="group flex cursor-pointer items-center justify-center rounded text-center text-[8px] transition hover:scale-90"
                      style={{
                        background: color.css(),
                      }}
                    >
                      <span className="size-1 rounded-full bg-white/20 transition group-hover:scale-110 group-hover:bg-white group-active:scale-150"></span>
                    </motion.div>
                  )
                }}
              />
            </motion.div>

            {/* Small Grid */}

            <motion.div
              className={cx("absolute inset-0 grid overflow-hidden")}
              style={{
                gridTemplateColumns: `repeat(${smallCells.x}, 1fr)`,
                gridTemplateRows: `repeat(${smallCells.y}, 1fr)`,
                gap: `${GRID_GAP_SMALL}px`,
                paddingInline: PADDING.x,
                paddingBlock: PADDING.y,
                ...style.smallGrid,
              }}
            >
              <For
                times={smallCells.count}
                renderItem={(i) => {
                  const { x } = linearTo2D(i, smallCells.x)
                  const { hue, luminosity } = gridHueLum(smallCells, i)
                  const color = chroma.hsl(
                    hue,
                    map(saturation, 0, 100, 0, 1),
                    luminosity,
                  )

                  return (
                    <motion.div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={() =>
                        handleMouseUp(() => setPickerSelection(color))
                      }
                      key={`hue-wb-map-cell-${i}-${CELL_SIZE_LARGE}`}
                      className="group flex cursor-pointer items-center justify-center rounded-xs transition hover:scale-90"
                      style={{ background: color.css() }}
                    >
                      {x === 0 || x === smallCells.x - 1 ? (
                        <span className="text-center text-[7px] font-medium opacity-70 transition group-hover:scale-110">
                          {Math.round(hue)}°
                        </span>
                      ) : (
                        <span className="size-[3px] rounded-full bg-white/20 transition group-hover:scale-110 group-hover:bg-white group-active:scale-150"></span>
                      )}
                    </motion.div>
                  )
                }}
              />
            </motion.div>
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Saturation Slider */}
      <ExpandableSlider
        layoutkey="hue-wb-map"
        value={saturation}
        onValueChange={setSaturation}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        title="Saturation"
        min={1}
        max={100}
        step={0.5}
        debounceTimeout={150}
        format={(value) => `${value.toPrecision(3)}%`}
      />
    </div>
  )
}
