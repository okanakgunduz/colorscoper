import { Color } from "chroma-js"
import { AnimatePresence } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import For from "@components/common/for"
import cx, { Class } from "@utils/cx"
import randomPick from "@utils/random-pick"
import Draggable from "./draggable"

interface Props {
  className?: Class
  items: { id: string; color: Color }[]
  onFilled?: () => void
  onRemove?: (id: string) => void
}

export default function SnapperForeground({
  className,
  items,
  onFilled,
  onRemove,
}: Props) {
  const [occupancy, setOccupancy] = useState<number[]>(() => Array(25).fill(0))
  const [positions, setPositions] = useState<Record<string, number>>({})

  const constraintRef = useRef<HTMLDivElement>(null)

  const getItemPositions = () => {
    const occ = [...occupancy]
    const pos = { ...positions }

    items.forEach((item) => {
      if (positions[item.id] == null) {
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
          pos[item.id] = chosen
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
    const validIds = new Set(items.map((item) => item.id))

    setPositions((prevPositions) => {
      const newPositions: Record<string, number> = {}
      const newOccupancy = [...occupancy]

      for (const [id, idx] of Object.entries(prevPositions)) {
        if (validIds.has(id)) {
          newPositions[id] = idx
        } else {
          newOccupancy[idx] = Math.max(0, newOccupancy[idx] - 1)
        }
      }

      setOccupancy(newOccupancy)
      return newPositions
    })
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

  const currentPositions = useMemo(() => getItemPositions(), [items])

  return (
    <div
      ref={constraintRef}
      className={cx(
        className,
        "absolute inset-2 z-20 flex items-center justify-center text-lg font-bold text-white",
      )}
    >
      <For
        element={AnimatePresence}
        each={items}
        renderItem={(item) => {
          const initialSnap = currentPositions[item.id]
          return (
            <Draggable
              key={item.id}
              id={item.id}
              color={item.color}
              constraint={constraintRef}
              initialSnap={initialSnap}
              onSnapChange={handleSnapChange(item.id)}
              onRemove={onRemove}
            />
          )
        }}
      />
    </div>
  )
}
