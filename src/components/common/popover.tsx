import { type Icon, X } from "@phosphor-icons/react"
import * as Popover from "@radix-ui/react-popover"
import { CSSProperties, ReactNode, RefObject, useRef, useState } from "react"
import If from "@components/common/if"
import useEventListener from "@hooks/useEventListener"

interface RadixPopoverProps {
  trigger: ReactNode
  content: ReactNode | ReactNode[]
  title: string
  icon?: Icon
  sideOffset?: number
  anchor?: RefObject<HTMLElement>
}

export function RadixPopover({
  trigger,
  content,
  title,
  icon: Icon,
  sideOffset = 0,
  anchor,
}: RadixPopoverProps) {
  return (
    <Popover.Root>
      <If
        condition={anchor !== undefined}
        renderItem={() => <Popover.Anchor virtualRef={anchor} />}
      />
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="right"
          sideOffset={sideOffset}
          className="w-64 flex-col overflow-hidden rounded-lg border bg-white shadow-xl"
          collisionPadding={{
            top: 24,
            bottom: 64,
          }}
        >
          <div className="flex size-full flex-col">
            <header className="text-caption h-header-height flex w-full shrink-0 items-center justify-between border-b px-3">
              <div className="flex items-center justify-center gap-1 select-none">
                {Icon && <Icon className="text-accent size-4" weight="fill" />}
                <h2 className="text-muted">{title}</h2>
              </div>
              <Popover.Close asChild>
                <button className="hover:bg-muted-background cursor-pointer rounded-md p-1 transition active:opacity-50">
                  <X className="size-4" />
                </button>
              </Popover.Close>
            </header>
            {content}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

interface NativePopoverProps {
  id: string
  children: ReactNode[] | ReactNode
  positionAnchor: string
  title: string
  icon?: Icon
  offsetX?: number
  offsetY?: number
}

export function NativePopover({
  id,
  children,
  positionAnchor,
  title,
  icon: Icon,
  offsetX = 0,
  offsetY = 0,
}: NativePopoverProps) {
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
      className="fixed w-64 flex-col rounded-lg border shadow-xl"
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
