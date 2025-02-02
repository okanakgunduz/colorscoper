import useEventListener from "./useEventListener"

interface Props {
  type?: "keydown" | "keyup" | "keypress"
  key: string | string[] | null
  callback: (event?: globalThis.KeyboardEvent) => void
}

export default function useKeyListener({
  type = "keyup",
  key,
  callback,
}: Props) {
  useEventListener(type, (e) => {
    if (key === null) return callback(e)
    if (Array.isArray(key)) {
      if (key.includes(e.code)) return callback(e)
      return
    }

    if (key === e.code) callback(e)
  })
}
