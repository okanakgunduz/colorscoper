export function pascalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/(?:^|\s|-|_)(\w)/g, (_, char) => char.toUpperCase())
}

export function capitalize(text: string): string {
  if (!text) return ""

  const words = text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim()
    .split(" ")

  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function kebabize(str: string) {
  return str.toLowerCase().replace(" ", "-")
}
