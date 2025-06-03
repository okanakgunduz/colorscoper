import For from "@/components/common/for"
import cx, { Class } from "@/lib/utils/cx"
import { Color } from "chroma-js"
import { CatalogRow } from "./catalog-items"

interface Props {
  className: Class
  colors: Color[]
}

export default function PrintCatalog({ className, colors }: Props) {
  return (
    <div className={cx("mt-4 space-y-1", className)}>
      <For
        each={colors}
        renderItem={(color, i) => (
          <CatalogRow key={`color-row-${i}`} {...{ color }} />
        )}
      />
    </div>
  )
}
