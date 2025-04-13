import { motion } from "motion/react"
import { useMemo, useState } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import useDimensions from "@hooks/useDimensions"
import useZoomableGrid from "@hooks/useZoomableGrid"
import cx from "@utils/cx"
import CanvasGrid from "./canvas-grid"
import {
  CELL_SIZE_L1,
  CELL_SIZE_L2,
  CELL_SIZE_L3,
  GRID_GAP_L1,
  GRID_GAP_L2,
  PADDING,
} from "./constants"
import DOMGrid from "./dom-grid"
import { CellsInfo, getGridHueLum } from "./helpers"

export default function HueWBMap() {
  const [saturation, setSaturation] = useState<number>(75 /* range: [0, 100] */)
  const [ref, rect] = useDimensions<HTMLDivElement>()

  const { zoomLevel, style, handleMouseDown, handleMouseUp, handleMouseMove } =
    useZoomableGrid()

  const gridHueLum = useMemo(() => {
    const cache = new Map<string, { hue: number; luminosity: number }>()
    return (cells: CellsInfo, i: number) => {
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
            {/* L1 Grid - Largest cells */}
            <motion.div
              className={cx("absolute inset-0 overflow-hidden")}
              style={{
                paddingInline: PADDING.x,
                paddingBlock: PADDING.y,
                ...style[0],
              }}
            >
              <DOMGrid
                cellSize={CELL_SIZE_L1}
                gap={GRID_GAP_L1}
                rect={rect}
                saturation={saturation}
                gridHueLum={gridHueLum}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
              />
            </motion.div>

            {/* L2 Grid */}
            <motion.div
              className={cx("absolute inset-0 overflow-hidden")}
              style={{
                paddingInline: PADDING.x,
                paddingBlock: PADDING.y,
                ...style[1],
              }}
            >
              <DOMGrid
                cellSize={CELL_SIZE_L2}
                gap={GRID_GAP_L2}
                rect={rect}
                saturation={saturation}
                gridHueLum={gridHueLum}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
                renderHueStats
              />
            </motion.div>

            {/* L3 Grid - Smallest cells - Optimized with Canvas */}
            <motion.div
              className={cx("absolute inset-0 overflow-hidden")}
              style={{
                paddingInline: PADDING.x,
                paddingBlock: PADDING.y,
                ...style[2],
              }}
            >
              <CanvasGrid
                rect={rect}
                cellSize={CELL_SIZE_L3}
                saturation={saturation}
                gridHueLum={gridHueLum}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
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
