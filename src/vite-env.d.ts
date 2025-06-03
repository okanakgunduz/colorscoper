declare module "*.svg" {
  import * as React from "react"
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >
  const src: string
  export default src
}

/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

type Enumize<T> = T[keyof T]

type MergeTypes<TypesArray extends any[], Res = {}> = TypesArray extends [
  infer Head,
  ...infer Rem,
]
  ? MergeTypes<Rem, Res & Head>
  : Res

type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: never }

type OneOf<
  TypesArray extends any[],
  Res = never,
  AllProperties = MergeTypes<TypesArray>,
> = TypesArray extends [infer Head, ...infer Rem]
  ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
  : Res

type ArrayLengthMutationKeys = "splice" | "push" | "pop" | "shift" | "unshift"
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L
  [I: number]: T
  [Symbol.iterator]: () => IterableIterator<T>
}
