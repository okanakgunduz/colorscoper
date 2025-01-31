import cx, { Class } from "@/utils/cx"
import { Color } from "chroma-js"
import { Variants } from "motion/react"
import { Dispatch, SetStateAction } from "react"
import { motion } from "motion/react"

interface NodeProps {
  color: Color
  section: number
  r?: 1 | 0.8 | 0.6 | 0.4 | 0.2
  circleRadius?: number
  className?: Class
  setHovering: Dispatch<SetStateAction<number | null>>
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
}: NodeProps) {
  return (
    <motion.circle
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      cx={
        r * circleRadius * Math.cos(((((section + 12) % 12) - 3) * Math.PI) / 6)
      }
      cy={
        r * circleRadius * Math.sin(((((section + 12) % 12) - 3) * Math.PI) / 6)
      }
      r={20}
      fill={color.css()}
      stroke="white"
      strokeWidth={4}
      className={cx(className, "cursor-pointer outline-hidden")}
      onMouseEnter={() => setHovering(section)}
      onMouseLeave={() => setHovering(null)}
    />
  )
}
