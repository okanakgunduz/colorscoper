import { useCallback, useRef } from "react"
import type { RefObject } from "react"
import useEventListener from "@hooks/useEventListener"
import useBoolean from "@hooks/useBoolean"

export function useHover<T extends HTMLElement = HTMLElement>(): [
  RefObject<T>,
  boolean,
] {
  const elementRef = useRef<T>(null)
  const { value: isHovered, setFalse, setTrue } = useBoolean(false)

  const handleMouseEnter = useCallback(() => setTrue(), [setTrue])
  const handleMouseLeave = useCallback(() => setFalse(), [setFalse])

  useEventListener("mouseenter", handleMouseEnter, elementRef)
  useEventListener("mouseleave", handleMouseLeave, elementRef)

  return [elementRef, isHovered]
}
