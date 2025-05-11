import { Sparkle, X } from "@phosphor-icons/react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "motion/react"

export default function Modal() {
  return (
    <>
      <Dialog.Content asChild>
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          layout
          className="fixed inset-0 m-auto size-fit rounded-lg border bg-white"
        >
          <div className="h-96 w-3xl">
            <header className="text-caption flex h-10 w-full shrink-0 items-center justify-between border-b px-3">
              <div className="flex items-center justify-center gap-1 select-none">
                <Sparkle className="text-accent size-4" weight="fill" />
                <h2 className="text-muted">Scene Analyzer</h2>
              </div>
              <Dialog.Close asChild>
                <button className="hover:bg-muted-background cursor-pointer rounded-md p-1 transition active:opacity-50">
                  <X className="size-4" />
                </button>
              </Dialog.Close>
            </header>
          </div>
        </motion.div>
      </Dialog.Content>
    </>
  )
}
