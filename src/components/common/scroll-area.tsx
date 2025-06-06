import cx, { Class } from "@/lib/utils/cx"
import * as RadixScrollArea from "@radix-ui/react-scroll-area"

export default function ScrollArea({
  children,
  className,
}: {
  children: React.ReactNode
  className?: Class
}) {
  return (
    <RadixScrollArea.Root className={cx("flex h-full w-full", className)}>
      <RadixScrollArea.Viewport className="h-full w-full">
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className="flex w-2 touch-none p-0.5 py-4 transition-colors duration-[160ms] ease-out select-none hover:bg-black/5"
        orientation="vertical"
      >
        <RadixScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-300 before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-11 before:min-w-4 before:-translate-x-1/2 before:-translate-y-1/2" />
      </RadixScrollArea.Scrollbar>
    </RadixScrollArea.Root>
  )
}
