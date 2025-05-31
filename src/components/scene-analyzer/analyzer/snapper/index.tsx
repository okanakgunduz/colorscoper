import { Color } from "chroma-js"
import cx, { Class } from "@utils/cx"
import { BGState } from ".."
import SnapperBackground from "./snapper-background"
import SnapperForeground from "./snapper-foreground"

interface Props {
  state: BGState
  className: Class
  foreground: { id: string; color: Color }[]
  background: Color[]
  onFilled?: () => void
  onRemove?: (id: string) => void
}

export default function Snapper({
  state,
  className,
  background,
  foreground,
  onFilled,
  onRemove,
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
        onRemove={onRemove}
        items={foreground}
        className="absolute inset-1"
      />
    </div>
  )
}
