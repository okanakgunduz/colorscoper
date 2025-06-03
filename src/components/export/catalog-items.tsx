import For from "@/components/common/for"
import If from "@/components/common/if"
import useCopyToClipboard from "@/lib/hooks/useCopyToClipboard"
import { ColorMode } from "@/lib/utils/color"
import getOptimizedTextColor from "@/lib/utils/get-optimized-text-color"
import nameColor from "@/lib/utils/name-color"
import { useColorModeStore } from "@/stores/color-mode.store"
import { CheckSquare } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import { AnimatePresence, motion } from "motion/react"

interface ColumnProps {
  color: Color
  index: number
  hovered: number | null
  setHovered?: (i: number | null) => void
}

export function CatalogColumn({
  color,
  index,
  hovered,
  setHovered,
}: ColumnProps) {
  const isHovered = hovered === index

  const optimizedTextColor = getOptimizedTextColor(color)
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()
  const getColorString = useColorModeStore.use.getColorString()

  const colorMode: ColorMode = useColorModeStore.use.mode()

  const { copy, copied } = useCopyToClipboard({
    data: getColorString(color),
    timeout: 2000,
  })

  return (
    <motion.div
      onMouseEnter={() => setHovered?.(index)}
      // onMouseLeave={() => setHovered?.(0)}
      className="relative flex grow cursor-pointer items-center justify-center overflow-hidden"
      style={{
        backgroundColor: color.hex(),
      }}
      animate={{
        flexGrow: hovered === null ? 1 : isHovered ? 2 : 0.75,
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={`full-${color.hex()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={copy}
            className="absolute inset-0 flex flex-col overflow-hidden p-6 md:pb-10"
            style={{ color: optimizedTextColor.css() }}
          >
            <p className="text-2xl font-bold">0{index + 1}</p>
            <h2 className="text-heading-2 whitespace-nowrap">
              {nameColor(color)}
            </h2>
            <hr
              className="mt-2 opacity-50"
              style={{
                borderColor: optimizedTextColor.css(),
              }}
            />
            <div className="mt-auto text-2xl font-semibold **:whitespace-nowrap">
              <If
                condition={copied}
                renderItem={() => (
                  <p className="flex items-center gap-1">
                    Copied <CheckSquare weight="fill" />
                  </p>
                )}
                renderElse={() => (
                  <>
                    <If
                      condition={colorMode === ColorMode.HEX}
                      renderItem={() => <p>{color.hex()}</p>}
                    />

                    <If
                      condition={colorMode === ColorMode.RGB}
                      renderItem={() => {
                        const [r, g, b] = color.rgb()
                        return (
                          <ThreeChannel
                            {...{ optimizedTextColor, color }}
                            labels={["R", "G", "B"]}
                            values={[
                              Math.round(r),
                              Math.round(g),
                              Math.round(b),
                            ]}
                          />
                        )
                      }}
                    />

                    <If
                      condition={colorMode === ColorMode.HSL}
                      renderItem={() => {
                        const [h, s, l] = color.hsl()
                        return (
                          <ThreeChannel
                            {...{ optimizedTextColor, color }}
                            labels={["H", "S", "L"]}
                            values={[
                              `${Math.round(h)}°`,
                              `${Math.round(s * 100)}%`,
                              `${Math.round(l * 100)}%`,
                            ]}
                          />
                        )
                      }}
                    />

                    <If
                      condition={colorMode === ColorMode.LAB}
                      renderItem={() => {
                        const [l, a, b] = color.lab()
                        return (
                          <ThreeChannel
                            {...{ optimizedTextColor, color }}
                            labels={["L", "a", "b"]}
                            values={[
                              `${l.toFixed(1)}%`,
                              a.toFixed(1),
                              b.toFixed(1),
                            ]}
                          />
                        )
                      }}
                    />

                    <If
                      condition={colorMode === ColorMode.LCH}
                      renderItem={() => {
                        const [l, c, h] = color.lch()
                        return (
                          <ThreeChannel
                            {...{ optimizedTextColor, color }}
                            labels={["L", "C", "H"]}
                            values={[
                              `${l.toFixed(1)}%`,
                              c.toFixed(1),
                              `${Math.round(h)}°`,
                            ]}
                          />
                        )
                      }}
                    />

                    <If
                      condition={colorMode === ColorMode.OKLCH}
                      renderItem={() => {
                        const [l, c, h] = color.oklch()
                        return (
                          <ThreeChannel
                            {...{ optimizedTextColor, color }}
                            labels={["L", "C", "H"]}
                            values={[
                              l.toFixed(3),
                              c.toFixed(3),
                              `${Math.round(h)}°`,
                            ]}
                          />
                        )
                      }}
                    />

                    <If
                      condition={colorMode === ColorMode.OKLAB}
                      renderItem={() => {
                        const [l, a, b] = color.oklab()
                        return (
                          <ThreeChannel
                            {...{ optimizedTextColor, color }}
                            labels={["L", "a", "b"]}
                            values={[l.toFixed(3), a.toFixed(3), b.toFixed(3)]}
                          />
                        )
                      }}
                    />
                  </>
                )}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={`preview-${color.hex()}`}
        animate={{ opacity: isHovered ? 0 : 1 }}
        className="text-caption-bold absolute right-0 bottom-0 left-0 overflow-hidden px-3 py-2 text-ellipsis whitespace-nowrap"
        style={{ color: optimizedTextColor.css() }}
      >
        {getRoundedColorString(color)}
      </motion.div>
    </motion.div>
  )
}

interface ThreeChannelProps {
  optimizedTextColor: Color
  color: Color
  labels: [string, string, string]
  values: [number | string, number | string, number | string]
}

function ThreeChannel({
  optimizedTextColor,
  color,
  labels,
  values,
}: ThreeChannelProps) {
  return (
    <div>
      <For
        each={labels}
        renderItem={(label, i) => (
          <p className="flex items-center gap-2">
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded text-xs opacity-90"
              style={{
                background: optimizedTextColor.css(),
                color: color.css(),
              }}
            >
              {label}
            </span>{" "}
            {values[i]}
          </p>
        )}
      />
    </div>
  )
}

interface RowProps {
  color: Color
}

export function CatalogRow({ color }: RowProps) {
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()
  const getColorString = useColorModeStore.use.getColorString()

  const { copy, copied } = useCopyToClipboard({
    data: getColorString(color),
    timeout: 1500,
  })

  return (
    <div className="odd:bg-muted-background flex h-16 items-center gap-4 rounded-lg p-2">
      <div
        className="aspect-square h-full rounded-md border border-black/10"
        style={{ backgroundColor: color.hex() }}
      />
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-medium">{nameColor(color)}</h2>
        <p onClick={copy} className="text-caption-bold cursor-pointer">
          {copied ? "Copied!" : getRoundedColorString(color).toUpperCase()}
        </p>
      </div>
    </div>
  )
}
