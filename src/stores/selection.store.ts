import chroma, { Color } from "chroma-js"
import { create } from "zustand"

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

interface PickerColor {
  value: Color
}

interface PaletteColor {
  value: Color
  index: number
}

type NoneSelection = Selection<null, null>
type PickerSelection = Selection<typeof SelectionType.Picker, PickerColor>
type PaletteSelection = Selection<typeof SelectionType.Palette, PaletteColor>

type SelectionStore = (NoneSelection | PickerSelection | PaletteSelection) & {
  setPickerSelection: (color: Color) => void
  setPaletteSelection: (color: Color, index: number) => void
  clearSelection: () => void
}

export const useSelectionStore = create<SelectionStore>((set) => ({
  /* State */
  type: SelectionType.Picker,
  color: {
    value: chroma("red"),
  },

  /* Utils */
  setPickerSelection: (color) =>
    set({ type: SelectionType.Picker, color: { value: color } }),

  setPaletteSelection: (color, index) =>
    set({ type: SelectionType.Palette, color: { value: color, index } }),

  clearSelection: () => set({ type: null, color: null }),
}))
