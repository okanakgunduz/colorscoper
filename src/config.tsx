import { ArrowRight } from "@phosphor-icons/react"
import { ReactNode } from "react"

interface Config {
  appName: string
  maxPaletteLimit: number
  maxBackgroundLimit: number
  contrastPlaygroundType: "triangle" | "donut" | "square" | "square-donut"

  announcement: ReactNode | string | null
}

export const appConfig: Config = {
  appName: "ColorScope", // You can change the <title /> tag in the index.html, as well.
  maxPaletteLimit: 8, // Max color count in the palette.
  maxBackgroundLimit: 3, // Maximum exportable background colors.
  contrastPlaygroundType: "triangle",

  announcement: (
    <div className="bg-accent text-caption-bold flex size-full items-center justify-center gap-2 text-white">
      <a
        href="https://www.youtube.com/watch?v=d3mhZbBOxbE"
        target="_blank"
        className="hover:underline"
      >
        Watch our tutorial on YouTube.
      </a>
      <ArrowRight weight="bold" />
    </div>
  ),
}
