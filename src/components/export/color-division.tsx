import { Columns, ListDashes } from "@phosphor-icons/react"
import { Color } from "chroma-js"
import { useState } from "react"
import Select from "@components/common/select"
import ColorCatalog from "./color-catalog"
import PrintCatalog from "./print-catalog"

interface Props {
  colors: Color[]
  title: string
  subtitle: string
}

type Variant = "columns" | "list"

export default function ColorDivision({ colors, title, subtitle }: Props) {
  const [variant, setVariant] = useState<Variant>("columns")

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-heading">{title}</h2>
          <p>{subtitle}</p>
        </div>

        <Select<Variant>
          value={variant}
          onValueChange={setVariant}
          className="print:hidden"
        >
          <Select.Option value="columns">
            <span className="flex items-center gap-1.5">
              <Columns size={16} />
              Columns
            </span>
          </Select.Option>
          <Select.Option value="list">
            <span className="flex items-center gap-1.5">
              <ListDashes size={16} />
              List
            </span>
          </Select.Option>
        </Select>
      </div>
      <ColorCatalog {...{ colors, variant }} className="print:hidden" />
      <PrintCatalog {...{ colors }} className="hidden print:block" />
    </section>
  )
}
