import { Icon } from "@phosphor-icons/react"
import { ProhibitInset } from "@phosphor-icons/react/dist/ssr"
import { Color } from "chroma-js"
import { motion } from "motion/react"
import { ForwardedRef, forwardRef } from "react"
import Copy from "@components/common/copy"
import cx, { Class } from "@utils/cx"
import nameColor from "@utils/name-color"
import { useColorModeStore } from "@stores/color-mode.store"

interface Props {
  color: Color
  icon: Icon
  onAction?: (color: Color) => void
  className: Class
  disabled?: boolean
  id?: string
}

export default forwardRef(function ColorLine(
  {
    color,
    onAction,
    icon: Icon,
    className,
    disabled,

    id,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const getRoundedColorString = useColorModeStore.use.getRoundedColorString()
  const getColorString = useColorModeStore.use.getColorString()

  return (
    <motion.div
      ref={ref}
      layout
      {...(id && { layoutId: id })}
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className={cx(className, "flex h-12 w-full items-center gap-2")}
    >
      <div
        className="aspect-square h-full rounded border border-black/10"
        style={{
          background: color.css(),
        }}
      ></div>
      <header className="flex flex-col justify-center">
        <h2 className="text-caption-bold">{nameColor(color)}</h2>
        <Copy data={getColorString(color)} className="opacity-75">
          {getRoundedColorString(color)}
        </Copy>
      </header>
      <button
        disabled={disabled}
        className={cx(
          "ml-auto cursor-pointer rounded border bg-white p-2 transition",
          {
            "cursor-auto opacity-50": disabled,
          },
        )}
        onClick={() => onAction?.(color)}
      >
        {disabled ? <ProhibitInset size={14} /> : <Icon size={14} />}
      </button>
    </motion.div>
  )
})
