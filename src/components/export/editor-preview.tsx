import For from "@/components/common/for"
import Select from "@/components/common/select"
import { kebabize, pascalize } from "@/lib/utils/casing"
import { toString } from "@/lib/utils/color"
import cx, { Class } from "@/lib/utils/cx"
import nameColor from "@/lib/utils/name-color"
import { useColorModeStore } from "@/stores/color-mode.store"
import { Terminal } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import { useState } from "react"
import If from "../common/if"

interface Props {
  className?: Class
  colors: {
    foreground: Color[]
    background: Color[]
  }
}

type Format = "css" | "sass" | "xml" | "swift"

export default function EditorPreview({ className, colors }: Props) {
  const colorMode = useColorModeStore.use.mode()

  const [format, setFormat] = useState<Format>("css")

  return (
    <div className={cx("space-y-4", className)}>
      {/* Header */}
      <header className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-heading flex items-center gap-1">
            <Terminal weight="bold" />
            Developer
          </h2>
          <p>Export your palette to your editor, with a single click.</p>
        </div>

        <Select<Format> value={format} onValueChange={setFormat}>
          <Select.Option value="css">CSS</Select.Option>
          <Select.Option value="sass">SCSS</Select.Option>
          <Select.Option value="xml">XML</Select.Option>
          <Select.Option value="swift">Swift</Select.Option>
        </Select>
      </header>

      {/* Editor */}

      <div>
        <div className="rounded-xl bg-gray-950">
          <div className="rounded-xl p-1 text-sm scheme-dark dark:inset-ring dark:inset-ring-white/10">
            <div className="flex gap-2 p-2">
              <span className="size-3 rounded-full bg-white/20"></span>
              <span className="size-3 rounded-full bg-white/20"></span>
              <span className="size-3 rounded-full bg-white/20"></span>
            </div>
            <div className="with-line-numbers text-[13px]/6 *:*:p-3!">
              <div className="*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:rounded-lg *:bg-white/10! *:p-5 *:inset-ring *:inset-ring-white/10 dark:*:bg-white/5! dark:*:inset-ring-white/5 **:[.line]:isolate **:[.line]:block **:[.line]:not-last:min-h-[1lh]">
                <pre tabIndex={0}>
                  <code>
                    <If
                      condition={format === "css" || format === "sass"}
                      renderItem={() => (
                        <>
                          <span className="line">
                            <span className="text-slate-400">
                              /* Foreground Colors */
                            </span>
                          </span>

                          <For
                            each={colors.foreground}
                            renderItem={color => (
                              <span
                                key={`${format}-${color.hex()}`}
                                className="line"
                              >
                                <span className="text-pink-400">
                                  {format === "css" ? "--color-" : "$color-"}
                                  {kebabize(nameColor(color))}:
                                </span>{" "}
                                <span className="text-orange-300">
                                  {toString(color, colorMode)}
                                </span>
                                <span className="text-slate-50">;</span>
                              </span>
                            )}
                          />

                          <span className="line" />
                          <span className="line">
                            <span className="text-slate-400">
                              /* Background Colors */
                            </span>
                          </span>

                          <For
                            each={colors.background}
                            renderItem={color => (
                              <span
                                key={`${format}-${color.hex()}`}
                                className="line"
                              >
                                <span className="text-pink-400">
                                  {format === "css" ? "--color-" : "$color-"}
                                  {kebabize(nameColor(color))}:
                                </span>{" "}
                                <span className="text-orange-300">
                                  {toString(color, colorMode)}
                                </span>
                                <span className="text-slate-50">;</span>
                              </span>
                            )}
                          />
                        </>
                      )}
                    />

                    <If
                      condition={format === "xml"}
                      renderItem={() => (
                        <>
                          <span className="line">
                            <span className="text-cyan-400">&lt;</span>
                            <span className="text-cyan-400">resources</span>
                            <span className="text-cyan-400">&gt;</span>
                          </span>

                          <span className="line">
                            <span className="text-slate-400">
                              {"  <!-- Foreground Colors -->"}
                            </span>
                          </span>
                          <For
                            each={colors.foreground}
                            renderItem={color => (
                              <span
                                key={`${format}-${color.hex()}`}
                                className="line"
                              >
                                <span className="text-cyan-400">
                                  {" "}
                                  &lt;color
                                </span>
                                <span> </span>
                                <span className="text-pink-400">name</span>
                                <span className="text-slate-50">=</span>
                                <span className="text-orange-300">
                                  &quot;color-{kebabize(nameColor(color))}&quot;
                                </span>
                                <span className="text-cyan-400">&gt;</span>
                                <span className="text-orange-300">
                                  {toString(color, colorMode)}
                                </span>
                                <span className="text-cyan-400">
                                  &lt;/color&gt;
                                </span>
                              </span>
                            )}
                          />

                          <span className="line" />
                          <span className="line">
                            <span className="text-slate-400">
                              {"  <!-- Background Colors -->"}
                            </span>
                          </span>
                          <For
                            each={colors.background}
                            renderItem={color => (
                              <span
                                key={`${format}-${color.hex()}`}
                                className="line"
                              >
                                <span className="text-cyan-400">
                                  {" "}
                                  &lt;color
                                </span>
                                <span> </span>
                                <span className="text-pink-400">name</span>
                                <span className="text-slate-50">=</span>
                                <span className="text-orange-300">
                                  &quot;color-{kebabize(nameColor(color))}&quot;
                                </span>
                                <span className="text-cyan-400">&gt;</span>
                                <span className="text-orange-300">
                                  {toString(color, colorMode)}
                                </span>
                                <span className="text-cyan-400">
                                  &lt;/color&gt;
                                </span>
                              </span>
                            )}
                          />

                          <span className="line">
                            <span className="text-cyan-400">&lt;/</span>
                            <span className="text-cyan-400">resources</span>
                            <span className="text-cyan-400">&gt;</span>
                          </span>
                        </>
                      )}
                    />

                    <If
                      condition={format === "swift"}
                      renderItem={() => (
                        <>
                          <span className="line">
                            <span className="text-slate-400">
                              // Foreground Colors
                            </span>
                          </span>
                          <For
                            each={colors.foreground}
                            renderItem={color => (
                              <span
                                key={`${format}-${color.hex()}`}
                                className="line"
                              >
                                <span className="text-purple-400">
                                  static let
                                </span>{" "}
                                <span className="text-lime-400">
                                  color{pascalize(nameColor(color))}
                                </span>{" "}
                                <span className="text-slate-50">=</span>{" "}
                                <span className="text-blue-400">UIColor</span>
                                <span className="text-slate-50">(</span>
                                <span className="text-pink-400">hex:</span>{" "}
                                <span className="text-orange-300">
                                  &quot;{toString(color, "hex")}&quot;
                                </span>
                                <span className="text-slate-50">)</span>
                              </span>
                            )}
                          />

                          <span className="line" />
                          <span className="line">
                            <span className="text-slate-400">
                              // Background Colors
                            </span>
                          </span>
                          <For
                            each={colors.background}
                            renderItem={color => (
                              <span
                                key={`${format}-${color.hex()}`}
                                className="line"
                              >
                                <span className="text-purple-400">
                                  static let
                                </span>{" "}
                                <span className="text-lime-400">
                                  color{pascalize(nameColor(color))}
                                </span>{" "}
                                <span className="text-slate-50">=</span>{" "}
                                <span className="text-blue-400">UIColor</span>
                                <span className="text-slate-50">(</span>
                                <span className="text-pink-400">hex:</span>{" "}
                                <span className="text-orange-300">
                                  &quot;{toString(color, "hex")}&quot;
                                </span>
                                <span className="text-slate-50">)</span>
                              </span>
                            )}
                          />
                        </>
                      )}
                    />
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
