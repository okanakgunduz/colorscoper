import cx from "@/utils/cx"
import type { ClassValue } from "clsx"

interface Props {
  className?: ClassValue
}

export default function BottomBar({ className }: Props) {
  return <div className={cx(className)}>BottomBar</div>
}
