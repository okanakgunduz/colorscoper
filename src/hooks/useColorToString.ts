import { ColorMode, useColorModeStore } from "@stores/color-mode.store"
import type { Color } from "chroma-js"
import { useCallback } from "react"

export default function useColorToString() {
  const mode = useColorModeStore.use.mode()

  return useCallback(
    (color: Color) => {
      if (mode === ColorMode.HEX) return color.hex()
      return color.css(mode)
    },
    [mode],
  )
}
