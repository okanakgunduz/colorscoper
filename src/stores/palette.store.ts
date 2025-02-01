import chroma, { type Color } from "chroma-js"
import { create } from "zustand"

import createSelectors from "@utils/create-selectors"

interface State {
  colors: Array<Color>
}

interface Action {
  clear: (index: number) => void
  clearAll: () => void
}

const usePaletteStoreBase = create<State & Action>()(() => ({
  colors: [
    chroma("#4393FA"),
    chroma("#2B2B81"),
    chroma("#728CDF"),
    chroma("#D5A9F6"),
    chroma("#2D10B6"),
  ],
  clear: (index) => {},
  clearAll: () => {},
}))

export const usePaletteStore = createSelectors(usePaletteStoreBase)
