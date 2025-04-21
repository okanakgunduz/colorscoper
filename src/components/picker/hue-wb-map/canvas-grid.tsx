import chroma from "chroma-js"
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react"
import useEventListener from "@hooks/useEventListener"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"
import { CellsInfo, getCells } from "./helpers"

interface Props {
  rect: DOMRectReadOnly
  cellSize: number
  saturation: number
  gridHueLum: (
    cells: CellsInfo,
    i: number,
  ) => { hue: number; luminosity: number }
  handleMouseDown: (e: MouseEvent) => void
  handleMouseMove: (e: MouseEvent) => void
  handleMouseUp: (callback?: () => void) => void
}

export default function CanvasGrid({
  rect,
  cellSize,
  saturation,
  gridHueLum,
  handleMouseDown: externalHandleMouseDown,
  handleMouseMove: externalHandleMouseMove,
  handleMouseUp: externalHandleMouseUp,
}: Props) {
  const setPickerSelection = useSelectionStore.use.setPickerSelection()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  const cells = useMemo(
    () => getCells(rect.width, rect.height, cellSize),
    [rect.width, rect.height, cellSize],
  )

  const cellInfoRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentCellIndex: -1,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || cells.count === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio * 4 || 1

    const cssWidth = canvas.clientWidth
    const cssHeight = canvas.clientHeight

    canvas.width = cssWidth * dpr
    canvas.height = cssHeight * dpr

    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, cssWidth, cssHeight)

    const cellWidth = cssWidth / cells.x
    const cellHeight = cssHeight / cells.y

    for (let i = 0; i < cells.count; i++) {
      const { x, y } = linearTo2D(i, cells.x)
      const { hue, luminosity } = gridHueLum(cells, i)

      const color = chroma.hsl(hue, map(saturation, 0, 100, 0, 1), luminosity)

      ctx.fillStyle = color.css()

      const cellX = x * cellWidth
      const cellY = y * cellHeight
      const cellW = cellWidth + 1
      const cellH = cellHeight + 1

      ctx.fillRect(cellX, cellY, cellW, cellH)

      if (x !== 0 && x !== cells.x - 1) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.beginPath()
        ctx.arc(
          cellX + cellWidth / 2,
          cellY + cellHeight / 2,
          Math.min(cellWidth, cellHeight) / 16,
          0,
          2 * Math.PI,
        )
        ctx.fill()
      }
    }

    // if (hoveredCell !== null) {
    //   const { x, y } = linearTo2D(hoveredCell, cells.x)

    //   ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    //   ctx.beginPath()
    //   ctx.arc(
    //     x * cellWidth + cellWidth / 2,
    //     y * cellHeight + cellHeight / 2,
    //     Math.min(cellWidth, cellHeight) / 16,
    //     0,
    //     2 * Math.PI,
    //   )
    //   ctx.fill()
    // }
  }, [cells, saturation, gridHueLum])

  useEventListener("resize", () => {
    const container = containerRef.current
    if (!container || !canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
  })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = canvasRef.current.width / rect.width
    const scaleY = canvasRef.current.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const cellWidth = canvasRef.current.width / cells.x
    const cellHeight = canvasRef.current.height / cells.y

    const cellX = Math.floor(x / cellWidth)
    const cellY = Math.floor(y / cellHeight)
    const cellIndex = cellY * cells.x + cellX

    if (cellX >= 0 && cellX < cells.x && cellY >= 0 && cellY < cells.y) {
      cellInfoRef.current = {
        isDragging: false,
        startX: e.clientX,
        startY: e.clientY,
        currentCellIndex: cellIndex,
      }
    }

    externalHandleMouseDown(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = canvasRef.current.width / rect.width
    const scaleY = canvasRef.current.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const cellWidth = canvasRef.current.width / cells.x
    const cellHeight = canvasRef.current.height / cells.y

    const cellX = Math.floor(x / cellWidth)
    const cellY = Math.floor(y / cellHeight)

    if (cellX >= 0 && cellX < cells.x && cellY >= 0 && cellY < cells.y) {
      const cellIndex = cellY * cells.x + cellX
      setHoveredCell(cellIndex)

      if (cellInfoRef.current.currentCellIndex !== -1) {
        const dx = Math.abs(e.clientX - cellInfoRef.current.startX)
        const dy = Math.abs(e.clientY - cellInfoRef.current.startY)

        if (dx > 10 || dy > 10) {
          cellInfoRef.current.isDragging = true
        }
      }
    } else {
      setHoveredCell(null)
    }

    externalHandleMouseMove(e)
  }

  const handleMouseUp = () => {
    if (
      cellInfoRef.current.currentCellIndex !== -1 &&
      !cellInfoRef.current.isDragging
    ) {
      const { hue, luminosity } = gridHueLum(
        cells,
        cellInfoRef.current.currentCellIndex,
      )
      const color = chroma.hsl(hue, map(saturation, 0, 100, 0, 1), luminosity)

      externalHandleMouseUp(() => setPickerSelection(color))
    } else {
      externalHandleMouseUp()
    }

    cellInfoRef.current.currentCellIndex = -1
    cellInfoRef.current.isDragging = false
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setHoveredCell(null)}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-pointer rounded-xs"
      />
    </div>
  )
}
