import cx, { Class } from "@utils/cx"

interface Props {
  className: Class
}

export default function SnapperForeground({ className }: Props) {
  return (
    <div
      className={cx(
        className,
        "z-20 flex items-center justify-center text-lg font-bold text-white",
      )}
    >
      Foreground
    </div>
  )
}
