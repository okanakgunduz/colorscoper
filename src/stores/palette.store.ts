import { Color } from "chroma-js"
import { create } from "zustand"

import createSelectors from "@utils/create-selectors"

interface PaletteStore {
  colors: Array<Color>
}

const usePaletteStoreBase = create<PaletteStore>()(() => ({
  colors: [],
}))

export const usePaletteStore = createSelectors(usePaletteStoreBase)
