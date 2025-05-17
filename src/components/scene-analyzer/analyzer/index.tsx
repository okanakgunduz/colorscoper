import HorizontalSplitTriple from "@assets/HorizontalSplitTriple"
import T from "@assets/T"
import TReverse from "@assets/TReverse"
import VerticalSplitTriple from "@assets/VerticalSplitTriple"
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
import { getCombinationCount } from "./snapper/resolve-snapper-state"

export const BGPattern = {
  Square: "square",
  VerticalStripDouble: "vertical-strip-double",
  HorizontalStripDouble: "horizontal-strip-double",
  VerticalStripTriple: "vertical-strip-triple",
  HorizontalStripTriple: "horizontal-strip-triple",
  T: "t",
  TReverse: "t-reverse",
} as const

export type BGPattern = Enumize<typeof BGPattern>

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

  const [items, setItems] = useState<Color[]>([])

  const [disabled, setDisabled] = useState(false)

  return (
    <section className="flex h-96 w-2xl items-stretch divide-x overflow-hidden">
      <aside className="bg-muted-background grow">
        <button
          disabled={disabled}
          onClick={() => setItems((state) => [...state, foreground.at(0)])}
        >
          Add
        </button>
      </aside>
      <main
        className="dividey flex flex-col"
        style={
          {
            "--footer-height": 12,
          } as CSSProperties
        }
      >
        {/* Snapper */}

        <Snapper
          className="aspect-square h-[calc(100%_-_calc(var(--spacing)_*_var(--footer-height)))]"
          state={backgroundState}
          background={background}
          foreground={items}
          onFilled={() => setDisabled(true)}
        />

        {/* Footer */}

        <footer className="flex h-[calc(var(--spacing)_*_var(--footer-height))] items-center justify-center gap-2 px-4">
          <If
            condition={background.length >= 1}
            renderItem={() => (
              <LayoutButton
                icon={Square}
                type={BGPattern.Square}
                current={backgroundState.pattern}
                onClick={(type) => {
                  setBackgroundState({
                    pattern: type,
                    index:
                      backgroundState.index %
                      getCombinationCount(background.length, type),
                  })
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
                  type={BGPattern.VerticalStripDouble}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({
                      pattern: type,
                      index:
                        backgroundState.index %
                        getCombinationCount(background.length, type),
                    })
                  }}
                />
                <LayoutButton
                  icon={SquareSplitVertical}
                  type={BGPattern.HorizontalStripDouble}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({
                      pattern: type,
                      index:
                        backgroundState.index %
                        getCombinationCount(background.length, type),
                    })
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
                  icon={HorizontalSplitTriple as Icon}
                  type={BGPattern.HorizontalStripTriple}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({
                      pattern: type,
                      index:
                        backgroundState.index %
                        getCombinationCount(background.length, type),
                    })
                  }}
                />
                <LayoutButton
                  icon={VerticalSplitTriple as Icon}
                  type={BGPattern.VerticalStripTriple}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({
                      pattern: type,
                      index:
                        backgroundState.index %
                        getCombinationCount(background.length, type),
                    })
                  }}
                />
                <LayoutButton
                  icon={T as Icon}
                  type={BGPattern.T}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({
                      pattern: type,
                      index:
                        backgroundState.index %
                        getCombinationCount(background.length, type),
                    })
                  }}
                />
                <LayoutButton
                  icon={TReverse as Icon}
                  type={BGPattern.TReverse}
                  current={backgroundState.pattern}
                  onClick={(type) => {
                    setBackgroundState({
                      pattern: type,
                      index:
                        backgroundState.index %
                        getCombinationCount(background.length, type),
                    })
                  }}
                />
              </>
            )}
          />

          <button
            className="ml-auto"
            onClick={() =>
              setBackgroundState({
                ...backgroundState,
                index:
                  (backgroundState.index + 1) %
                  getCombinationCount(
                    background.length,
                    backgroundState.pattern,
                  ),
              })
            }
          >
            +
          </button>
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
      className="bg-muted-background text-accent data-[active]:border-accent data-[active]:bg-accent cursor-pointer rounded border p-1 transition-colors data-[active]:text-white"
      onClick={() => onClick?.(type)}
    >
      <Icon size={16} />
    </button>
  )
}
