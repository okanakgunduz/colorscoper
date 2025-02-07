import For from "@components/common/for"
import { useColorModeStore } from "@stores/color-mode.store"
import { useSelectionStore } from "@stores/selection.store"

interface Props {
  section: number
}

export default function LineDetails({ section }: Props) {
  const baseColor = useSelectionStore.use.color()!
  const getHueRotated = useSelectionStore.use.getHueRotated()
  const getColorString = useColorModeStore.use.getColorString()

  return (
    <div className="grow p-3">
      <header className="text-heading-2 flex h-12 items-center justify-center pb-4">
        Section {section}
      </header>
      <div className="*: grid w-full grid-cols-[auto_1fr_3rem_3rem] place-items-stretch gap-1.5 *:flex *:h-6 *:items-center *:justify-center">
        <div className=""></div>
        <div className="">Self</div>
        <div className=""> -10° </div>
        <div className=""> +10°</div>

        <For times={9}>
          {(i) => (
            <>
              <div className="text-caption-bold opacity-50">{i + 1}00</div>
              <div
                className="rounded-full border"
                style={{
                  background: baseColor.value.luminance(0.1 * i + 0.075).css(),
                }}
              >
                b{i}
              </div>
              <div className="rounded-full border">c{i}</div>
              <div className="rounded-full border">d{i}</div>
            </>
          )}
        </For>
      </div>
    </div>
  )
}
