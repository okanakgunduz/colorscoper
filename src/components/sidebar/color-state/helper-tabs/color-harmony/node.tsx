import { CircleHalfTilt } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import { Variants } from "motion/react"
import { motion } from "motion/react"
import { Dispatch, RefObject, SetStateAction } from "react"
import { RadixPopover } from "@components/common/popover"
import cx, { Class } from "@utils/cx"
import getOptimizedTextColor from "@utils/get-optimized-text-color"
import romanize from "@utils/romanize"
import LineDetails from "./line-details"

const NODE_RADIUS = 20

interface NodeProps {
  color: Color
  section: number
  r?: 1 | 0.8 | 0.6 | 0.4 | 0.2
  circleRadius?: number
  className?: Class
  setHovering: Dispatch<SetStateAction<number | null>>
  anchorRef?: RefObject<HTMLElement>
}

const nodeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
  transition: {},
}

export default function Node({
  section,
  color,
  r = 1,
  className,
  setHovering,
  circleRadius = 140,
  anchorRef,
}: NodeProps) {
  return (
    <motion.foreignObject
      x={
        r *
          circleRadius *
          Math.cos(((((section + 12) % 12) - 3) * Math.PI) / 6) -
        NODE_RADIUS
      }
      y={
        r *
          circleRadius *
          Math.sin(((((section + 12) % 12) - 3) * Math.PI) / 6) -
        NODE_RADIUS
      }
      width={NODE_RADIUS * 2}
      height={NODE_RADIUS * 2}
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="hover"
    >
      <RadixPopover
        title={`Section ${romanize(section + 1)}`}
        icon={CircleHalfTilt}
        sideOffset={-16}
        trigger={
          <button
            onMouseEnter={() => setHovering(section)}
            onMouseLeave={() => setHovering(null)}
            className={cx(
              className,
              "cursor-pointer rounded-full border-4 border-white font-medium",
            )}
            style={{
              backgroundColor: color.css(),
              width: NODE_RADIUS * 2,
              height: NODE_RADIUS * 2,
              color: getOptimizedTextColor(color).css(),
            }}
          >
            {romanize(section + 1)}
          </button>
        }
        content={<LineDetails section={section} />}
        // {...(containerAnchor && {
        //   anchor: containerAnchor as Ref<HTMLElement>,
        // })}
        anchor={anchorRef}
      />
    </motion.foreignObject>
  )
}
