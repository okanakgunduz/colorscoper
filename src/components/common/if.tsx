import { ElementType, Fragment, ReactNode } from "react"

interface Props {
  condition: boolean
  renderItem: () => ReactNode
  wrapper?: ElementType
}

export default function If({
  condition,
  renderItem,
  wrapper: Wrapper = Fragment,
}: Props) {
  return <Wrapper>{condition ? renderItem() : null}</Wrapper>
}
