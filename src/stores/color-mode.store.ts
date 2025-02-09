import { Color } from "chroma-js"
import { create } from "zustand"
import { createComputed } from "zustand-computed"
import { ColorMode, toRoundedString, toString } from "@utils/color"
import createSelectors from "@utils/create-selectors"

type ColorModeStore = {
  mode: ColorMode
  setColorMode: (mode: ColorMode) => void
}

type Computed = {
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
