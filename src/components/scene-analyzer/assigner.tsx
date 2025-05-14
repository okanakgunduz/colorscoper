import { Info } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import { useState } from "react"
import For from "@components/common/for"
import { useColorModeStore } from "@stores/color-mode.store"
import { usePaletteStore } from "@stores/palette.store"

type AssignerState = {
  foreground: Array<Color>
  background: Array<Color>
}

interface Props {
  onConfirmed?: (state: AssignerState) => void
}

export default function Assigner({ onConfirmed }: Props) {
  const colors = usePaletteStore.use.colors()

  const [state, setState] = useState<AssignerState>({
    foreground: colors,
    background: colors,
  })

  return (
    <section className="flex h-80 w-xl flex-col divide-y">
      <main className="flex grow items-stretch justify-between overflow-hidden border border-green-400 *:px-4 *:py-4">
        <div className="h-full grow overflow-auto border border-red-400">
          <h1 className="text-center">Foreground</h1>
          <div className="space-y-2">
            <For
              each={state.foreground}
              renderItem={(color) => <AssignerLine {...{ color }} />}
            />
            <For
              each={state.foreground}
              renderItem={(color) => <AssignerLine {...{ color }} />}
            />
            <For
              each={state.foreground}
              renderItem={(color) => <AssignerLine {...{ color }} />}
            />
          </div>
        </div>
        <div className="grow">
          <h1 className="text-center">Background</h1>
          <div className="space-y-2">
            <For
              each={state.background}
              renderItem={(color) => <AssignerLine {...{ color }} />}
            />
          </div>
        </div>
      </main>
      <footer className="bg-muted-background flex h-12 items-center justify-between p-5">
        <p className="text-caption text-muted flex items-center gap-2">
          <Info className="text-accent" size={14} />
          <span>Arrange the colors based on your use case.</span>
        </p>
        <button
          onClick={() => onConfirmed?.(state)}
          className="text-caption-bold bg-accent cursor-pointer rounded px-4 py-1.5 text-white select-none hover:brightness-95"
        >
          Analyze
        </button>
      </footer>
    </section>
  )
}

interface AssignerLineProps {
  color: Color
}

function AssignerLine({ color }: AssignerLineProps) {
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()
  return <div className="h-8 w-full border">{getRoundedColorString(color)}</div>
}
