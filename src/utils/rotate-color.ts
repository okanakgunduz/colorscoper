import { Color } from "chroma-js"

export default function rotateHue(color: Color, degrees: number): Color {
  const currentHue = color.get("hsl.h") || 0
  const newHue = (currentHue + degrees) % 360
  return color.set("hsl.h", newHue < 0 ? newHue + 360 : newHue)
}
