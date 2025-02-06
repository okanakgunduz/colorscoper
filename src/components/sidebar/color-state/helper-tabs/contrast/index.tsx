import For from "@components/common/for"
import { ContrastType } from "@utils/color"
import { useSelectionStore } from "@stores/selection.store"
import ContrastLine from "./contrast-line"

export default function ContrastHelper() {
  const base = useSelectionStore.use.color()
  const getContrasted = useSelectionStore.use.getContrasted()

  return (
    <div className="px-sidebar mb-4 space-y-4">
      <For each={Object.values(ContrastType)}>
        {(type) => {
          const { contrastColor, contrastValue } = getContrasted(type)!
          return (
            <ContrastLine
              type={type}
              key={type}
              base={base!.value}
              contrastColor={contrastColor}
              contrastValue={contrastValue}
            />
          )
        }}
      </For>
    </div>
  )
}
