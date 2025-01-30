import { useCallback, useRef } from "react"
import type { RefObject } from "react"
import useEventListener from "@hooks/useEventListener"
import useBoolean from "@hooks/useBoolean"

export function useHover<T extends HTMLElement = HTMLElement>({
  delay = 0,
}: {
  delay: number
}): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null)
  const { value: isHovered, setFalse, setTrue } = useBoolean(false)
  const hoverTimeoutRef = useRef<number | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (delay === 0) {
      setTrue()
    } else {
      hoverTimeoutRef.current = window.setTimeout(setTrue, delay)
    }
  }, [delay, setTrue])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current !== null) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setFalse()
  }, [setFalse])

  useEventListener("mouseenter", handleMouseEnter, elementRef)
  useEventListener("mouseleave", handleMouseLeave, elementRef)

  return [elementRef, isHovered]
}
