import { Color } from "chroma-js"
import namer from "color-namer"

export default function nameColor(color: Color) {
  return namer(color.hex()).pantone[0].name
}
