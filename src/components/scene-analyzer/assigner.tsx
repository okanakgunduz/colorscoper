import { Info } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import { passIf } from "@components/common/pass-if"

type AssignerState = {
  foreground: Array<Color>
  background: Array<Color>
}

interface Props {
  onConfirmed?: (state: AssignerState) => void
}

export default function Assigner({ onConfirmed }: Props) {
  return (
    <section className="flex h-96 w-3xl flex-col divide-y">
      <main className="grow"></main>
      <footer className="bg-muted-background px-sidebar flex h-14 items-center justify-between">
        <p className="text-caption text-muted flex items-center gap-2">
          <Info className="text-accent" size={14} />
          <span>Arrange the colors based on your use case.</span>
        </p>
        <button
          {...passIf(!!onConfirmed, {
            onClick: onConfirmed,
          })}
          className="cursor-pointer"
        >
          Analyze
        </button>
      </footer>
    </section>
  )
}
