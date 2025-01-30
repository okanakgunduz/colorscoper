import { create } from "zustand"
import chroma from "chroma-js"
import type { Color } from "chroma-js"

export const BaseColorSelectionType = {
  Insert: "insert",
  Update: "update",
  None: "none",
} as const

type BaseColorSelectionType = Enumize<typeof BaseColorSelectionType>

interface BaseColorStateCommon {
  clearBaseColor: () => void
  setBaseColor: (
    color: Color,
    selectionType: Exclude<BaseColorSelectionType, "none">,
  ) => void
}

interface BaseColorWithColor extends BaseColorStateCommon {
  selectionType: Exclude<BaseColorSelectionType, "none">
  baseColor: Color
}

interface BaseColorNone extends BaseColorStateCommon {
  selectionType: "none"
  baseColor: null
}

/* Default Store Values */

export const useBaseColorStore = create<BaseColorWithColor | BaseColorNone>(
  (set) => ({
    baseColor: chroma("#f3d000"),
    selectionType: BaseColorSelectionType.Insert,
    clearBaseColor: () => set({ baseColor: null, selectionType: "none" }),
    setBaseColor: (color, selectionType = "insert") => {
      set({ baseColor: color, selectionType })
    },
  }),
)
