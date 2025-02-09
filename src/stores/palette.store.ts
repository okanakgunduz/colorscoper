import chroma, { type Color } from "chroma-js"
import { create } from "zustand"
import createSelectors from "@utils/create-selectors"
import { impush } from "@utils/immutable"

const MAX_PALETTE_COUNT = 8

interface State {
  colors: Array<Color>
}

interface Action {
  delete: (index: number) => void
  insert: (color: Color) => void
  clearAll: () => void
}

const usePaletteStoreBase = create<State & Action>()((set) => ({
  /* State */
  colors: [
    chroma("#4393FA"),
    chroma("#2B2B81"),
    chroma("#728CDF"),
    chroma("#D5A9F6"),
    chroma("#2D10B6"),
  ],

  /* Action */
  insert: (color) =>
    set((state) => {
      if (state.colors.length >= MAX_PALETTE_COUNT)
        return {
          colors: state.colors,
        }

      return {
        colors: impush(state.colors, color),
      }
    }),

  delete: (index) =>
    set((state) => ({ colors: state.colors.filter((_, i) => i !== index) })),

  clearAll: () => set({ colors: [] }),
}))

export const usePaletteStore = createSelectors(usePaletteStoreBase)
