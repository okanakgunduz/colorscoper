import * as Slider from "@radix-ui/react-slider"
import { motion } from "framer-motion"
import { useState } from "react"
import { useDebounce } from "@hooks/useThrottle"
import cx, { Class } from "@utils/cx"
import map from "@utils/map"

interface Props {
  className?: Class
  value: number
  onValueChange: (value: number) => void
  min: number
  max: number
  step?: number
  title: string
  debounceTimeout?: number
  layoutkey: string
  format?: (value: number) => string
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
        "overflow-hidden rounded-3xl border bg-white shadow-xl",
      )}
      style={
        expanded
          ? {
              height: "3rem",
              width: `calc(19rem + ${props.title.length}ch)`,
            }
          : {
              height: "2.5rem",
              width: `calc(4.5rem + ${props.title.length + 1}ch)`,
            }
      }
      onPointerEnter={() => setExpanded(true)}
      onPointerLeave={() => setExpanded(false)}
      layout
      transition={springTransition}
    >
      {expanded ? (
        <ExpandedView
          layoutkey={props.layoutkey}
          key="expanded"
          value={props.value}
          onValueChange={props.onValueChange}
          min={props.min}
          max={props.max}
          step={props.step}
          title={props.title}
          debounceTimeout={props.debounceTimeout}
          format={props.format}
        />
      ) : (
        <CollapsedView
          layoutkey={props.layoutkey}
          key="collapsed"
          min={props.min}
          max={props.max}
          value={props.value}
          title={props.title}
          format={props.format}
        />
      )}
    </motion.div>
  )
}

/* Collapsed View */

function CollapsedView({
  value,
  title,
  layoutkey,
  min,
  max,
  format = (value) => value.toString(),
}: Pick<Props, "value" | "title" | "layoutkey" | "min" | "max" | "format">) {
  return (
    <motion.div
      layout
      transition={springTransition}
      className="absolute inset-0 flex size-full items-center justify-center gap-3 px-2"
    >
      <motion.span
        layoutId={`title-${layoutkey}`}
        transition={springTransition}
        className="pb-0.5"
        style={{
          color: (() => {
            const percentage = map(value, min, max, 0, 100)
            return `color-mix(in srgb, var(--color-gray-500) ${100 - percentage}%, var(--color-accent) ${percentage}%)`
          })(),
        }}
      >
        {title}
      </motion.span>

      <motion.span
        layoutId={`thumb-${layoutkey}`}
        transition={springTransition}
        className="bg-muted-accent text-accent text-caption-bold min-w-3 rounded p-1 select-none"
      >
        {format(value)}
      </motion.span>
    </motion.div>
  )
}

/* Expanded View */

function ExpandedView({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  title,
  debounceTimeout = 200,
  layoutkey,
  format = (value) => value.toString(),
}: Exclude<Props, "className">) {
  const [localValue, setLocalValue] = useState(value)
  const debounce = useDebounce()

  const handleChange = (val: number[]) => {
    setLocalValue(val[0])
    debounce(() => onValueChange(val[0]), debounceTimeout)
  }

  return (
    <motion.div
      layout
      className="absolute inset-0 flex w-full items-center justify-center gap-6 overflow-hidden pr-9 pl-6"
    >
      <motion.span
        layoutId={`title-${layoutkey}`}
        transition={springTransition}
        className="pb-0.5 text-gray-500"
        style={{
          color: (() => {
            const percentage = map(value, min, max, 0, 100)
            return `color-mix(in srgb, var(--color-gray-500) ${100 - percentage}%, var(--color-accent) ${percentage}%)`
          })(),
        }}
      >
        {title}
      </motion.span>

      <Slider.Root
        value={[localValue]}
        onValueChange={handleChange}
        onPointerUp={() => onValueChange(localValue)}
        min={min}
        max={max}
        step={step}
        asChild
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="relative flex h-full grow items-center"
        >
          <Slider.Track className="relative h-1 flex-1 rounded bg-gray-300">
            <Slider.Range className="bg-accent absolute h-full rounded" />
          </Slider.Track>
          <Slider.Thumb asChild>
            <motion.span
              layoutId={`thumb-${layoutkey}`}
              transition={springTransition}
              className="bg-muted-accent text-accent text-caption-bold cursor-grab rounded p-1 select-none active:cursor-grabbing"
            >
              {format(localValue)}
            </motion.span>
          </Slider.Thumb>
        </motion.div>
      </Slider.Root>
    </motion.div>
  )
}
