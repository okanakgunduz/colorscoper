import cx, { type Class } from "@utils/cx"
import Help from "@components/help"
import EmptyState from "./empty-state"
import ColorState from "./color-state"
import { useSelectionStore } from "@/stores/selection.store"

interface Props {
  className?: Class
}

export default function Sidebar({ className }: Props) {
  const selectionType = useSelectionStore((state) => state.type)

  return (
    <section className={cx(className, "relative")}>
      {selectionType === null ? <EmptyState /> : <ColorState />}
      <Help className="absolute right-5 bottom-5" />
    </section>
  )
}
