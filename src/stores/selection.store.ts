import createSelectors from "@/utils/create-selectors"
import chroma, { Color } from "chroma-js"
import { create } from "zustand"
import { rotateHue } from "@/utils/color"

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

type State = NoneSelection | PickerSelection | PaletteSelection
type Action = {
  setPickerSelection: (color: Color) => void
  setPaletteSelection: (color: Color, index: number) => void
  clearSelection: () => void
  hasSelection: () => boolean
  getHueRotated: (angle: number) => Color | null
}

const useSelectionStoreBase = create<State & Action>()((set, get) => ({
  /* State */
  type: SelectionType.Picker,
  color: {
    value: chroma("#027FFE"),
  },

  /* Utils */
  setPickerSelection: (color) =>
    set({ type: SelectionType.Picker, color: { value: color } }),

  setPaletteSelection: (color, index) =>
    set({ type: SelectionType.Palette, color: { value: color, index } }),

  clearSelection: () => set({ type: null, color: null }),

  hasSelection: () => get().type !== null,

  getHueRotated: (angle) =>
    get().hasSelection() ? rotateHue(get()!.color!.value, angle) : null,
}))

export const useSelectionStore = createSelectors(useSelectionStoreBase)
