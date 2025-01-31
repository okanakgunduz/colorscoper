import { Variants } from "motion/react"

import { motion } from "motion/react"
import { useMemo } from "react"

interface LineProps {
  from: number
  to: number
  circleRadius?: number
  strokeColor?: string
}

const lineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.75 },
  },
}

export default function Line({
  from,
  to,
  circleRadius = 140,
  strokeColor = "white",
}: LineProps) {
  const angleFrom = useMemo(() => ((from - 3) * Math.PI) / 6, [from])
  const angleTo = useMemo(() => ((to - 3) * Math.PI) / 6, [to])

  return (
    <motion.line
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      x1={circleRadius * Math.cos(angleFrom)}
      y1={circleRadius * Math.sin(angleFrom)}
      x2={circleRadius * Math.cos(angleTo)}
      y2={circleRadius * Math.sin(angleTo)}
      stroke={strokeColor}
      strokeWidth={5}
    />
  )
}
