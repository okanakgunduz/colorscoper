export async function getGithubStars(repoUrl: string): Promise<number> {
  try {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      throw new Error("Invalid GitHub repository URL.")
    }

    const [, owner, repo] = match
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`)

    const json = await response.json()
    return json.stargazers_count ?? 0
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error)
    return 0
  }
}
