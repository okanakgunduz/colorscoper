import cx, { type Class } from "@utils/cx"

import Actions from "./actions"
import Palette from "./palette"

interface Props {
  className?: Class
}

export default function BottomBar({ className }: Props) {
  return (
    <section className={cx(className, "flex justify-between items-center")}>
      <Palette />
      <Actions />
    </section>
  )
}
