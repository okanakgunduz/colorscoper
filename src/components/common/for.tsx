import { ReactNode } from "react"

interface TimesProps {
  children: (index: number, till: number) => ReactNode
  times: number
}

interface EachProps<T> {
  children: (item: T, index: number, array: Array<T>) => ReactNode
  each: Array<T>
}

function For(props: TimesProps): Array<ReactNode>
function For<T>(props: EachProps<T>): Array<ReactNode>

function For<T>(props: TimesProps | EachProps<T>) {
  if ("times" in props)
    return Array.from({ length: props.times }).map((_, index) =>
      props.children(index, props.times),
    )

  return props.each.map((item, index) =>
    props.children(item, index, props.each),
  )
}

export default For
