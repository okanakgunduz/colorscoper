import { Export as ExportIcon, X } from "@phosphor-icons/react"
import { Close, Description, Title } from "@radix-ui/react-dialog"

export default function Export() {
  return (
    <div className="fixed inset-0 m-auto h-fit w-sm overflow-hidden rounded-lg border bg-white">
      <header className="text-caption h-header-height relative flex w-full shrink-0 items-center justify-between border-b px-3 select-none">
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
      <div className="flex h-64 w-full items-center justify-center">Hello</div>
    </div>
  )
}
