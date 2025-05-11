import { DialogTrigger, Overlay, Portal, Root } from "@radix-ui/react-dialog"
import { AnimatePresence, Variants } from "motion/react"
import { motion } from "motion/react"
import { ReactNode, useState } from "react"
import If from "@components/common/if"
import Modal from "./modal"

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

interface Props {
  trigger: ReactNode
}

export default function SceneAnalyzer({ trigger }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Root open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <If
        condition={open}
        wrapper={AnimatePresence}
        renderItem={() => (
          <Portal forceMount>
            <Overlay asChild>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlayVariants}
                className="fixed inset-0 bg-black/20"
              />
            </Overlay>
            <Modal />
          </Portal>
        )}
      />
    </Root>
  )
}
