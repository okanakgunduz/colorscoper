import chroma, { Color } from "chroma-js"

export const ColorMode = {
  RGB: "rgb",
  HEX: "hex",
  HSL: "hsl",
  LAB: "lab",
  LCH: "lch",
  OKLCH: "oklch",
  OKLAB: "oklab",
} as const

export type ColorMode = Enumize<typeof ColorMode>

export const ContrastType = {
  HUE: "hue",
  SAT: "sat",
  LUM: "lum",
  HUE_SAT: "hue-sat",
  HUE_LUM: "hue-lum",
  SAT_LUM: "sat-lum",
  HUE_SAT_LUM: "hue-sat-lum",
} as const

export type ContrastType = Enumize<typeof ContrastType>

export const ColorRelationship = {
  Monochromatic: "monochromatic",
  DiadPositive: "diad-positive",
  DiadNegative: "diad-negative",
  Complementary: "complementary",
  SplitComplementary: "split-complementary",
  Triad: "triad",
  Analogous: "analogous",
  DoubleComplementaryPositive: "double-complementary-positive",
  DoubleComplementaryNegative: "double-complementary-negative",
  RectangularTetradPositive: "rectangular-tetrad-positive",
  RectangularTetradNegative: "rectangular-tetrad-negative",
  SquareTetrad: "square-tetrad",
  Polychromatic: "polychromatic",
} as const

export type ColorRelationship = Enumize<typeof ColorRelationship>

export const relationshipMap: Record<ColorRelationship, Array<number>> = {
  monochromatic: [0],
  "diad-positive": [0, 2],
  "diad-negative": [0, 10],
  complementary: [0, 6],
  "split-complementary": [0, 5, 7],
  triad: [0, 4, 8],
  analogous: [11, 0, 1],
  "double-complementary-positive": [0, 1, 6, 7],
  "double-complementary-negative": [0, 5, 6, 11],
  "rectangular-tetrad-positive": [0, 2, 6, 8],
  "rectangular-tetrad-negative": [0, 4, 6, 10],
  "square-tetrad": [0, 3, 6, 9],
  polychromatic: [0, 2, 4, 6, 8, 10],
}

export const getHueSections = (relationship: ColorRelationship) =>
  relationshipMap[relationship]

const adjustSaturation = (s: number) => {
  if (s < 0.6 && s >= 0.5) return 0.1
  if (s > 0.4 && s < 0.5) return 1
  return 1 - s
}

export function getContrasted(type: ContrastType, color: Color): Color {
  const [h, s, l] = chroma(color).hsl()

  switch (type) {
    case ContrastType.HUE:
      return chroma.hsl((h + 180) % 360, s, l)

    case ContrastType.SAT:
      return chroma.hsl(h, adjustSaturation(s), l)

    case ContrastType.LUM:
      return chroma.hsl(h, s, 1 - l)

    case ContrastType.HUE_SAT:
      return chroma.hsl((h + 180) % 360, adjustSaturation(s), l)

    case ContrastType.HUE_LUM:
      return chroma.hsl((h + 180) % 360, s, 1 - l)

    case ContrastType.SAT_LUM:
      return chroma.hsl(h, adjustSaturation(s), 1 - l)

    case ContrastType.HUE_SAT_LUM:
      return chroma.hsl((h + 180) % 360, adjustSaturation(s), 1 - l)

    default:
      throw new Error("Unknown contrast type")
  }
}

export function getContrastValue(color1: Color, color2: Color): number {
  const luminance1 = chroma(color1).luminance()
  const luminance2 = chroma(color2).luminance()

  const [L1, L2] =
    luminance1 > luminance2
      ? [luminance1, luminance2]
      : [luminance2, luminance1]

  // WCAG contrast ratio formula
  return (L1 + 0.05) / (L2 + 0.05)
}

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
  const round = (value: number) => Math.round((value || 0) * 10) / 10
  const round2 = (value: number) => Math.round((value || 0) * 100) / 100
  const toPercent = (value: number) => `${round((value || 0) * 100)}%`

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
