import { Color } from "chroma-js"
import {
  BGPattern,
  BGState,
} from "@components/bottombar/scene-analyzer/analyzer"
import { kCombine, permutations, permute } from "@utils/counting"

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

export function resolveSceneState(
  { pattern, index }: BGState,
  colors: Color[],
): Color[] {
  const countMap: Record<BGState["pattern"], number> = {
    square: 1,
    "horizontal-strip-double": 2,
    "vertical-strip-double": 2,
    t: 3,
    "t-reverse": 3,
    "horizontal-strip-triple": 3,
    "vertical-strip-triple": 3,
  }

  const k = countMap[pattern]

  if (colors.length < k) {
    return Array.from({ length: k }, (_, i) => colors[i % colors.length])
  }

  const combs = kCombine(colors, k)
  if (combs.length === 0) {
    return Array.from({ length: k }, (_, i) => colors[i % colors.length])
  }

  const selectedComb = combs[index % combs.length]
  const perms = permute(selectedComb)

  return perms[index % perms.length]
}
