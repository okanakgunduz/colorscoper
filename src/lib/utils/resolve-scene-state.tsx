import { Color } from "chroma-js"
import { BGPattern, BGState } from "@components/scene-analyzer/analyzer"
import { permutation } from "./counting"

export function resolveSceneState(
  { pattern, index }: BGState,
  colors: Color[],
): Color[] {
  const { length } = colors

  switch (pattern) {
    case "square":
      return [colors.at(index % length)!]
    case "horizontal-strip":
    case "vertical-strip":
      if (length === 2)
        return index % 2 ? colors.slice() : colors.slice().reverse()
      break
  }
}

export function getCombinationCount(
  colorLength: number,
  pattern: BGPattern,
): number {
  switch (pattern) {
    case "square":
      return permutation(colorLength, 1)
    case "horizontal-strip":
    case "vertical-strip":
      return permutation(colorLength, 2)
    default:
      return permutation(colorLength, 3)
  }
}
