import { parseQuery } from "@/lib/utils/search-query"
import { useLocation } from "react-router"

export default function Export() {
  const { search } = useLocation()

  return (
    <div className="p-4">
      <h1 className="text-caption-bold">Extracted</h1>
      <pre className="mb-2">{search}</pre>
      <h1 className="text-caption-bold">Decoded</h1>
      <pre className="mb-2">{JSON.stringify(parseQuery(search), null, 4)}</pre>
    </div>
  )
}
