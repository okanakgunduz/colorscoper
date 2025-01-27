import cx from "@/utils/cx"
import type { ClassValue } from "clsx"
import Help from "@/components/help"
import { useBaseColorStore } from "@/stores/color.store"
import EmptyState from "./empty-state"
import ColorState from "./color-state"

interface Props {
  className?: ClassValue
}

export default function Sidebar({ className }: Props) {
  const baseColor = useBaseColorStore((state) => state.baseColor)

  return (
    <div className={cx(className, "relative")}>
      {baseColor === null ? <EmptyState /> : <ColorState />}
      <Help className="absolute right-5 bottom-5" />
    </div>
  )
}
