import { useEffect, useRef } from "react"

export default function useEventListener<T extends keyof WindowEventMap>(
  eventType: T,
  callback: (event: WindowEventMap[T]) => void,
  element:
    | HTMLElement
    | Window
    | Document
    | React.RefObject<HTMLElement | null> = window,
  options?: boolean | AddEventListenerOptions,
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const target = element && "current" in element ? element.current : element

    if (!target) return

    const handler = (event: Event) => {
      callbackRef.current(event as WindowEventMap[T])
    }

    target.addEventListener(eventType, handler, options)

    return () => {
      target.removeEventListener(eventType, handler, options)
    }
  }, [eventType, element, options])
}
