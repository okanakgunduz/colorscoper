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
}

export default function Snapper({ state, className, background }: Props) {
  return (
    <div
      className={cx(
        className,
        "grid grid-cols-1 grid-rows-1 items-center justify-center",
      )}
    >
      {/* Background */}

      <SnapperBackground
        className="col-span-full row-span-full h-full w-full"
        state={state}
        background={background}
      />

      {/* Foreground */}

      <SnapperForeground className="col-span-full row-span-full h-full w-full" />
    </div>
  )
}
