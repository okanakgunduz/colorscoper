import { useState } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import ExpandableSlider from "@components/common/expandable-slider"
import useZoomableGrid from "@hooks/useZoomableGrid"
import { HEX_SIZE_L1, HEX_SIZE_L2, HEX_SIZE_L3 } from "./constants"
import SVGHexPyramid from "./svg-hex-pyramid"

export default function SaturationWBPyramid() {
  const [hue, setHue] = useState(227 /* [0, 360] degrees */)

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
            <SVGHexPyramid
              size={HEX_SIZE_L1}
              style={style[0]}
              {...{
                handleMouseDown,
                handleMouseMove,
                handleMouseUp,
                hue,
              }}
            />
            <SVGHexPyramid
              size={HEX_SIZE_L2}
              style={style[1]}
              factor={HEX_SIZE_L1 / HEX_SIZE_L2}
              {...{
                handleMouseDown,
                handleMouseMove,
                handleMouseUp,
                hue,
              }}
            />
            <SVGHexPyramid
              size={HEX_SIZE_L3}
              style={style[2]}
              factor={HEX_SIZE_L1 / HEX_SIZE_L3}
              {...{
                handleMouseDown,
                handleMouseMove,
                handleMouseUp,
                hue,
              }}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Hue Slider */}

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
