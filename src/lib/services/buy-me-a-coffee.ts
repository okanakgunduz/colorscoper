type Supporter = {
  support_coffees: number
}

type SupportersResponse = {
  data: Supporter[]
  next_page_url: string | null
}

export async function getTotalCupsGifted(): Promise<number> {
  let totalCups = 0
  let nextPageUrl: string | null =
    "https://developers.buymeacoffee.com/api/v1/supporters"

  try {
    while (nextPageUrl) {
      const response = await fetch(nextPageUrl, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_BMAC_ACCESS_TOKEN}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const json = (await response.json()) as SupportersResponse

      const pageCups = json.data.reduce(
        (sum, supporter) => sum + (supporter.support_coffees || 0),
        0,
      )

      totalCups += pageCups
      nextPageUrl = json.next_page_url
    }

    return totalCups
  } catch (error) {
    console.error("Failed to fetch total cups:", error)
    return 0
  }
}
