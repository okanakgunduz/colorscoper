import { getGithubStars } from "@/lib/services/github"
import { useEffect, useState } from "react"

export function useGithubStars(repoUrl: string) {
  const [stars, setStars] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!repoUrl) return

    let isMounted = true

    async function fetchStars() {
      try {
        const starCount = await getGithubStars(repoUrl)
        if (isMounted) setStars(starCount)
      } catch (err) {
        if (isMounted) setError(err as Error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchStars()
    return () => {
      isMounted = false
    }
  }, [repoUrl])

  return { stars, loading, error }
}
