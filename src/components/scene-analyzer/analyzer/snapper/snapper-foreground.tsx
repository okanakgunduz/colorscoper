import { Color } from "chroma-js"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import For from "@components/common/for"
import { useDragSnap } from "@hooks/useDragSnap"
import cx, { Class } from "@utils/cx"
import randomPick from "@utils/random-pick"

interface Props {
  className?: Class
  items: Color[]
  onFilled?: () => void
}

export default function SnapperForeground({
  className,
  items,
  onFilled,
}: Props) {
  const [occupancy, setOccupancy] = useState<number[]>(() => Array(25).fill(0))
  const [positions, setPositions] = useState<Record<string, number>>({})
  const constraintRef = useRef<HTMLDivElement>(null)

  const getItemPositions = () => {
    const occ = [...occupancy]
    const pos = { ...positions }

    items.forEach((color, i) => {
      const key = `${i}-${color.hex()}`
      if (pos[key] == null) {
        const free = occ
          .map((c, idx) => (c === 0 ? idx : -1))
          .filter((idx) => idx >= 0)

        const chosen =
          free.length > 0
            ? randomPick(free)
            : occ.reduce(
                (minIdx, count, idx, arr) =>
                  count < arr[minIdx] ? idx : minIdx,
                0,
              )

        if (chosen != null) {
          occ[chosen]++
          pos[key] = chosen
        }
      }
    })

    if (JSON.stringify(pos) !== JSON.stringify(positions)) {
      setOccupancy(occ)
      setPositions(pos)
    }

    return pos
  }

  useEffect(() => {
    getItemPositions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  useEffect(() => {
    if (occupancy.every((c) => c > 0)) onFilled?.()
  }, [occupancy, onFilled])

  const handleSnapChange = (key: string) => (prev: number, next: number) => {
    setOccupancy((occ) => {
      const o = [...occ]
      o[prev] = Math.max(0, o[prev] - 1)
      o[next] = o[next] + 1
      return o
    })
    setPositions((pos) => ({ ...pos, [key]: next }))
  }

  const currentPositions = getItemPositions()

  return (
    <div
      ref={constraintRef}
      className={cx(
        className,
        "absolute inset-2 z-20 flex items-center justify-center text-lg font-bold text-white",
      )}
    >
      <For
        each={items}
        renderItem={(color, i) => {
          const key = `${i}-${color.hex()}`
          const initialSnap = currentPositions[key]
          return (
            <Draggable
              key={key}
              color={color}
              constraint={constraintRef}
              initialSnap={initialSnap}
              onSnapChange={handleSnapChange(key)}
            />
          )
        }}
      />
    </div>
  )
}

interface DraggableProps {
  color: Color
  constraint: React.RefObject<HTMLDivElement>
  initialSnap: number
  onSnapChange: (prev: number, next: number) => void
}

function Draggable({
  color,
  constraint,
  initialSnap,
  onSnapChange,
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
    snapTo(initialSnap)
    lastIndexRef.current = initialSnap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
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
      drag
      {...dragProps}
      whileDrag={{ scale: 1.1, opacity: 0.7 }}
      whileTap={{ scale: 1.1 }}
      className="absolute size-15 cursor-pointer rounded-lg shadow-xl"
      style={{ background: color.css() }}
    />
  )
}
