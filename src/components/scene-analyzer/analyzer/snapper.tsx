import cx, { Class } from "@utils/cx"
import { BGState } from "."

interface Props {
  state: BGState
  className: Class
}

export default function Snapper({ state, className }: Props) {
  return (
    <div className={cx(className, "flex items-center justify-center")}>
      {JSON.stringify(state)}
    </div>
  )
}
