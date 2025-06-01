import For from "@/components/common/for"
import { buildQuery } from "@/lib/utils/search-query"
import { usePaletteStore } from "@/stores/palette.store"
import { Export as ExportIcon, Play, X } from "@phosphor-icons/react"
import { Close, Description, Title } from "@radix-ui/react-dialog"
import { Color } from "chroma-js"
import { useMemo, useState } from "react"
import { Link } from "react-router"
import ExportLine from "./export-line"

export default function Export() {
  const paletteColors = usePaletteStore.use.colors()

  const [config, setConfig] = useState<
    Array<{
      isBackground: boolean
      color: Color
    }>
  >(paletteColors.map(color => ({ isBackground: false, color })))

  const disabled = useMemo(
    () => config.filter(entry => entry.isBackground).length >= 3,
    [config],
  )

  return (
    <div className="fixed inset-0 m-auto h-fit w-sm divide-y overflow-hidden rounded-lg border bg-white">
      <header className="text-caption h-header-height relative flex w-full shrink-0 items-center justify-between px-3 select-none">
        <div className="flex items-center justify-center gap-1 select-none">
          <ExportIcon className="text-accent size-4" weight="fill" />
          <Title asChild>
            <h2 className="text-muted">Export</h2>
          </Title>
          <Description className="sr-only">
            Palette exporter for the current selection of colors.
          </Description>
        </div>

        <Close asChild>
          <button className="hover:bg-muted-background cursor-pointer rounded-md p-1 transition active:opacity-50">
            <X className="size-4" />
          </button>
        </Close>
      </header>
      <section className="flex w-full flex-col px-4 pt-4 pb-6">
        <div className="text-caption-bold text-muted mb-4 flex justify-between">
          <h2>Color</h2>
          <h2>Is Background?</h2>
        </div>
        <div className="space-y-3">
          <For
            each={config}
            renderItem={({ color, isBackground }, i) => (
              <ExportLine
                color={color}
                disabled={disabled && !isBackground}
                checked={isBackground}
                onCheckedChange={val =>
                  setConfig(config =>
                    config.map((item, index) =>
                      index === i ? { ...item, isBackground: val } : item,
                    ),
                  )
                }
              />
            )}
          />
        </div>
      </section>
      <div className="bg-muted-background flex h-12 items-center justify-between p-5">
        <p className="text-muted text-xs">
          {paletteColors.length} colors are ready to be exported.
        </p>

        <Link
          to={{
            pathname: "/export",
            search: buildQuery({
              config: config.map(entry => [
                entry.isBackground ? 1 : 0,
                entry.color.hex(),
              ]),
            }),
          }}
        >
          <button className="text-caption-bold disabled:bg-muted bg-accent flex cursor-pointer items-center gap-1 rounded py-1.5 pr-4 pl-3 text-white transition select-none hover:brightness-95 disabled:opacity-75">
            <Play weight="fill" />
            Export
          </button>
        </Link>
      </div>
    </div>
  )
}
