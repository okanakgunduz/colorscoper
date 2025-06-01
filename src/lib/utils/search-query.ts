import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string"

type Primitive =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | Array<Primitive>

export function buildQuery(records: Record<string, Primitive>) {
  const params = new URLSearchParams()

  for (const key in records) {
    const json = JSON.stringify(records[key])
    const encoded = compressToEncodedURIComponent(json)
    params.append(key, encoded)
  }

  return params.toString()
}

export function parseQuery(queryString: string): Record<string, Primitive> {
  const params = new URLSearchParams(queryString)
  const result: Record<string, Primitive> = {}

  for (const [key, value] of params.entries())
    try {
      const decoded = decompressFromEncodedURIComponent(value)
      result[key] = decoded ? JSON.parse(decoded) : value
    } catch {
      result[key] = value
    }

  return result
}
