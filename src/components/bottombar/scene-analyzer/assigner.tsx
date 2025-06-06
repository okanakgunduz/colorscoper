import ScrollArea from "@/components/common/scroll-area"
import { Info, X } from "@phosphor-icons/react"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { Color } from "chroma-js"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { usePaletteStore } from "@stores/palette.store"
import If from "@components/common/if"
import { passIf } from "@components/common/pass-if"
import ColorLine from "./components/color-line"

type AssignerState = {
  foreground: Color[]
  background: Color[]
}

interface Props {
  onConfirmed?: (state: AssignerState) => void
}

export default function Assigner({ onConfirmed }: Props) {
  const colors = usePaletteStore.use.colors()

  const [state, setState] = useState<AssignerState>({
    foreground: colors,
    background: [],
  })

  const disabled =
    state.foreground.length === 0 || state.background.length === 0

  return (
    <section className="flex h-80 w-xl flex-col divide-y">
      <main className="flex grow items-stretch justify-between divide-x overflow-hidden *:px-4">
        <ScrollArea className="h-full w-1/2 overflow-auto">
          <h2 className="text-heading-3 sticky top-0 z-10 bg-gradient-to-b from-white from-50% to-transparent pt-3 pb-5 select-none">
            Foreground
          </h2>
          <div className="space-y-3 pb-4">
            <AnimatePresence initial={false} mode="sync">
              {state.foreground.map(color => (
                <ColorLine
                  key={`assigner-foreground-${color.hex()}`}
                  className="origin-top-right"
                  color={color}
                  id={color.hex()}
                  icon={ArrowRight}
                  disabled={state.background.length === 3}
                  onAction={color =>
                    setState(state => ({
                      foreground: state.foreground.filter(c => c !== color),
                      background: [...state.background, color],
                    }))
                  }
                />
              ))}

              <If
                condition={state.foreground.length === 0}
                renderItem={() => (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-caption text-muted"
                  >
                    Pick foregound colors to analyze.
                  </motion.p>
                )}
              />
            </AnimatePresence>
          </div>
        </ScrollArea>
        <ScrollArea className="h-full w-1/2 overflow-auto">
          <h2 className="text-heading-3 sticky top-0 z-10 bg-gradient-to-b from-white from-60% to-transparent py-4 select-none">
            Background
          </h2>
          <div className="space-y-3 pb-4">
            <AnimatePresence initial={false} mode="popLayout">
              {state.background.map(color => (
                <ColorLine
                  key={`assigner-background-${color.hex()}`}
                  className="origin-top-left"
                  color={color}
                  icon={X}
                  onAction={color =>
                    setState(state => ({
                      foreground: [...state.foreground, color],
                      background: state.background.filter(c => c !== color),
                    }))
                  }
                />
              ))}

              <If
                condition={state.background.length === 0}
                renderItem={() => (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-caption text-muted"
                  >
                    Pick a background color to analyze.
                  </motion.p>
                )}
              />
            </AnimatePresence>
          </div>
        </ScrollArea>
      </main>
      <footer className="bg-muted-background flex h-12 items-center justify-between p-5">
        <p className="text-caption text-muted flex items-center gap-2">
          <Info className="text-accent" size={14} />
          <span>Arrange the colors based on your use case.</span>
        </p>
        <button
          disabled={disabled}
          {...passIf(disabled, { "data-disabled": true })}
          onClick={() => onConfirmed?.(state)}
          className="text-caption-bold disabled:bg-muted bg-accent cursor-pointer rounded px-4 py-1.5 text-white transition select-none hover:brightness-95 disabled:opacity-75"
        >
          Analyze
        </button>
      </footer>
    </section>
  )
}
