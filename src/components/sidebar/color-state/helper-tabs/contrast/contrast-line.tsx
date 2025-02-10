import { Color } from "chroma-js"
import Copy from "@components/common/copy"
import { ContrastType } from "@utils/color"
import { useColorModeStore } from "@stores/color-mode.store"

interface Props {
  type: ContrastType
  base: Color
  contrastColor: Color
  contrastValue: number
}

export default function ContrastLine({
  contrastColor,
  contrastValue,
  base,
  type,
}: Props) {
  const getColorString = useColorModeStore.use.getColorString()
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()

  return (
    <div className="flex w-full items-center gap-2">
      <div
        className="flex size-16 items-center justify-center"
        style={{ background: base.css() }}
      >
        <div
          className="flex size-11 items-center justify-center rounded-full"
          style={{ background: contrastColor.css() }}
        >
          <div
            className="size-4 rounded-full"
            style={{ background: base.css() }}
          ></div>
        </div>
      </div>
      <div>
        <h2 className="font-medium">Contrast {type}</h2>
        <Copy
          element="p"
          data={getColorString(contrastColor)}
          className="text-caption"
        >
          {getRoundedColorString(contrastColor)}
        </Copy>
        <span>{contrastValue.toFixed(2)}</span>
      </div>
    </div>
  )
}
