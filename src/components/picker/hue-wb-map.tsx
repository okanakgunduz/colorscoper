import chroma from "chroma-js"
import { motion } from "motion/react"
import { useMemo, useState } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import For from "@components/common/for"
import useDimensions from "@hooks/useDimensions"
import { fade } from "@utils/animation"
import cx from "@utils/cx"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

const CELL_SIZE_LARGE = 60
const CELL_SIZE_SMALL = 30

const getCells = (width: number, height: number, size: number) => ({
  x: Math.floor(width / size),
  y: Math.floor(height / size),
  count: Math.floor(width / size) * Math.floor(height / size),
})

export default function HueWBMap() {
  const [ref, rect] = useDimensions<HTMLDivElement>()
  const [isSmall, setIsSmall] = useState(false)
  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  const largeCells = useMemo(
    () => getCells(rect.width, rect.height, CELL_SIZE_LARGE),
    [rect.width, rect.height],
  )

  const smallCells = useMemo(
    () => getCells(rect.width, rect.height, CELL_SIZE_SMALL),
    [rect.width, rect.height],
  )

  const luminosityScale = chroma.scale(["#e0e0e0", "#4a4a4a"]).mode("hsi")

  return (
    <div
      className="size-full touch-none overflow-hidden overscroll-none"
      ref={ref}
    >
      <TransformWrapper
        centerZoomedOut
        onZoom={(e) => setIsSmall(e.state.scale > 1.5 ? true : false)}
        pinch={{ disabled: true }}
        doubleClick={{
          disabled: true,
        }}
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
              variants={fade}
              initial="hidden"
              animate={isSmall ? "hidden" : "visible"}
              transition={{
                delay: isSmall ? 0.025 : 0,
                duration: 0.1,
              }}
              className={cx(
                "p-sidebar absolute inset-0 grid gap-[1px] overflow-hidden",
                {
                  "pointer-events-none": isSmall,
                },
              )}
              style={{
                gridTemplateColumns: `repeat(${largeCells.x}, 1fr)`,
                gridTemplateRows: `repeat(${largeCells.y}, 1fr)`,
              }}
            >
              <For times={largeCells.count}>
                {(i) => {
                  const { x, y } = linearTo2D(i, largeCells.x)

                  const hue =
                    x < Math.floor(largeCells.x / 2)
                      ? map(y, 0, largeCells.y - 1, 0, 150)
                      : map(y, 0, largeCells.y - 1, 180, 330)

                  const normalizedX =
                    x < Math.floor(largeCells.x / 2)
                      ? x / (largeCells.x / 2 - 1)
                      : 1 - (x - largeCells.x / 2) / (largeCells.x / 2 - 1)

                  const luminosity = luminosityScale(normalizedX).luminance()

                  return (
                    <motion.div
                      onClick={() =>
                        setPickerSelection(chroma.hsl(hue, 1, luminosity))
                      }
                      key={`hue-wb-map-cell-${i}-${CELL_SIZE_LARGE}`}
                      className="group flex cursor-pointer items-center justify-center rounded text-center text-[8px] transition hover:scale-90"
                      style={{
                        background: chroma.hsl(hue, 1, luminosity).css(),
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
              variants={fade}
              initial="hidden"
              animate={!isSmall ? "hidden" : "visible"}
              transition={{
                delay: !isSmall ? 0.025 : 0,
                duration: 0.1,
              }}
              className={cx(
                "p-sidebar absolute inset-0 grid gap-[0.5px] overflow-hidden",
                {
                  "pointer-events-none": !isSmall,
                },
              )}
              style={{
                gridTemplateColumns: `repeat(${smallCells.x}, 1fr)`,
                gridTemplateRows: `repeat(${smallCells.y}, 1fr)`,
              }}
            >
              <For times={smallCells.count}>
                {(i) => {
                  const { x, y } = linearTo2D(i, smallCells.x)

                  const hue =
                    x < Math.floor(smallCells.x / 2)
                      ? map(y, 0, smallCells.y - 1, 0, 150)
                      : map(y, 0, smallCells.y - 1, 180, 330)

                  const normalizedX =
                    x < Math.floor(smallCells.x / 2)
                      ? x / (smallCells.x / 2 - 1)
                      : 1 - (x - smallCells.x / 2) / (smallCells.x / 2 - 1)

                  const luminosity = luminosityScale(normalizedX).luminance()

                  return (
                    <motion.div
                      onClick={() =>
                        setPickerSelection(chroma.hsl(hue, 1, luminosity))
                      }
                      key={`hue-wb-map-cell-${i}-${CELL_SIZE_LARGE}`}
                      className="group flex cursor-pointer items-center justify-center rounded-xs text-center text-[8px] transition hover:scale-90"
                      style={{
                        background: chroma.hsl(hue, 1, luminosity).css(),
                      }}
                    >
                      <span className="size-0.5 rounded-full bg-white/20 transition group-hover:scale-110 group-hover:bg-white group-active:scale-150"></span>
                    </motion.div>
                  )
                }}
              </For>
            </motion.div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
