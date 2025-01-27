import { Hexagon } from "@phosphor-icons/react"

export default function EmptyState() {
  return (
    <aside className="flex size-full flex-col items-center justify-center gap-4">
      <Hexagon size={32} weight="fill" className="text-accent" />
      <p className="text-paragraph text-muted text-center text-balance">
        Select a base color to insert a color to the palette.
      </p>
    </aside>
  )
}
