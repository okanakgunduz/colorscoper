import cx from "@/utils/cx"
import type { ClassValue } from "clsx"

interface Props {
  className?: ClassValue
}

export default function Picker({ className }: Props) {
  return <div className={cx(className)}>Picker</div>
}
