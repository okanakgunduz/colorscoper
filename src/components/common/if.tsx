import {
  ElementType,
  ForwardedRef,
  Fragment,
  ReactNode,
  createElement,
  forwardRef,
} from "react"

interface Props {
  condition: boolean
  renderItem: () => ReactNode
  renderElse?: () => ReactNode
  wrapper?: ElementType
}

const If = forwardRef(function (
  {
    condition,
    renderItem,
    renderElse = () => null,
    wrapper: Wrapper = Fragment,
  }: Props,
  ref: ForwardedRef<unknown>,
) {
  const children = condition ? renderItem() : renderElse()

  if (Wrapper === Fragment) {
    return <>{children}</>
  }

  return createElement(Wrapper, { ref }, children)
})

export default If
