import {
  Content,
  DialogTrigger,
  Overlay,
  Portal,
  Root,
} from "@radix-ui/react-dialog"
import { AnimatePresence, Variants } from "motion/react"
import { motion } from "motion/react"
import { ReactNode, useState } from "react"
import If from "@components/common/if"

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

interface Props {
  children: ReactNode
  content: () => ReactNode
}

export default function Modal({ children, content }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Root open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
            <Content>
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
                onClick={() => setOpen(false)}
                className="fixed inset-0"
              >
                <div onClick={(e) => e.stopPropagation()}>{content()}</div>
              </motion.div>
            </Content>
          </Portal>
        )}
      />
    </Root>
  )
}
