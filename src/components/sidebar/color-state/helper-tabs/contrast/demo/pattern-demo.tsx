import { Label } from "@radix-ui/react-label"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { Color } from "chroma-js"
import { useState } from "react"
import cx from "@utils/cx"

interface DemoProps {
  contrastColor: Color
  baseColor: Color
}

export default function PatternDemo({ contrastColor, baseColor }: DemoProps) {
  return (
    <main className="mb-2 max-w-full space-y-4 p-2">
      {/* Display */}
      <section
        className="relative aspect-video w-full overflow-hidden rounded"
        style={{
          background: baseColor.css(),
        }}
      ></section>
    </main>
  )
}
