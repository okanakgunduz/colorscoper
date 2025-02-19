export function immutate<T>(
  array: Array<T>,
  updateIndex: number,
  value: T,
): Array<T> {
  const updated = [...array]

  if (updateIndex === -1) updateIndex += updated.length // Last Element

  updated[updateIndex] = value
  return updated
}

export function impush<T>(array: Array<T>, value: T): Array<T> {
  return [...array, value] satisfies Array<T>
}
