import T from "@assets/T"
import TReverse from "@assets/TReverse"
import { Icon, Square } from "@phosphor-icons/react"
import {
  SquareSplitHorizontal,
  SquareSplitVertical,
} from "@phosphor-icons/react/dist/ssr"
import { Color } from "chroma-js"
import { CSSProperties, useState } from "react"
import If from "@components/common/if"
import { passIf } from "@components/common/pass-if"
import Snapper from "./snapper"

enum BGPattern {
  Square,
  VerticalStrip,
  HorizontalStrip,
  T,
  TReverse,
}

export type BGState = { index: number; pattern: BGPattern }

interface Props {
  foreground: Color[]
  background: Color[]
}

export default function Analyzer({ foreground, background }: Props) {
  const [backgroundState, setBackgroundState] = useState<BGState>({
    pattern: BGPattern.Square,
    index: 0,
  })

  return (
    <section className="flex h-96 w-2xl items-stretch divide-x">
      <aside className="grow"></aside>
      <main
        className="flex flex-col divide-y"
        style={
          {
            "--footer-height": 12,
          } as CSSProperties
        }
      >
        <Snapper
          className="aspect-square h-[calc(100%_-_calc(var(--spacing)_*_var(--footer-height)))]"
          state={backgroundState}
        />
        <footer className="flex h-[calc(var(--spacing)_*_var(--footer-height))] items-center gap-2 px-4">
          <If
            condition={background.length >= 1}
            renderItem={() => (
              <LayoutButton
                icon={Square}
                type={BGPattern.Square}
                current={backgroundState.pattern}
                onClick={(type) => {
                  setBackgroundState({ ...backgroundState, pattern: type })
                }}
              />
            )}
          />

          <If
            condition={background.length >= 2}
            renderItem={() => (
              <>
                <LayoutButton
                  icon={SquareSplitHorizontal}
                  type={BGPattern.VerticalStrip}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({ ...backgroundState, pattern: type })
                  }}
                />
                <LayoutButton
                  icon={SquareSplitVertical}
                  type={BGPattern.HorizontalStrip}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({ ...backgroundState, pattern: type })
                  }}
                />
              </>
            )}
          />

          <If
            condition={background.length >= 3}
            renderItem={() => (
              <>
                <LayoutButton
                  icon={T as Icon}
                  type={BGPattern.T}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({ ...backgroundState, pattern: type })
                  }}
                />
                <LayoutButton
                  icon={TReverse as Icon}
                  type={BGPattern.TReverse}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({ ...backgroundState, pattern: type })
                  }}
                />
              </>
            )}
          />
        </footer>
      </main>
    </section>
  )
}

interface LayoutButtonProps {
  icon: Icon
  type: BGPattern
  current: BGPattern
  onClick?: (type: BGPattern) => void
}

function LayoutButton({
  icon: Icon,
  type,
  current,
  onClick,
}: LayoutButtonProps) {
  return (
    <button
      {...passIf(type === current, { "data-active": true })}
      className="bg-muted-background data-[active]:border-accent data-[active]:bg-accent rounded border p-1 transition-colors data-[active]:text-white"
      onClick={() => onClick?.(type)}
    >
      <Icon size={16} />
    </button>
  )
}
