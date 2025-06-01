import { Check } from "@phosphor-icons/react"
import * as RadixCheckbox from "@radix-ui/react-checkbox"
import { motion } from "motion/react"

type Props = RadixCheckbox.CheckboxProps

export default function Checkbox(props: Props) {
  return (
    <RadixCheckbox.Root
      className="bg-muted-background disabled:bg-muted/10 flex size-6 cursor-pointer items-center justify-center rounded border transition disabled:cursor-auto disabled:border-transparent"
      {...props}
    >
      <RadixCheckbox.Indicator asChild>
        <motion.span
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            mass: 0.2,
            damping: 5,
          }}
        >
          <Check weight="bold" className="text-accent" />
        </motion.span>
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}
