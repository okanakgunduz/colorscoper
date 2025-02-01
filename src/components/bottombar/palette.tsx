import cx, { Class } from "@/utils/cx"

interface Props {
  className?: Class
}

export default function Palette({ className }: Props) {
  return (
    <div className={cx(className, "")}>
      <h2>Palette</h2>
    </div>
  )
}
