import { create } from "zustand"
import chroma from "chroma-js"
import createEnum from "@/utils/createEnum"
import type { Color } from "chroma-js"

const BaseColorSelectionType = createEnum({
  Insert: "insert",
  Update: "update",
})

type BaseColorSelectionType =
  (typeof BaseColorSelectionType)[keyof typeof BaseColorSelectionType]

interface BaseColorState {
  baseColor: Color | null
  selectionType: BaseColorSelectionType
  clearBaseColor: () => void
  setBaseColor: (color: Color) => void
}

export const useBaseColorStore = create<BaseColorState>((set) => ({
  baseColor: null,
  selectionType: BaseColorSelectionType.Insert,
  clearBaseColor: () => set({ baseColor: null }),
  setBaseColor: (color: Color) => set({ baseColor: color }),
}))
