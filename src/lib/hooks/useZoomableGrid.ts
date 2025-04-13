/* eslint-disable */
import { useMotionValue, useTransform } from "motion/react"

interface Props {
  transitionPoints?: number[]
  transitionSpan?: number
}

export default function useZoomableGrid({
  transitionPoints = [1.5, 3],
  transitionSpan = 0.1,
}: Props = {}) {
  const zoomLevel = useMotionValue(1)
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const isDragging = useMotionValue(0 /* 0 = not dragging, 1 = dragging */)

  const sortedTransitions = [...transitionPoints].sort((a, b) => a - b)

  const gridCount = sortedTransitions.length + 1

  const gridStyles: Record<string, any> = {}

  for (let i = 0; i < gridCount; i++) {
    if (i === 0) {
      const exitPoint = sortedTransitions[0]

      gridStyles[i] = {
        opacity: useTransform(
          zoomLevel,
          [exitPoint - transitionSpan / 2, exitPoint + transitionSpan / 2],
          [1, 0],
        ),
        pointerEvents: useTransform(
          zoomLevel,
          [exitPoint - transitionSpan / 2, exitPoint + transitionSpan / 2],
          ["auto", "none"],
        ),
      }
    } else if (i === gridCount - 1) {
      const enterPoint = sortedTransitions[i - 1]

      gridStyles[i] = {
        opacity: useTransform(
          zoomLevel,
          [enterPoint - transitionSpan / 2, enterPoint + transitionSpan / 2],
          [0, 1],
        ),
        pointerEvents: useTransform(
          zoomLevel,
          [enterPoint - transitionSpan / 2, enterPoint + transitionSpan / 2],
          ["none", "auto"],
        ),
      }
    } else {
      const enterPoint = sortedTransitions[i - 1]
      const exitPoint = sortedTransitions[i]

      gridStyles[i] = {
        opacity: useTransform(
          zoomLevel,
          [
            enterPoint - transitionSpan / 2,
            enterPoint + transitionSpan / 2,
            exitPoint - transitionSpan / 2,
            exitPoint + transitionSpan / 2,
          ],
          [0, 1, 1, 0],
        ),
        pointerEvents: useTransform(
          zoomLevel,
          [
            enterPoint - transitionSpan / 2,
            enterPoint + transitionSpan / 2,
            exitPoint - transitionSpan / 2,
            exitPoint + transitionSpan / 2,
          ],
          ["none", "auto", "auto", "none"],
        ),
      }
    }
  }

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
    style: gridStyles,
  }
}
