export function permutations(sampleSpace: number, count: number = 1) {
  return factorial(sampleSpace) / factorial(sampleSpace - count)
}

export function combinations(sampleSpace: number, count: number = 1) {
  return (
    factorial(sampleSpace) / (factorial(sampleSpace - count) * factorial(count))
  )
}

export function factorial(n: number): number {
  if (n == 0) return 1
  return n * factorial(n - 1)
}

export function kCombine<T>(arr: T[], k: number): T[][] {
  if (k > arr.length || k <= 0) return []
  if (k === arr.length) return [arr.slice()]
  if (k === 1) return arr.map(x => [x])

  const result: T[][] = []
  for (let i = 0; i <= arr.length - k; i++) {
    const head = arr.slice(i, i + 1)
    const tailCombs = kCombine(arr.slice(i + 1), k - 1)
    for (const tail of tailCombs) {
      result.push(head.concat(tail))
    }
  }
  return result
}

export function permute<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr]
  const result: T[][] = []
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    const rest = arr.slice(0, i).concat(arr.slice(i + 1))
    for (const subPerm of permute(rest)) {
      result.push([current].concat(subPerm))
    }
  }
  return result
}
