import { create } from "zustand"
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

/* Default Store Values */

const useColorModeStoreBase = create<ColorModeStore>()((set) => ({
  mode: ColorMode.HEX,
  setColorMode: (mode) => set({ mode }),
}))

export const useColorModeStore = createSelectors(useColorModeStoreBase)
