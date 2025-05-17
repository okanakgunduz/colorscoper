import { Color } from "chroma-js"
import cx, { Class } from "@utils/cx"
import { BGState } from ".."
import SnapperBackground from "./snapper-background"
import SnapperForeground from "./snapper-foreground"

interface Props {
  state: BGState
  className: Class
  foreground: Color[]
  background: Color[]
  onFilled?: () => void
}

export default function Snapper({
  state,
  className,
  background,
  foreground,
  onFilled,
}: Props) {
  return (
    <div className={cx(className, "relative")}>
      {/* Background */}

      <SnapperBackground
        className="absolute inset-0"
        state={state}
        background={background}
      />

      {/* Foreground */}

      <SnapperForeground
        onFilled={onFilled}
        items={foreground}
        className="absolute inset-1"
      />
    </div>
  )
}
