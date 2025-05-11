import { Sparkle, X } from "@phosphor-icons/react"
import { Close, Content } from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import If from "@components/common/if"
import Analyzer from "./analyzer"
import Assignment from "./assignment"

enum Tabs {
  Assignment = "assignment",
  Analyzer = "analyzer",
}

export default function Modal() {
  const [tab, setTab] = useState<Tabs>(Tabs.Assignment)

  return (
    <Content asChild>
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        layout
        className="fixed inset-0 m-auto size-fit rounded-lg border bg-white"
      >
        <motion.div layout="preserve-aspect">
          <motion.header
            layout="preserve-aspect"
            className="text-caption relative flex h-10 w-full shrink-0 items-center justify-between border-b px-3"
          >
            <div className="flex items-center justify-center gap-1 select-none">
              <Sparkle className="text-accent size-4" weight="fill" />
              <h2 className="text-muted">Scene Analyzer</h2>
            </div>
            <AnimatePresence initial={false}>
              <motion.div
                layout
                className="bg-muted-accent text-caption-bold text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1.5 capitalize"
              >
                <motion.span
                  onClick={() => setTab(Tabs.Analyzer)}
                  key={tab}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.15,
                    },
                  }}
                >
                  {tab}
                </motion.span>
              </motion.div>
            </AnimatePresence>
            <Close asChild>
              <button className="hover:bg-muted-background cursor-pointer rounded-md p-1 transition active:opacity-50">
                <X className="size-4" />
              </button>
            </Close>
          </motion.header>
          <If
            condition={tab === Tabs.Assignment}
            renderItem={() => <Assignment />}
            renderElse={() => <Analyzer />}
          />
        </motion.div>
      </motion.div>
    </Content>
  )
}
