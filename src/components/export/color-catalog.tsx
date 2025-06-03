import For from "@/components/common/for"
import cx, { Class } from "@/lib/utils/cx"
import { Color } from "chroma-js"
import { useState } from "react"
import { CatalogColumn, CatalogRow } from "./catalog-items"

interface Props {
  colors: Color[]
  variant: "columns" | "list"
  className?: Class
}

export default function ColorCatalog({ colors, variant, className }: Props) {
  const [hovered, setHovered] = useState<number | null>(0)

  /* Columns */

  if (variant === "columns")
    return (
      <div
        className={cx(
          "flex aspect-[2/1] w-full overflow-hidden rounded-lg border border-black/10",
          className,
        )}
      >
        <For
          each={colors}
          renderItem={(color, index, { length }) => (
            <CatalogColumn
              key={index}
              color={color}
              index={index}
              hovered={length < 4 ? index : hovered}
              setHovered={length < 4 ? undefined : setHovered}
            />
          )}
        />
      </div>
    )

  /* List */

  return (
    <div className={cx("mt-4 block space-y-1", className)}>
      <For
        each={colors}
        renderItem={(color, i) => (
          <CatalogRow key={`color-row-${i}`} {...{ color }} />
        )}
      />
    </div>
  )
}
