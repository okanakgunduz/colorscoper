import { Icon, Info, X } from "@phosphor-icons/react"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { Color } from "chroma-js"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import Copy from "@components/common/copy"
import If from "@components/common/if"
import { passIf } from "@components/common/pass-if"
import cx from "@utils/cx"
import nameColor from "@utils/name-color"
import { useColorModeStore } from "@stores/color-mode.store"
import { usePaletteStore } from "@stores/palette.store"

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
      <main className="flex grow items-stretch justify-between divide-x overflow-hidden *:px-4 *:pb-4">
        <div className="h-full w-1/2 overflow-auto">
          <h2 className="text-heading-3 sticky top-0 z-10 bg-gradient-to-b from-white from-50% to-transparent pt-3 pb-5 select-none">
            Foreground
          </h2>
          <div className="space-y-3">
            <AnimatePresence initial={false} mode="popLayout">
              {state.foreground.map((color) => (
                <AssignerLine
                  key={`assigner-foreground-${color.hex()}`}
                  color={color}
                  icon={ArrowRight}
                  animateLeft={false}
                  onAction={(color) =>
                    setState((state) => ({
                      foreground: state.foreground.filter((c) => c !== color),
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
        </div>
        <div className="h-full w-1/2 overflow-auto">
          <h2 className="text-heading-3 sticky top-0 z-10 bg-gradient-to-b from-white from-60% to-transparent py-4 select-none">
            Background
          </h2>
          <div className="space-y-3">
            <AnimatePresence initial={false} mode="popLayout">
              {state.background.map((color) => (
                <AssignerLine
                  key={`assigner-background-${color.hex()}`}
                  color={color}
                  icon={X}
                  animateLeft
                  onAction={(color) =>
                    setState((state) => ({
                      foreground: [...state.foreground, color],
                      background: state.background.filter((c) => c !== color),
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
        </div>
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

interface AssignerLineProps {
  color: Color
  icon: Icon
  onAction?: (color: Color) => void
  animateLeft?: boolean
}

function AssignerLine({
  color,
  onAction,
  animateLeft = false,
  icon: Icon,
}: AssignerLineProps) {
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()
  const getColorString = useColorModeStore.use.getColorString()

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className={cx("flex h-12 w-full items-center gap-2", {
        "origin-top-left": animateLeft,
        "origin-top-right": !animateLeft,
      })}
    >
      <div
        className="aspect-square h-full rounded border border-black/10"
        style={{
          background: color.css(),
        }}
      ></div>
      <header className="flex flex-col justify-center">
        <h2 className="text-caption-bold">{nameColor(color)}</h2>
        <Copy data={getColorString(color)} className="opacity-75">
          {getRoundedColorString(color)}
        </Copy>
      </header>
      <button
        className="ml-auto cursor-pointer rounded border p-2"
        onClick={() => onAction?.(color)}
      >
        <Icon size={14} />
      </button>
    </motion.div>
  )
}
