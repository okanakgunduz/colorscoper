function createEnum<T extends Record<string, string | number | boolean>>(
  obj: T,
): Readonly<T> {
  return Object.freeze(obj)
}

export default createEnum
