import Checkbox from "@/components/common/checkbox"
import nameColor from "@/lib/utils/name-color"
import { Dot } from "@phosphor-icons/react"
import type { Color } from "chroma-js"

interface Props {
  color: Color
  disabled?: boolean
  checked: boolean
  onCheckedChange: (value: boolean) => void
}

export default function ExportLine({
  color,
  disabled,
  checked,
  onCheckedChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="size-8 rounded border border-black/5"
          style={{
            background: color.css(),
          }}
        ></div>
        <div className="flex items-center gap-1">
          <h3 className="font-medium">{nameColor(color)}</h3>
          <Dot size={20} weight="bold" className="text-accent" />
          <p className="text-caption opacity-75">{color.hex()}</p>
        </div>
      </div>

      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  )
}
