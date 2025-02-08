import type { Color } from "chroma-js"
import { motion, AnimatePresence, LayoutGroup } from "motion/react"
import { useMemo } from "react"
import { useShallow } from "zustand/shallow"
import For from "@components/common/for"
import useKeyListener from "@hooks/useKeyListener"
import cx, { Class } from "@utils/cx"
import { usePaletteStore } from "@stores/palette.store"
import { type PaletteColor, useSelectionStore } from "@stores/selection.store"

interface Props {
  className?: Class
}

export default function Palette({ className }: Props) {
  const paletteColors = usePaletteStore.use.colors()
  const deleteColor = usePaletteStore.use.delete()

  const [selectType, selectedColor, clearSelection] = useSelectionStore(
    useShallow((state) => [state.type, state.color, state.clearSelection]),
  )

  useKeyListener({
    key: "Backspace",
    callback: () => {
      if (selectType === "palette") {
        clearSelection()
        deleteColor((selectedColor as PaletteColor).index)
      }
    },
  })

  return (
    <div className={cx(className, "pl-sidebar flex items-center gap-6")}>
      <h2 className="text-paragraph-bold opacity-80">Palette</h2>

      <LayoutGroup>
        <motion.div layout className="flex items-center gap-2">
          <AnimatePresence initial={false}>
            {/* Color Slots */}
            <For each={paletteColors}>
              {(color, index) => (
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: { duration: 0.2 }
                  }}
                  exit={{ 
                    scale: 0, 
                    opacity: 0,
                    transition: { duration: 0.15 }
                  }}
                  key={`palette-color-${index}`}
                  transition={{ layout: { duration: 0.3 } }}
                >
                  <PaletteColor {...{ index, color }} />
                </motion.div>
              )}
            </For>
            {/* Placeholders */}
            <For times={Math.min(6 - paletteColors.length, 3)}>
              {(i) => (
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  key={`palette-placeholder-${i + paletteColors.length}`}
                  transition={{ layout: { duration: 0.3 } }}
                >
                  <button className="bg-muted-background relative size-7 rounded-md border border-dashed border-black/20" />
                </motion.div>
              )}
            </For>
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  )
}

type PaletteColorProps = { index: number; color: Color }

const PaletteColor = ({ index, color }: PaletteColorProps) => {
  const [selectType, selectedColor, select, clear] = useSelectionStore(
    useShallow((state) => [
      state.type,
      state.color,
      state.setPaletteSelection,
      state.clearSelection,
    ]),
  )

  const hasPicked = useMemo(
    () =>
      selectType === "palette" &&
      (selectedColor as PaletteColor).index === index,
    [selectType, selectedColor, index],
  )

  return (
    <button
      className="ring-accent outline-muted-background relative size-7 cursor-pointer rounded-md border border-black/10 ring-offset-2 transition data-[selected=true]:ring-3 data-[selected=true]:outline"
      style={{
        backgroundColor: color!.css(),
      }}
      onClick={() => (hasPicked ? clear() : select(color, index))}
      aria-selected={hasPicked}
      data-selected={hasPicked}
    >
      {hasPicked && (
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
          }}
          className="bg-accent absolute right-0 -bottom-[13px] left-0 mx-auto h-1 w-2 rounded-full"
          aria-hidden
        ></motion.span>
      )}
    </button>
  )
}
