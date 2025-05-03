import { ReactNode } from "react"

interface Props {
  condition: boolean
  renderItem: () => ReactNode
}

export default function If({ condition, renderItem }: Props) {
  return condition ? renderItem() : null
}
