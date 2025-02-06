import { type Icon, X } from "@phosphor-icons/react"
import { CSSProperties, ReactNode, useRef, useState } from "react"
import useEventListener from "@hooks/useEventListener"

interface Props {
  id: string
  children: ReactNode[] | ReactNode
  positionAnchor: string
  title: string
  icon?: Icon
  offsetX?: number
  offsetY?: number
}

export default function Popover({
  id,
  children,
  positionAnchor,
  title,
  icon: Icon,
  offsetX = 0,
  offsetY = 0,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEventListener(
    "toggle",
    (e) => {
      setIsOpen((e.target as HTMLDialogElement).matches(":popover-open"))
    },
    dialogRef,
  )

  return (
    <dialog
      ref={dialogRef}
      // @ts-expect-error (Not supported yet, but polyfilled.)
      popover="auto"
      id={id}
      className="fixed min-h-96 w-64 flex-col rounded-lg border shadow-xl"
      style={
        {
          positionAnchor,
          left: `calc(anchor(right) + ${offsetX}px)`,
          top: `calc(anchor(top) + ${offsetY}px)`,
        } as CSSProperties
      }
    >
      <div className="flex size-full flex-col">
        <header className="text-caption flex h-10 w-full shrink-0 items-center justify-between border-b px-3">
          <div className="flex items-center justify-center gap-1 select-none">
            {Icon && <Icon className="size-4" />}
            <h2 className="text-black/70">{title}</h2>
          </div>
          <button
            // @ts-expect-error (Not supported yet, but polyfilled.)
            popovertarget={id}
            className="hover:bg-muted-background cursor-pointer rounded-md p-1 transition active:opacity-50"
            popovertargetaction="hide"
          >
            <X className="size-4" />
          </button>
        </header>
        {isOpen && children}
      </div>
    </dialog>
  )
}
