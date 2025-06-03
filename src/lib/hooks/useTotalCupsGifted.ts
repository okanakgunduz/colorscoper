import { getTotalCupsGifted } from "@/lib/services/buy-me-a-coffee"
import { useEffect, useState } from "react"

export function useTotalCupsGifted() {
  const [totalCups, setTotalCups] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchCups() {
      try {
        const cups = await getTotalCupsGifted()
        if (isMounted) setTotalCups(cups)
      } catch (err) {
        if (isMounted) setError(err as Error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCups()
    return () => {
      isMounted = false
    }
  }, [])

  return { totalCups, loading, error }
}
