import chroma, { Color } from "chroma-js"
import { create } from "zustand"
import { createComputed } from "zustand-computed"

import { rotateHue } from "@utils/color"
import createSelectors from "@utils/create-selectors"

const SelectionType = {
  Picker: "picker",
  Palette: "palette",
} as const

type SelectionType = Enumize<typeof SelectionType>

interface Selection<
  T extends SelectionType | null,
  C extends PickerColor | PaletteColor | null,
> {
  type: T
  color: C
}

export interface PickerColor {
  value: Color
}

export interface PaletteColor {
  value: Color
  index: number
}

type NoneSelection = Selection<null, null>
type PickerSelection = Selection<typeof SelectionType.Picker, PickerColor>
type PaletteSelection = Selection<typeof SelectionType.Palette, PaletteColor>

type State = NoneSelection | PickerSelection | PaletteSelection
type Action = {
  setPickerSelection: (color: Color) => void
  setPaletteSelection: (color: Color, index: number) => void
  clearSelection: () => void
}
type Computed = {
  hasSelection: boolean
  getHueRotated: (angle: number) => Color | null
}

const computed = createComputed(
  (state: State & Action): Computed => ({
    hasSelection: state.type !== null,
    getHueRotated: function (angle) {
      return state.type !== null ? rotateHue(state.color!.value, angle) : null
    },
  }),
)

const useSelectionStoreBase = create<State & Action>()(
  computed((set) => ({
    /* State */
    type: SelectionType.Palette,
    color: {
      value: chroma("#4393F9"),
      index: 0,
    },

    /* Utils */
    setPickerSelection: (color) =>
      set({ type: SelectionType.Picker, color: { value: color } }),

    setPaletteSelection: (color, index) =>
      set({ type: SelectionType.Palette, color: { value: color, index } }),

    clearSelection: () => set({ type: null, color: null }),
  })),
)

export const useSelectionStore = createSelectors(useSelectionStoreBase)
