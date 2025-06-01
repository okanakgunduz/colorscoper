import { ChartDonut, X } from "@phosphor-icons/react"
import { Close, Description, Title } from "@radix-ui/react-dialog"
import { Color } from "chroma-js"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import If from "@components/common/if"
import Analyzer from "./analyzer"
import Assigner from "./assigner"

enum Tabs {
  Assigner = "assigner",
  Analyzer = "analyzer",
}

export default function SceneAnalyzer() {
  const [tab, setTab] = useState<Tabs>(Tabs.Assigner)
  const [foreground, setForeground] = useState<Color[]>([])
  const [background, setBackground] = useState<Color[]>([])

  return (
    <motion.div
      layout
      className="fixed inset-0 m-auto size-fit overflow-hidden rounded-lg border bg-white"
    >
      <motion.div>
        <motion.header
          layout
          className="text-caption h-header-height relative flex w-full shrink-0 items-center justify-between border-b px-3 select-none"
        >
          <motion.div
            layout="preserve-aspect"
            className="flex items-center justify-center gap-1 select-none"
          >
            <ChartDonut className="text-accent size-4" weight="fill" />
            <Title asChild>
              <h2 className="text-muted">Scene Analyzer</h2>
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
              onConfirmed={(colorState) => {
                setForeground(colorState.foreground)
                setBackground(colorState.background)
                setTab(Tabs.Analyzer)
              }}
            />
          )}
          renderElse={() => (
            <Analyzer foreground={foreground} background={background} />
          )}
        />
      </motion.div>
    </motion.div>
  )
}
