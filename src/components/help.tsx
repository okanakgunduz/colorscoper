import cx, { type Class } from "@utils/cx"

interface Props {
  className?: Class
}

export default function Help({ className }: Props) {
  return (
    <button className={cx(className, "size-8 rounded-full border bg-white")}>
      ?
    </button>
  )
}
