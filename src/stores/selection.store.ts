import chroma, { Color } from "chroma-js"
import { create } from "zustand"
import { createComputed } from "zustand-computed"
import {
  ContrastType,
  getContrastValue,
  getContrasted,
  rotateHue,
} from "@utils/color"
import createSelectors from "@utils/create-selectors"
import { useSidebarStore } from "./sidebar.store"

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
  getContrasted: (
    type: ContrastType,
  ) => { contrastColor: Color; contrastValue: number } | null
}

/* Computed Properties */

const computed = createComputed(
  (state: State & Action): Computed => ({
    hasSelection: state.type !== null,

    getHueRotated: (angle) => {
      if (state.type === null) return null
      return rotateHue(state.color.value, angle)
    },

    getContrasted: (type) => {
      if (state.type === null) return null

      const contrastColor = getContrasted(type, state.color.value)

      return {
        contrastColor: contrastColor,
        contrastValue: getContrastValue(contrastColor, state.color.value),
      }
    },
  }),
)

/* Store */

const useSelectionStoreBase = create<State & Action>()(
  computed((set) => ({
    /* State */
    type: SelectionType.Picker,
    color: {
      value: chroma("#4393fa"),
    },

    /* Utils */
    setPickerSelection: (color) => {
      useSidebarStore.getState().reset()
      set({ type: SelectionType.Picker, color: { value: color } })
    },

    setPaletteSelection: (color, index) => {
      useSidebarStore.getState().reset()
      set({ type: SelectionType.Palette, color: { value: color, index } })
    },

    clearSelection: () => {
      useSidebarStore.getState().reset()
      set({ type: null, color: null })
    },
  })),
)

export const useSelectionStore = createSelectors(useSelectionStoreBase)
