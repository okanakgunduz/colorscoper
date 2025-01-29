import cx, { type Class } from "@utils/cx"
import Help from "@components/help"
import EmptyState from "./empty-state"
import ColorState from "./color-state"
import { useBaseColorStore } from "@stores/base-color.store"

interface Props {
  className?: Class
}

export default function Sidebar({ className }: Props) {
  const selection = useBaseColorStore((state) => state.selectionType)

  return (
    <div className={cx(className, "relative")}>
      {selection === "none" ? <EmptyState /> : <ColorState />}
      <Help className="absolute right-5 bottom-5" />
    </div>
  )
}
