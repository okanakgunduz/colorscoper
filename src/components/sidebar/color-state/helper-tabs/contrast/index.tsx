import { useSelectionStore } from "@stores/selection.store"
import For from "@components/common/for"
import { ContrastType } from "@utils/color"
import ContrastLine from "./contrast-line"

export default function ContrastHelper() {
  const base = useSelectionStore.use.color()
  const getContrasted = useSelectionStore.use.getContrasted()

  return (
    <div className="mb-4 -space-y-1">
      <For
        each={Object.values(ContrastType)}
        renderItem={type => {
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
      />
    </div>
  )
}
