import chroma from "chroma-js"
import { useMemo, useState } from "react"
import { GridGenerator, HexGrid, Hexagon, Layout, Text } from "react-hexgrid"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import { easeInQuad } from "@utils/easing"
import map from "@utils/map"
import { useSelectionStore } from "@stores/selection.store"

const SIZE = 8

export default function SaturationWBPyramid() {
  const [hue, setHue] = useState(260 /* [0, 360] degrees */)

  const pyramid = useMemo(() => GridGenerator.triangle(SIZE), [])

  const setPickerColor = useSelectionStore.use.setPickerSelection()

  return (
    <div className="grid size-full place-items-center overflow-hidden">
      <TransformWrapper
        centerZoomedOut
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{
            height: "100%",
            width: "100%",
          }}
          contentStyle={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HexGrid
            viewBox="-600 -400 1200 800"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full transform-fill"
          >
            <Layout size={{ x: 50, y: 50 }}>
              {pyramid.map(({ q, r, s }, i) => {
                const color = chroma.hsl(
                  hue,
                  map(r + q, 0, SIZE, 0.2, 1),
                  map(s + r, -SIZE, 0, 0.2, 0.9, easeInQuad),
                )

                return (
                  <Hexagon
                    key={i}
                    q={q - SIZE / 4}
                    r={r - SIZE / 4}
                    s={s - SIZE / 4}
                    onClick={() => setPickerColor(color)}
                    className="origin-center rotate-30 cursor-pointer transform-fill [&_polygon]:transition-transform [&_polygon]:hover:scale-88"
                    cellStyle={{
                      transform: "scale(0.95)",
                      fill: color.css(),
                    }}
                    stroke={chroma.hsl(hue, 1, 0.5).css()}
                  ></Hexagon>
                )
              })}
            </Layout>
          </HexGrid>
        </TransformComponent>
      </TransformWrapper>

      <ExpandableSlider
        layoutkey="saturation-wb-pyramid"
        value={hue}
        onValueChange={setHue}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        title="Hue"
        min={0}
        max={360}
        format={(value) => `${value}°`}
        debounceTimeout={150}
      />
    </div>
  )
}
