export function pickRandom<T>(array: Array<T>): T {
  return array[Math.round(Math.random() * (array.length - 1))]
}
