import { useEffect } from "react"

export function useDebug<T>(value: T, label: string = "State") {
  useEffect(() => {
    console.log(
      `%c[Debug] %c${label}:`,
      "color: #4caf50; font-weight: bold;",
      "color: #2196f3;",
      value,
    )
  }, [value, label])
}
