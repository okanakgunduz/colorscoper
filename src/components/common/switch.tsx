import * as RadixSwitch from "@radix-ui/react-switch"
import { motion } from "motion/react"
import cx from "@utils/cx"

export default function Switch({
  className,
  ...rest
}: RadixSwitch.SwitchProps) {
  return (
    <RadixSwitch.Root
      className={cx(
        className,
        "state-checked:justify-end state-checked:border-accent state-checked:bg-accent bg-muted-background flex h-6 w-10 cursor-pointer justify-start rounded-full border p-[3px] transition-colors duration-300",
      )}
      {...rest}
    >
      <RadixSwitch.Thumb asChild>
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          className="state-checked:bg-white bg-accent aspect-square h-full rounded-full transition-colors duration-300"
        ></motion.div>
      </RadixSwitch.Thumb>
    </RadixSwitch.Root>
  )
}
