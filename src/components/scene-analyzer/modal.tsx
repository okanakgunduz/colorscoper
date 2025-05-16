import { ChartDonut, X } from "@phosphor-icons/react"
import { Close, Description, Title } from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import If from "@components/common/if"
import Analyzer from "./analyzer"
import Assigner from "./assigner"

enum Tabs {
  Assigner = "assigner",
  Analyzer = "analyzer",
}

export default function Modal() {
  const [tab, setTab] = useState<Tabs>(Tabs.Assigner)

  return (
    <motion.div
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0.97,
        opacity: 0,
        transition: {
          type: "tween",
          ease: "easeOut",
          duration: 0.15,
        },
      }}
      layout
      className="fixed inset-0 m-auto size-fit overflow-hidden rounded-lg border bg-white"
    >
      <div>
        <motion.header
          layout
          className="text-caption relative flex h-10 w-full shrink-0 items-center justify-between border-b px-3 select-none"
        >
          <motion.div
            layout="preserve-aspect"
            className="flex items-center justify-center gap-1 select-none"
          >
            <ChartDonut className="text-accent size-4" weight="fill" />
            <Title asChild>
              <h2 className="gradient-title font-[450]">Scene Analyzer</h2>
            </Title>
            <Description className="sr-only">
              Scene analyzer for selected colors in the palette.
            </Description>
          </motion.div>

          <motion.div
            layout="preserve-aspect"
            className="text-caption-bold text-muted absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 capitalize"
          >
            {tab}
          </motion.div>

          <Close asChild>
            <motion.button
              layout="preserve-aspect"
              className="hover:bg-muted-background cursor-pointer rounded-md p-1 transition active:opacity-50"
            >
              <X className="size-4" />
            </motion.button>
          </Close>
        </motion.header>
        <If
          wrapper={AnimatePresence}
          condition={tab === Tabs.Assigner}
          renderItem={() => (
            <Assigner
              onConfirmed={() => {
                setTab(Tabs.Analyzer)
              }}
            />
          )}
          renderElse={() => <Analyzer />}
        />
      </div>
    </motion.div>
  )
}
