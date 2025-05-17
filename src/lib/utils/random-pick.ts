export default function randomPick<T>(array: T[]): T | null {
  const len = array.length

  if (len === 0) return null

  return array.at(Math.floor(Math.random() * len)) ?? null
}
