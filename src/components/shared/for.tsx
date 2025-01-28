import { ReactNode } from "react"

interface Props<T> {
  each: Array<T>
  children: (item: T, index: number, array: Array<T>) => ReactNode
}

export default function For<T>({ each, children }: Props<T>) {
  return each.map((item, index) => children(item, index, each))
}
