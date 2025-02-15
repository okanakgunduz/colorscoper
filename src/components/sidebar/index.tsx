import cx, { type Class } from "@utils/cx"
import { useSelectionStore } from "@stores/selection.store"
import ColorState from "./color-state"
import EmptyState from "./empty-state"

interface Props {
  className?: Class
}

export default function Sidebar({ className }: Props) {
  const hasSelection = useSelectionStore.use.hasSelection()

  return (
    <section className={cx(className, "relative")}>
      {hasSelection ? <ColorState /> : <EmptyState />}
    </section>
  )
}
