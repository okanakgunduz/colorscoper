import { Color } from "chroma-js"
import { BGPattern, BGState } from "@components/scene-analyzer/analyzer"
import { kCombine, permutations, permute } from "@utils/counting"

export function resolveSceneState(
  { pattern, index }: BGState,
  colors: Color[],
): Color[] {
  let count = 1

  switch (pattern) {
    case "square":
      count = 1
      break
    case "horizontal-strip-double":
    case "vertical-strip-double":
      count = 2
      break

    case "t":
    case "t-reverse":
    case "horizontal-strip-triple":
    case "vertical-strip-triple":
      count = 3
      break
  }

  const comb: Color[][] = []
  kCombine(colors, count).forEach((combination) =>
    comb.push(...permute(combination)),
  )
  return comb[index]
}

export function getCombinationCount(
  colorLength: number,
  pattern: BGPattern,
): number {
  switch (pattern) {
    case "square":
      return permutations(colorLength, 1)
    case "horizontal-strip-double":
    case "vertical-strip-double":
      return permutations(colorLength, 2)
    default:
      return permutations(colorLength, 3)
  }
}
