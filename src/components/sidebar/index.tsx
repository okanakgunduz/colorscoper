import cx from "@/utils/cx"
import type { ClassValue } from "clsx"

interface Props {
  className?: ClassValue
}

export default function Sidebar({ className }: Props) {
  return <div className={cx(className)}>Sidebar</div>
}
