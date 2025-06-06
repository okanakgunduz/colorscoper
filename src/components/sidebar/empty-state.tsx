import Logo from "@/assets/Logo"
import { appConfig } from "@/config"
import { Hexagon } from "@phosphor-icons/react"

export default function EmptyState() {
  return (
    <aside className="relative flex size-full flex-col items-center justify-center gap-4">
      <Hexagon size={32} weight="fill" className="text-accent" />
      <p className="text-paragraph text-muted max-w-48 text-center text-balance select-none">
        Select a base color to insert a color to the palette.
      </p>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <h1 className="text-heading-2 flex items-center gap-1">
          <Logo width={18} height={18} />
          <span>{appConfig.appName}</span>
        </h1>
      </div>
    </aside>
  )
}
