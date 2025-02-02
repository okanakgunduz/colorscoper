import { Color } from "chroma-js"
import { create } from "zustand"
import { createComputed } from "zustand-computed"
import { toRoundedString, toString } from "@utils/color"
import createSelectors from "@utils/create-selectors"

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

interface ColorModeStore {
  mode: ColorMode
  setColorMode: (mode: ColorMode) => void
}

interface Computed {
  getColorString: (color: Color) => string
  getRoundedColorString: (color: Color) => string
}

const computed = createComputed(
  (state: ColorModeStore): Computed => ({
    getColorString: (color) => toString(color, state.mode),
    getRoundedColorString: (color) => toRoundedString(color, state.mode),
  }),
)

/* Default Store Values */

const useColorModeStoreBase = create<ColorModeStore>()(
  computed((set) => ({
    mode: ColorMode.HEX,
    setColorMode: (mode) => set({ mode }),
  })),
)

export const useColorModeStore = createSelectors(useColorModeStoreBase)
