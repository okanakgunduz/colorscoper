import { Hexagon } from "@phosphor-icons/react"
import { ColumnsPlusRight } from "@phosphor-icons/react/dist/ssr"
import { Color } from "chroma-js"
import { useCallback } from "react"
import { useShallow } from "zustand/shallow"
import Button from "@components/common/button"
import Copy from "@components/common/copy"
import For from "@components/common/for"
import cx from "@utils/cx"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import { useColorModeStore } from "@stores/color-mode.store"
import { usePaletteStore } from "@stores/palette.store"
import { PaletteColor, useSelectionStore } from "@stores/selection.store"
import { type Slot, useSidebarStore } from "@stores/sidebar.store"

export default function ColorSlots() {
  const selectType = useSelectionStore.use.type()
  const color = useSelectionStore.use.color()

  const deleteColor = usePaletteStore.use.delete()

  const [slots, paletteInsertable, insertToPalette, clearSlot, selectedIndex] =
    useSidebarStore(
      useShallow((state) => [
        state.slots,
        state.paletteInsertable,
        state.insertSelectedToPalette,
        state.clearSlot,
        state.selectedIndex,
      ]),
    )

  if (selectType === null || color === null) return

  return (
    <div className="px-sidebar mb-5">
      <ColorDisplay color={color.value} />

      {/* Color Slots */}

      <div className="mb-4 flex justify-between">
        <For each={slots}>
          {(slot, i) => <Slot slot={slot} index={i} key={`color-slot-${i}`} />}
        </For>
      </div>

      {/* Buttons */}

      <div className="flex items-center justify-end gap-0.5">
        {selectType === "palette" && (
          <Button
            onClick={() => deleteColor((color as PaletteColor).index)}
            className="mr-auto px-0 text-red-500"
          >
            Delete
          </Button>
        )}

        {selectedIndex !== null && slots[selectedIndex] !== null && (
          <Button onClick={() => clearSlot(selectedIndex)}>Clean</Button>
        )}
        <Button
          disabled={!paletteInsertable()}
          type="fill"
          icon={ColumnsPlusRight}
          onClick={insertToPalette}
        >
          Insert
        </Button>
      </div>
    </div>
  )
}

function ColorDisplay({ color }: { color: Color }) {
  const getColorString = useColorModeStore.use.getColorString()
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()

  return (
    <div
      className="mb-3 flex w-full items-center justify-between rounded p-4"
      style={{
        background: color.css(),
        color: getOptimizedTextColor(color).css(),
      }}
    >
      <span className="flex gap-1 font-medium">
        <Hexagon weight="fill" size={20} />
        Base
      </span>

      <Copy
        className="text-caption grow text-end"
        element="button"
        type="button"
        data={getColorString(color)}
      >
        {getRoundedColorString(color)}
      </Copy>
    </div>
  )
}

type SlotProps = { index: number; slot: Slot | null }

function Slot({ index, slot }: SlotProps) {
  const clearSelectedIndex = useSidebarStore.use.unsetSelectedIndex()
  const setSelectedIndex = useSidebarStore.use.setSelectedIndex()
  const selectedIndex = useSidebarStore.use.selectedIndex()

  const toggleSelection = useCallback(
    () =>
      selectedIndex === index ? clearSelectedIndex() : setSelectedIndex(index),
    [selectedIndex, index, clearSelectedIndex, setSelectedIndex],
  )

  return (
    <button
      onClick={toggleSelection}
      className={cx(
        "ring-accent selected:ring-3 size-10 cursor-pointer rounded border-[1.5px] ring-offset-2 transition-[box-shadow]",
        {
          "bg-muted-background": slot === null,
          "border-transparent": slot !== null,
        },
      )}
      style={
        slot === null
          ? {}
          : {
              backgroundColor: slot.color.css(),
            }
      }
      data-selected={selectedIndex === index}
    ></button>
  )
}
