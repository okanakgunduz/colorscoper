import * as Slider from "@radix-ui/react-slider"
import { motion } from "framer-motion"
import { useState } from "react"
import { useThrottleCallback } from "@hooks/useThrottle"
import cx, { Class } from "@utils/cx"

interface Props {
  className?: Class
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  title: string
  throttle?: number
}

const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.5,
}

export default function ExpandableSlider(props: Props) {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <motion.div
      className={cx(
        props.className,
        "rounded-full border bg-white shadow-xl",
        expanded ? "h-12 w-72" : "h-10 w-32",
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      layout
      transition={springTransition}
    >
      {expanded ? (
        <ExpandedView
          key="expanded"
          value={props.value}
          onValueChange={props.onValueChange}
          min={props.min}
          max={props.max}
          step={props.step}
          title={props.title}
          throttle={props.throttle}
        />
      ) : (
        <CollapsedView
          key="collapsed"
          value={props.value}
          title={props.title}
        />
      )}
    </motion.div>
  )
}

function CollapsedView({ value, title }: Pick<Props, "value" | "title">) {
  return (
    <motion.div
      layout
      transition={springTransition}
      className="absolute inset-0 flex size-full items-center justify-center gap-2"
    >
      <motion.span
        layoutId="title"
        transition={springTransition}
        className="pb-0.5 text-gray-500"
      >
        {title}
      </motion.span>

      <motion.span
        layoutId="thumb"
        transition={springTransition}
        className="bg-muted-accent text-accent text-caption-bold rounded p-1 select-none"
      >
        {value}
      </motion.span>
    </motion.div>
  )
}

function ExpandedView({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  title,
  throttle = 0,
}: Pick<
  Props,
  "value" | "onValueChange" | "min" | "max" | "step" | "title" | "throttle"
>) {
  const [localValue, setLocalValue] = useState(value)
  const throttledOnValueChange = useThrottleCallback(onValueChange, throttle)

  const handleChange = (val: number[]) => {
    setLocalValue(val[0])
    throttledOnValueChange(val[0])
  }

  const handleMouseUp = () => {
    onValueChange(localValue)
  }

  return (
    <motion.div
      layout
      className="absolute inset-0 flex w-full items-center justify-center gap-4 overflow-hidden pr-8 pl-6"
    >
      <motion.span
        layoutId="title"
        transition={springTransition}
        className="pb-0.5 text-gray-500"
      >
        {title}
      </motion.span>

      <Slider.Root
        value={[localValue]}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={step}
        asChild
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative flex h-full grow items-center"
        >
          <Slider.Track className="relative h-1 flex-1 rounded bg-gray-300">
            <Slider.Range className="absolute h-full rounded bg-blue-500" />
          </Slider.Track>
          <Slider.Thumb asChild>
            <motion.span
              layoutId="thumb"
              onPointerUp={handleMouseUp}
              transition={springTransition}
              className="bg-muted-accent text-accent text-caption-bold cursor-grab rounded p-1 select-none"
            >
              {localValue}
            </motion.span>
          </Slider.Thumb>
        </motion.div>
      </Slider.Root>
    </motion.div>
  )
}
