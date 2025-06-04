import { useSelectionStore } from "@stores/selection.store"
import { useSidebarStore } from "@stores/sidebar.store"
import For from "@components/common/for"
import { ColorRelationship, getHueSections, rotateHue } from "@utils/color"
import cx, { Class } from "@utils/cx"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import romanize from "@utils/romanize"

interface Props {
  relationship: ColorRelationship
  className?: Class
}

export default function ColorHarmonyPalette({
  relationship,
  className,
}: Props) {
  const base = useSelectionStore.use.color()

  const insertSlot = useSidebarStore.use.insertSlot()

  if (!base?.value) return

  return (
    <div
      className={cx(
        "bg-muted-background has-adjacent-hover:opacity-50 grid h-12 w-full grid-rows-1 overflow-hidden rounded",
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${getHueSections(relationship).length}, 1fr)`,
      }}
    >
      <For
        each={getHueSections(relationship)}
        renderItem={section => {
          const color = rotateHue(base.value, section * 30)

          return (
            <button
              onClick={() => insertSlot(color)}
              className="flex cursor-pointer active:brightness-90"
              key={`color-harmony-palette-${section}`}
            >
              <span
                className="flex size-full items-center justify-center font-medium"
                style={{
                  background: color.css(),
                  color: getOptimizedTextColor(color).css(),
                }}
              >
                {romanize(section + 1)}
              </span>
            </button>
          )
        }}
      />
    </div>
  )
}
