import chroma, { Color } from "chroma-js"
import { motion, useMotionValue, useTransform } from "motion/react"
import { useMemo, useState } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import For from "@components/common/for"
import useDimensions from "@hooks/useDimensions"
import cx from "@utils/cx"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

const CELL_SIZE_LARGE = 80
const CELL_SIZE_SMALL = 40
const GRID_GAP_LARGE = 3
const GRID_GAP_SMALL = 1.5

const getCells = (width: number, height: number, size: number) => ({
  x: Math.floor(width / size) & ~1,
  y: Math.floor(height / size),
  count: (Math.floor(width / size) & ~1) * Math.floor(height / size),
})

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
  const [saturation, setSaturation] = useState<number>(
    255 /* range: [0, 255] */,
  )

  const [ref, rect] = useDimensions<HTMLDivElement>()

  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const isDragging = useMotionValue(0 /* 0 = not dragging, 1 = dragging */)

  const zoomLevel = useMotionValue(1)

  const largeGridOpacity = useTransform(zoomLevel, [1.55, 1.6], [1, 0])
  const smallGridOpacity = useTransform(zoomLevel, [1.525, 1.575], [0, 1])
  const largeGridPointerEvents = useTransform(
    zoomLevel,
    [1.55, 1.6],
    ["auto", "none"],
  )
  const smallGridPointerEvents = useTransform(
    zoomLevel,
    [1.525, 1.575],
    ["none", "auto"],
  )

  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  const largeCells = useMemo(
    () => getCells(rect.width, rect.height, CELL_SIZE_LARGE),
    [rect.width, rect.height],
  )

  const smallCells = useMemo(
    () => getCells(rect.width, rect.height, CELL_SIZE_SMALL),
    [rect.width, rect.height],
  )

  const gridHueLum = useMemo(() => {
    const cache = new Map<string, { hue: number; luminosity: number }>()

    return (cells: ReturnType<typeof getCells>, i: number) => {
      const key = `${cells.x},${cells.y},${i}`
      if (!cache.has(key)) cache.set(key, getGridHueLum(cells, i))

      return cache.get(key)!
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    dragX.set(e.clientX)
    dragY.set(e.clientY)
    isDragging.set(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - dragX.get())
    const dy = Math.abs(e.clientY - dragY.get())

    if (dx > 10 || dy > 10) isDragging.set(1)
  }

  const handleMouseUp = (color: Color) => {
    if (isDragging.get() === 0) setPickerSelection(color)
  }

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
              className={cx("absolute inset-0 grid overflow-hidden p-3")}
              style={{
                gridTemplateColumns: `repeat(${largeCells.x}, 1fr)`,
                gridTemplateRows: `repeat(${largeCells.y}, 1fr)`,
                gap: `${GRID_GAP_LARGE}px`,
                opacity: largeGridOpacity,
                pointerEvents: largeGridPointerEvents,
              }}
            >
              <For times={largeCells.count}>
                {(i) => {
                  const { hue, luminosity } = gridHueLum(largeCells, i)
                  const color = chroma.hsl(hue, saturation / 255, luminosity)

                  return (
                    <motion.div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={() => handleMouseUp(color)}
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
              </For>
            </motion.div>

            {/* Small Grid */}

            <motion.div
              className={cx("absolute inset-0 grid overflow-hidden p-3")}
              style={{
                gridTemplateColumns: `repeat(${smallCells.x}, 1fr)`,
                gridTemplateRows: `repeat(${smallCells.y}, 1fr)`,
                gap: `${GRID_GAP_SMALL}px`,
                opacity: smallGridOpacity,
                pointerEvents: smallGridPointerEvents,
              }}
            >
              <For times={smallCells.count}>
                {(i) => {
                  const { x } = linearTo2D(i, smallCells.x)
                  const { hue, luminosity } = gridHueLum(smallCells, i)
                  const color = chroma.hsl(hue, saturation / 255, luminosity)

                  return (
                    <motion.div
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={() => handleMouseUp(color)}
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
              </For>
            </motion.div>
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Saturation Slider */}
      <ExpandableSlider
        value={saturation}
        onValueChange={setSaturation}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        title="Saturation"
        min={0}
        max={255}
        throttle={120}
      />
    </div>
  )
}
