import cx, { type Class } from "@utils/cx"

interface Props {
  className?: Class
}

export default function Help({ className }: Props) {
  return (
    <button
      className={cx(
        className,
        "bg-muted-background size-8 rounded-full border",
      )}
    >
      ?
    </button>
  )
}
