import { useMotionValue, useTransform } from "motion/react"

export default function useZoomableGrid() {
  const zoomLevel = useMotionValue(1)

  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const isDragging = useMotionValue(0 /* 0 = not dragging, 1 = dragging */)

  /* Styles */

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

  /* Event Handlers */

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

  const handleMouseUp = (func: () => void = () => {}) => {
    if (isDragging.get() === 0) func()
  }

  return {
    zoomLevel,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    style: {
      largeGrid: {
        opacity: largeGridOpacity,
        pointerEvents: largeGridPointerEvents,
      },
      smallGrid: {
        opacity: smallGridOpacity,
        pointerEvents: smallGridPointerEvents,
      },
    },
  }
}
