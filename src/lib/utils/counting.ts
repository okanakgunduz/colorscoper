export function permutation(sampleSpace: number, count: number = 1) {
  return factorial(sampleSpace) / factorial(sampleSpace - count)
}

export function combination(sampleSpace: number, count: number = 1) {
  return (
    factorial(sampleSpace) / (factorial(sampleSpace - count) * factorial(count))
  )
}

export function factorial(n: number): number {
  if (n == 0) return 1
  return n * factorial(n - 1)
}
