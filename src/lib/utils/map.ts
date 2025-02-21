import { Easing, linear } from "./easing"

export default function map(
  value: number,
  min: number,
  max: number,
  rangeMin: number,
  rangeMax: number,
  ease: Easing = linear,
) {
  const normalized = ease((value - min) / (max - min))
  return normalized * (rangeMax - rangeMin) + rangeMin
}
