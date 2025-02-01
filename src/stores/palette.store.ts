import createSelectors from "@/utils/create-selectors"
import { Color } from "chroma-js"
import { create } from "zustand"

interface PaletteStore {
  colors: Array<Color>
}

const usePaletteStoreBase = create<PaletteStore>()(() => ({
  colors: [],
}))

export const usePaletteStore = createSelectors(usePaletteStoreBase)
