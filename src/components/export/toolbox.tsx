import cx, { Class } from "@/lib/utils/cx"
import { Icon } from "@phosphor-icons/react"
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"

type ButtonProps = {
  icon: Icon
  className?: Class
  title: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function ToolboxButton({
  icon: Icon,
  className,
  title,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cx(
        "hover:bg-muted-background flex cursor-pointer flex-col items-center gap-0.5 rounded px-2 pt-1.5 pb-1 transition active:opacity-60 print:hidden",
        className,
      )}
    >
      <Icon />
      <span className="font-medium">{title}</span>
    </button>
  )
}

type LinkProps = {
  icon: Icon
  className?: Class
  title: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function ToolboxLink({
  icon: Icon,
  className,
  title,
  ...rest
}: LinkProps) {
  return (
    <a
      {...rest}
      className={cx(
        "hover:bg-muted-background flex cursor-pointer flex-col items-center gap-0.5 rounded px-2 pt-1.5 pb-1 transition active:opacity-60 print:hidden",
        className,
      )}
    >
      <Icon />
      <span className="font-medium">{title}</span>
    </a>
  )
}
