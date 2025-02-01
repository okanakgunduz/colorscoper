import cx, { Class } from "@utils/cx"

interface Props {
  className?: Class
}

export default function Actions({ className }: Props) {
  return (
    <div className={cx(className, "")}>
      <h2>Actions</h2>
    </div>
  )
}
