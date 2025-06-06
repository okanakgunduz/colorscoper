import { appConfig } from "@/config"
import { type Color } from "chroma-js"
import { create } from "zustand"
import createSelectors from "@utils/create-selectors"
import { impush } from "@utils/immutable"
import { useSelectionStore } from "./selection.store"
import { useSidebarStore } from "./sidebar.store"

interface State {
  colors: Array<Color>
}

interface Action {
  delete: (index: number) => void
  insert: (color: Color) => void
  setColors: (colors: Color[]) => void
  clearAll: () => void
}

const usePaletteStoreBase = create<State & Action>()(set => ({
  /* State */
  colors: [],

  /* Action */
  insert: color =>
    set(state => {
      if (state.colors.length >= appConfig.maxPaletteLimit)
        return {
          colors: state.colors,
        }

      return {
        colors: impush(state.colors, color),
      }
    }),

  delete: index => {
    useSidebarStore.getState().reset()
    useSelectionStore.getState().clearSelection()
    set(state => ({ colors: state.colors.filter((_, i) => i !== index) }))
  },

  setColors: colors =>
    set({ colors: colors.slice(0, appConfig.maxPaletteLimit) }),
  clearAll: () => set({ colors: [] }),
}))

export const usePaletteStore = createSelectors(usePaletteStoreBase)
