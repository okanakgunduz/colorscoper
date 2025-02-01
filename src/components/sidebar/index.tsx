import cx, { type Class } from "@utils/cx"
import Help from "@components/help"
import EmptyState from "./empty-state"
import ColorState from "./color-state"
import { useSelectionStore } from "@/stores/selection.store"

interface Props {
  className?: Class
}

export default function Sidebar({ className }: Props) {
  const hasSelection = useSelectionStore.use.hasSelection()

  return (
    <section className={cx(className, "relative")}>
      {hasSelection() ? <ColorState /> : <EmptyState />}
      <Help className="absolute right-5 bottom-5" />
    </section>
  )
}
