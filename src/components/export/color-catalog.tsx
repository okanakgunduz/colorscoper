import { Color } from "chroma-js"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

interface Props {
  colors: Color[]
  variant: "columns" | "list"
}

export default function ColorCatalog({ colors, variant }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)

  if (variant === "columns")
    return (
      <div className="flex aspect-[2/1] w-full overflow-hidden rounded-lg border">
        {colors.map((color, index) => {
          const isHovered = hovered === index

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex grow cursor-pointer items-center justify-center overflow-hidden"
              style={{
                backgroundColor: color.hex(),
              }}
              animate={{
                flexGrow: hovered === null ? 1 : isHovered ? 2 : 0.75,
              }}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 grid place-items-center text-xl font-bold text-white"
                  >
                    {color.hex().toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    )

  /* List (Static, print-only layout) */

  return (
    <div className="mt-4 block space-y-2">
      {colors.map((color, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div
            className="h-12 w-12 rounded border bg-red-400"
            style={{ backgroundColor: color.hex() }}
          />
          <div className="font-mono text-base">{color.hex().toUpperCase()}</div>
        </div>
      ))}
    </div>
  )
}
