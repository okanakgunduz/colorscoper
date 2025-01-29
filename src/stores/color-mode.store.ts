import { create } from "zustand"

export const ColorMode = {
  RGB: "rgb",
  HEX: "hex",
  HSL: "hsl",
  LAB: "lab",
  OKLCH: "oklch",
} as const

type ColorMode = Enumize<typeof ColorMode>

interface ColorModeStore {
  mode: ColorMode
  setColorMode: (mode: ColorMode) => void
}

/* Default Store Values */

export const useColorModeStore = create<ColorModeStore>((set) => ({
  mode: ColorMode.HEX,
  setColorMode: (mode) => set({ mode }),
}))
