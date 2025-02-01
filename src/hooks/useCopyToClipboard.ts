import { useCallback, useEffect } from "react"

import useBoolean from "@hooks/useBoolean"

interface Props {
  timeout?: number
  data: string
}

export default function useCopyToClipboard({ timeout = 3000, data }: Props) {
  const { value /* copied */, setTrue, setFalse } = useBoolean(false)

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(data)
    setTrue()
  }, [data, setTrue])

  useEffect(() => {
    if (value === false) return

    const copyTimeout = setTimeout(() => setFalse(), timeout)
    return () => clearTimeout(copyTimeout)
  }, [value, setFalse, timeout])

  return { copied: value, copy }
}
