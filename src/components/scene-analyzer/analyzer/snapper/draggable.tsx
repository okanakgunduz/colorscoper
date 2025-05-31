import { Color } from "chroma-js"
import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import { useDragSnap } from "@hooks/useDragSnap"

interface DraggableProps {
  id: string
  color: Color
  constraint: React.RefObject<HTMLDivElement>
  initialSnap: number
  onSnapChange: (prev: number, next: number) => void
  onRemove?: (id: string) => void
}

export default function Draggable({
  color,
  constraint,
  initialSnap,
  onSnapChange,
  onRemove,
  id,
}: DraggableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const lastIndexRef = useRef<number>(initialSnap)

  const { dragProps, snapTo, currentSnappointIndex } = useDragSnap({
    direction: "both",
    ref,
    constraints: constraint,
    dragElastic: 0.2,
    snapPoints: {
      type: "constraints-box",
      unit: "percent",
      points: Array(25)
        .fill(0)
        .map((_, idx) => ({
          x: (idx % 5) * 0.25,
          y: Math.floor(idx / 5) * 0.25,
        })),
    },
  })

  useEffect(() => {
    if (!ref.current) return
    snapTo(initialSnap)
    lastIndexRef.current = initialSnap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!ref.current) return
    if (currentSnappointIndex == null) return
    const prev = lastIndexRef.current
    const next = currentSnappointIndex
    if (prev !== next) {
      lastIndexRef.current = next
      onSnapChange(prev, next)
    }
  }, [currentSnappointIndex, onSnapChange])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      exit={{
        scale: 0.7,
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
      whileDrag={{ scale: 1.1, opacity: 0.7, cursor: "grabbing" }}
      whileTap={{ scale: 1.1 }}
      onDoubleClick={() => onRemove?.(id)}
      className="absolute size-15 cursor-grab rounded-lg px-2 py-4 select-none"
      style={{ backgroundColor: color.hex() }}
      drag
      {...dragProps}
    ></motion.div>
  )
}
