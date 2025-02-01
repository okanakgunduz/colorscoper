import { ElementType, Fragment, ReactNode } from "react"

interface BaseProps {
  element?: ElementType
}

interface TimesProps extends BaseProps {
  children: (index: number, till: number) => ReactNode
  times: number
}

interface EachProps<T> extends BaseProps {
  children: (item: T, index: number, array: Array<T>) => ReactNode
  each: Array<T>
}

function For(props: TimesProps): Array<ReactNode> | ReactNode
function For<T>(props: EachProps<T>): Array<ReactNode> | ReactNode

function For<T>({
  element: Element = Fragment,
  ...props
}: TimesProps | EachProps<T>) {
  if ("times" in props)
    return (
      <Element>
        {Array.from({ length: props.times }).map((_, index) =>
          props.children(index, props.times),
        )}
      </Element>
    )

  return (
    <Element>
      {props.each.map((item, index) => props.children(item, index, props.each))}
    </Element>
  )
}

export default For
