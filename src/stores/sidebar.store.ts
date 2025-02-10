import { Color } from "chroma-js"
import { create } from "zustand"
import { createComputed } from "zustand-computed"
import createSelectors from "@utils/create-selectors"
import { immutate } from "@utils/immutable"
import { MAX_PALETTE_COUNT, usePaletteStore } from "./palette.store"

const SLOT_COUNT = 6

export interface Slot {
  color: Color
}

type State = {
  slots: Array<Slot | null>
  selectedIndex: number | null
}

type Action = {
  clearSlots: () => void
  clearSlot: (i: number) => void
  insertSlot: (color: Color) => void
  setSelectedIndex: (i: number) => void
  clearSelectedIndex: () => void
}

type Computed = {
  paletteInsertable: () => boolean
  insertSelectedToPalette: () => void
  reset: () => void
}

const computed = createComputed(
  (state: State & Action): Computed => ({
    paletteInsertable: () => {
      return (
        state.selectedIndex !== null &&
        state.slots[state.selectedIndex] !== null &&
        usePaletteStore.getState().colors.length < MAX_PALETTE_COUNT
      )
    },
    insertSelectedToPalette: () => {
      if (state.selectedIndex === null) return

      const slot = state.slots[state.selectedIndex]
      if (slot === null) return

      usePaletteStore.getState().insert(slot.color)
      state.clearSlot(state.selectedIndex)
      state.clearSelectedIndex()
    },
    reset: () => {
      state.clearSlots()
      state.clearSelectedIndex()
    },
  }),
)

const useSidebarStoreBase = create<State & Action>()(
  computed((set) => ({
    /* State */
    slots: new Array(SLOT_COUNT).fill(null),
    selectedIndex: null,

    /* Action */
    insertSlot: (color) =>
      set((state) => {
        if (state.selectedIndex === null) {
          const firstNullIndex = state.slots.indexOf(null)

          return {
            slots: immutate(state.slots, firstNullIndex, { color } as Slot),
          }
        } else {
          return {
            slots: immutate(state.slots, state.selectedIndex, {
              color,
            } as Slot),
            selectedIndex: null,
          }
        }
      }),

    clearSlot: (i) =>
      set((state) => ({ slots: immutate(state.slots, i, null) })),

    clearSlots: () => set({ slots: new Array(SLOT_COUNT).fill(null) }),

    setSelectedIndex: (i) => set({ selectedIndex: i }),
    clearSelectedIndex: () => set({ selectedIndex: null }),
  })),
)

export const useSidebarStore = createSelectors(useSidebarStoreBase)
