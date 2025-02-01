import { Color } from "chroma-js"
import { create } from "zustand"

interface PaletteStore {
  colors: Array<Color>
}

export const usePaletteStore = create<PaletteStore>(() => ({
  colors: [],
}))
