import { MutableRefObject, useLayoutEffect, useRef, useState } from "react"

export default function useDimensions<T extends HTMLElement>(): [
  MutableRefObject<T | null>,
  DOMRectReadOnly,
] {
  const elementRef = useRef<T | null>(null)
  const [rect, setRect] = useState<DOMRectReadOnly>(() => {
    if (typeof window === "undefined") return new DOMRect(0, 0, 0, 0)
    return (
      elementRef.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0)
    )
  })

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return

    const updateRect = () => setRect(element.getBoundingClientRect())

    const resizeObserver = new ResizeObserver(updateRect)
    resizeObserver.observe(element)

    updateRect()

    return () => resizeObserver.disconnect()
  }, [])

  return [elementRef, rect]
}
