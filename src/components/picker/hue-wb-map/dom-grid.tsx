import chroma from "chroma-js"
import { motion } from "motion/react"
import { MouseEvent, useMemo } from "react"
import { useSelectionStore } from "@stores/selection.store"
import For from "@components/common/for"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"
import { CellsInfo, getCells } from "./helpers"

interface Props {
  rect: DOMRectReadOnly
  cellSize: number
  gap: number
  saturation: number
  renderHueStats?: boolean
  gridHueLum: (
    cells: CellsInfo,
    i: number,
  ) => { hue: number; luminosity: number }
  handleMouseDown: (e: MouseEvent) => void
  handleMouseMove: (e: MouseEvent) => void
  handleMouseUp: (callback?: () => void) => void
}

export default function DOMGrid({
  rect,
  cellSize,
  gap,
  saturation,
  renderHueStats = false,
  gridHueLum,
  handleMouseDown: externalHandleMouseDown,
  handleMouseMove: externalHandleMouseMove,
  handleMouseUp: externalHandleMouseUp,
}: Props) {
  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  const cells: CellsInfo = useMemo(
    () => getCells(rect.width, rect.height, cellSize),
    [rect.width, rect.height, cellSize],
  )

  return (
    <div
      className="grid h-full w-full"
      style={{
        gridTemplateColumns: `repeat(${cells.x}, 1fr)`,
        gridTemplateRows: `repeat(${cells.y}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      <For
        times={cells.count}
        renderItem={i => {
          const { x } = linearTo2D(i, cells.x)
          const { hue, luminosity } = gridHueLum(cells, i)

          const color = chroma.hsl(
            hue,
            map(saturation, 0, 100, 0, 1),
            luminosity,
          )

          return (
            <motion.div
              onMouseDown={externalHandleMouseDown}
              onMouseMove={externalHandleMouseMove}
              onMouseUp={() =>
                externalHandleMouseUp(() => setPickerSelection(color))
              }
              key={`hue-wb-map-cell-l1-${i}`}
              className="group flex cursor-pointer items-center justify-center rounded text-center text-[8px] transition hover:scale-90"
              style={{
                background: color.css(),
              }}
            >
              {renderHueStats && (x === 0 || x === cells.x - 1) ? (
                <span
                  style={{
                    transform: `scale(${cellSize / 80})`,
                  }}
                  className="text-center text-sm font-medium opacity-70 transition group-hover:scale-110"
                >
                  {Math.round(hue)}°
                </span>
              ) : (
                <span className="size-[5%] rounded-full bg-white/20 transition group-hover:scale-110 group-hover:bg-white group-active:scale-150"></span>
              )}
            </motion.div>
          )
        }}
      />
    </div>
  )
}
