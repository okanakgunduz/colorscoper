import { Color } from "chroma-js"
import { CSSProperties } from "react"
import Copy from "@components/common/copy"
import { ContrastType } from "@utils/color"
import { useColorModeStore } from "@stores/color-mode.store"

interface Props {
  type: ContrastType
  base: Color
  contrastColor: Color
  contrastValue: number
}

export default function ContrastLine({ contrastColor, base }: Props) {
  const getColorString = useColorModeStore.use.getColorString()
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()

  return (
    <div className="flex w-full items-center gap-2">
      <div
        className="flex size-14 items-center justify-center bg-(--bg) transition"
        style={
          {
            "--bg": base.css(),
          } as CSSProperties
        }
      >
        <span
          className="block size-10 rounded-full bg-(--bg) transition"
          style={
            {
              "--bg": contrastColor.css(),
            } as CSSProperties
          }
        ></span>
      </div>
      <div>
        <h2 className="font-medium">Hue Contrast</h2>
        <Copy element="p" data={getColorString(contrastColor)}>
          {getRoundedColorString(contrastColor)}
        </Copy>
      </div>
    </div>
  )
}
