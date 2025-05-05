import { useState } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import useZoomableGrid from "@hooks/useZoomableGrid"
import { HEX_SIZE_L1, HEX_SIZE_L2, HEX_SIZE_L3 } from "./constants"
import SVGHexGrid from "./svg-hex-grid"

export default function HueSaturationWheel() {
  const [luminosity, setLuminosity] = useState(0.5 /* [0, 1] range */)

  const { zoomLevel, style, handleMouseDown, handleMouseUp, handleMouseMove } =
    useZoomableGrid({
      transitionPoints: [1.75, 3.25],
    })

  return (
    <div className="grid size-full place-items-center overflow-hidden">
      <TransformWrapper
        centerZoomedOut
        onZoom={({ state: { scale } }) => zoomLevel.set(scale)}
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
          }}
        >
          <div className="relative size-full">
            <SVGHexGrid
              size={HEX_SIZE_L1}
              style={style[0]}
              {...{
                handleMouseDown,
                handleMouseMove,
                handleMouseUp,
                luminosity,
              }}
            />

            <SVGHexGrid
              size={HEX_SIZE_L2}
              style={style[1]}
              factor={HEX_SIZE_L1 / HEX_SIZE_L2}
              {...{
                handleMouseDown,
                handleMouseMove,
                handleMouseUp,
                luminosity,
              }}
            />

            <SVGHexGrid
              size={HEX_SIZE_L3}
              style={style[2]}
              factor={HEX_SIZE_L1 / HEX_SIZE_L3}
              {...{
                handleMouseDown,
                handleMouseMove,
                handleMouseUp,
                luminosity,
              }}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Hue Slider */}

      <ExpandableSlider
        layoutkey="hue-saturation-wheel"
        value={luminosity * 100}
        onValueChange={(value) => setLuminosity(value / 100)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        title="Luminosity"
        min={15}
        max={75}
        format={(value) => `${value.toFixed(0)}%`}
        debounceTimeout={150}
      />
    </div>
  )
}
