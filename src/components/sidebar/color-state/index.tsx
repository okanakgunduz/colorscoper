import { Accordion, Section } from "@components/common/accordion"
import ColorSlots from "./color-slots"
import Header from "./header"

export default function ColorState() {
  return (
    <div className="size-full">
      <Header />
      <ColorSlots />
      <Accordion defaultValue="hello"></Accordion>
    </div>
  )
}
