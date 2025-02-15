import chroma from "chroma-js"
import { useMemo } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import For from "@components/common/for"
import useDimensions from "@hooks/useDimensions"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"

const CELL_SIZE = 50

export default function HueWBMap() {
  const [ref, rect] = useDimensions<HTMLDivElement>()
  const cells = useMemo(() => {
    return {
      x: Math.floor(rect.width / CELL_SIZE) & ~1,
      y: Math.floor(rect.height / CELL_SIZE),
      count:
        (Math.floor(rect.width / CELL_SIZE) & ~1) *
        Math.floor(rect.height / CELL_SIZE),
    }
  }, [rect.width, rect.height])

  return (
    <div
      className="size-full touch-none overflow-hidden overscroll-none"
      ref={ref}
    >
      <TransformWrapper centerZoomedOut pinch={{ disabled: true }}>
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
          <div
            className="grid size-full overflow-hidden p-1"
            style={{
              gridTemplateColumns: `repeat(${cells.x}, 1fr)`,
              gridTemplateRows: `repeat(${cells.y}, 1fr)`,
            }}
          >
            <For times={cells.count}>
              {(i) => {
                const { x, y } = linearTo2D(i, cells.x)
                const hue =
                  x < Math.floor(cells.x / 2)
                    ? map(y, 0, cells.y - 1, 0, 150)
                    : map(y, 0, cells.y - 1, 180, 330)

                const luminosity =
                  x < Math.floor(cells.x / 2)
                    ? map(x, 0, cells.x / 2 - 1, 0.8, 0.05)
                    : map(x, cells.x / 2, cells.x - 1, 0.05, 0.8)

                return (
                  <div
                    key={`hue-wb-map-cell-${i}`}
                    className="flex cursor-pointer items-center justify-center rounded text-center text-[8px] hover:opacity-80"
                    style={{
                      background: chroma.hsl(hue, 1, luminosity).css(),
                    }}
                  ></div>
                )
              }}
            </For>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
