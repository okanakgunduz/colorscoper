export default function getWcagContrastRating(
  contrast: number,
): "AAA" | "AA" | "A" {
  if (contrast >= 7) return "AAA"
  else if (contrast >= 4.5) return "AA"
  else return "A"
}
