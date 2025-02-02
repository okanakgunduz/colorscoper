import chroma, { type Color } from "chroma-js"
import { create } from "zustand"
import createSelectors from "@utils/create-selectors"

interface State {
  colors: Array<Color>
}

interface Action {
  delete: (index: number) => void
  clearAll: () => void
}

const usePaletteStoreBase = create<State & Action>()((set) => ({
  colors: [
    chroma("#4393FA"),
    chroma("#2B2B81"),
    chroma("#728CDF"),
    chroma("#D5A9F6"),
    chroma("#2D10B6"),
  ],
  delete: (index) =>
    set((state) => ({ colors: state.colors.filter((_, i) => i !== index) })),
  clearAll: () => {},
}))

export const usePaletteStore = createSelectors(usePaletteStoreBase)
