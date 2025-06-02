import { useEffect, useState } from "react"

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const listener = ({ matches }: MediaQueryListEvent) => setMatches(matches)
    mediaQueryList.addEventListener("change", listener)
    setMatches(mediaQueryList.matches)

    return () => mediaQueryList.removeEventListener("change", listener)
  }, [query])

  return matches
}

export default useMediaQuery
