import chroma, { Color } from "chroma-js"

export default function getOptimizedTextColor(input: string | Color): Color {
  const bgColor = typeof input === "string" ? chroma(input) : input
  const luminance = bgColor.luminance()
  const isGray = chroma(bgColor).saturate(1).get("hsl.s") <= 0.15

  if (isGray) return luminance > 0.5 ? chroma("#000000") : chroma("#FFFFFF")

  const textColor =
    luminance > 0.4
      ? bgColor.darken(4).saturate(1)
      : bgColor.brighten(4 * (1 + luminance)).saturate(1)
  return textColor
}
