import { useCallback, useEffect, useRef, useState } from "react"

export function useThrottle<T>(value: T, delay: number = 100): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastCall = useRef<number>(0)

  useEffect(() => {
    const now = Date.now()
    if (now - lastCall.current >= delay) {
      lastCall.current = now
      setThrottledValue(value)
    }
  }, [value, delay])

  return throttledValue
}

export function useThrottleCallback<T>(
  callback: (value: T) => void,
  delay: number = 100,
) {
  const lastCall = useRef<number>(0)

  return useCallback(
    (value: T) => {
      const now = Date.now()
      if (now - lastCall.current >= delay) {
        lastCall.current = now
        callback(value)
      }
    },
    [callback, delay],
  )
}

export function useDebounce() {
  const debounceSeed = useRef<NodeJS.Timeout | null>(null)

  const debounceFunction = useRef((func: () => void, timeout = 200) => {
    if (debounceSeed.current) {
      clearTimeout(debounceSeed.current)
      debounceSeed.current = null
    }

    debounceSeed.current = setTimeout(() => {
      func()
    }, timeout)
  })

  return (func: () => void, timeout?: number) =>
    debounceFunction.current(func, timeout)
}
