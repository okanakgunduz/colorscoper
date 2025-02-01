import cx, { type Class } from "@/utils/cx"

interface Props {
  className?: Class
}

export default function BottomBar({ className }: Props) {
  return <section className={cx(className)}>BottomBar</section>
}
