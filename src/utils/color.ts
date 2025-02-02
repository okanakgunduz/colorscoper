import { Color } from "chroma-js"
import { ColorMode } from "@stores/color-mode.store"

export function rotateHue(color: Color, degrees: number): Color {
  const currentHue = color.get("hsl.h") || 0
  const newHue = (currentHue + degrees) % 360
  return color.set("hsl.h", newHue < 0 ? newHue + 360 : newHue)
}

export function toString(color: Color, mode: ColorMode): string {
  if (mode === ColorMode.HEX) return color.hex()
  return color.css(mode)
}

export function toRoundedString(color: Color, mode: ColorMode): string {
  const round = (value: number) => Math.round(value * 10) / 10
  const round2 = (value: number) => Math.round(value * 100) / 100
  const toPercent = (value: number) => `${round(value * 100)}%`

  switch (mode) {
    case ColorMode.RGB:
      return `rgb(${color.rgb().slice(0, 3).map(round).join(", ")})`

    case ColorMode.HSL: {
      const [h, s, l] = color.hsl().slice(0, 3)
      return `hsl(${round(h)} ${toPercent(s)} ${toPercent(l)})`
    }

    case ColorMode.LAB: {
      const [l, a, b] = color.lab().slice(0, 3)
      return `lab(${round(l)}% ${round(a)} ${round(b)})`
    }

    case ColorMode.LCH: {
      const [l, c, h] = color.lch().slice(0, 3)
      return `lch(${round(l)}% ${round(c)} ${round(h)})`
    }

    case ColorMode.OKLAB: {
      const [l, a, b] = color.oklab().slice(0, 3)
      return `oklab(${toPercent(l)} ${round2(a)} ${round(b)})`
    }

    case ColorMode.OKLCH: {
      const [l, c, h] = color.oklch().slice(0, 3)
      return `oklch(${toPercent(l)} ${round2(c)} ${round2(h)})`
    }

    case ColorMode.HEX:
      return color.hex()
  }
}
