import cx from "@/utils/cx"
import type { ClassValue } from "clsx"

interface Props {
  className?: ClassValue
}

export default function Palette({ className }: Props) {
  return <div className={cx(className)}>Palette</div>
}
