export default function map(
  value: number,
  min: number,
  max: number,
  rangeMin: number,
  rangeMax: number,
) {
  return ((value - min) * (rangeMax - rangeMin)) / (max - min) + rangeMin
}
