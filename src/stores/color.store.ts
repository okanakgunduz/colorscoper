import { create } from "zustand"
import chroma from "chroma-js"
import createEnum from "@/utils/create-enum"
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
  baseColor: chroma("#013B00"),
  selectionType: BaseColorSelectionType.Insert,
  clearBaseColor: () => set({ baseColor: null }),
  setBaseColor: (color: Color) => set({ baseColor: color }),
}))
