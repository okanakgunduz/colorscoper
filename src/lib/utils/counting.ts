export function permute<T>(permutation: T[]) {
  const length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0)
  let i = 1,
    k,
    p

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i]
      p = permutation[i]
      permutation[i] = permutation[k]
      permutation[k] = p
      ++c[i]
      i = 1
      result.push(permutation.slice())
    } else {
      c[i] = 0
      ++i
    }
  }
  return result
}

export function kCombine<T>(set: T[], k: number): T[][] {
  let i, j, combs, head, tailcombs

  if (k > set.length || k <= 0) {
    return []
  }

  if (k == set.length) {
    return [set]
  }

  if (k == 1) {
    combs = []
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]])
    }
    return combs
  }

  combs = []
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i + 1)
    tailcombs = kCombine(set.slice(i + 1), k - 1)
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]))
    }
  }
  return combs
}

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
