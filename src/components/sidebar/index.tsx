import cx from "@/utils/cx"
import type { ClassValue } from "clsx"
import Help from "@/components/help"

interface Props {
  className?: ClassValue
}

export default function Sidebar({ className }: Props) {
  return (
    <div className={cx(className, "text-paragraph relative")}>
      Sidebar
      <Help className="absolute right-5 bottom-5" />
    </div>
  )
}
