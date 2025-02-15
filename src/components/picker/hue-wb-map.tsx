import chroma from "chroma-js"
import { useMemo } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import For from "@components/common/for"
import useDimensions from "@hooks/useDimensions"
import linearTo2D from "@utils/linear-to-2d"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

const CELL_SIZE = 40

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

  const luminosityScale = chroma.scale(["#e5e5e5", "#4a4a4a"]).mode("lab")

  const setPickerSelection = useSelectionStore.use.setPickerSelection()

  return (
    <div
      className="size-full touch-none overflow-hidden overscroll-none"
      ref={ref}
    >
      <TransformWrapper
        centerZoomedOut
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
          <div
            className="grid size-full gap-[1px] overflow-hidden p-[1px]"
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

                const normalizedX =
                  x < Math.floor(cells.x / 2)
                    ? x / (cells.x / 2 - 1)
                    : 1 - (x - cells.x / 2) / (cells.x / 2 - 1)

                const luminosity = luminosityScale(normalizedX).luminance()

                return (
                  <div
                    onClick={() =>
                      setPickerSelection(chroma.hsl(hue, 1, luminosity))
                    }
                    key={`hue-wb-map-cell-${i}`}
                    className="group flex cursor-pointer items-center justify-center rounded text-center text-[8px] transition hover:scale-90"
                    style={{ background: chroma.hsl(hue, 1, luminosity).css() }}
                  >
                    <span className="size-1 rounded-full bg-white/20 transition group-hover:scale-110 group-hover:bg-white group-active:scale-150"></span>
                  </div>
                )
              }}
            </For>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}
