import cx from "@/utils/cx"
import type { ClassValue } from "clsx"

interface Props {
  className?: ClassValue
}

export default function Help({ className }: Props) {
  return <button className={cx(className, "size-8 rounded-full bg-muted-background border")}>?</button>
}
