import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  createElement,
} from "react"
import useCopyToClipboard from "@hooks/useCopyToClipboard"
import { useHover } from "@hooks/useHover"
import cx, { Class } from "@utils/cx"

type CopyProps<T extends ElementType> = {
  data: string
  children: ReactNode
  className?: Class
  element?: T
} & ComponentPropsWithoutRef<T>

export default function Copy<T extends ElementType = "span">({
  children,
  data,
  className,
  element: Element = "span" as T,
  ...props
}: CopyProps<T>) {
  const [ref, hovering] = useHover<HTMLElement>({
    delay: 1000,
  })

  const { copied, copy } = useCopyToClipboard({
    data,
    timeout: 1000,
  })

  return createElement(
    Element,
    {
      ref,
      className: cx(className, "cursor-pointer no-opsz"),
      onClick: copy,
      ...props,
    },
    copied ? "Copied!" : hovering ? "Copy" : children,
  )
}
