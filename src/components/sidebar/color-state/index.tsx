import Accordion from "@components/common/accordion"
import ScrollArea from "@components/common/scroll-area"
import ColorSlots from "./color-slots"
import Header from "./header"
import ColorHarmonyHelper from "./helper-tabs/color-harmony"
import ContrastHelper from "./helper-tabs/contrast"

export default function ColorState() {
  return (
    <ScrollArea>
      <aside className="size-full overflow-y-auto">
        <Header />
        <ColorSlots />
        <Accordion defaultValue={["color-harmony", "contrast"]} type="multiple">
          <Accordion.Section value="color-harmony">
            <Accordion.Header>Color Harmony</Accordion.Header>
            <Accordion.Content>
              <ColorHarmonyHelper />
            </Accordion.Content>
          </Accordion.Section>
          <Accordion.Section value="contrast">
            <Accordion.Header>Contrast</Accordion.Header>
            <Accordion.Content>
              <ContrastHelper />
            </Accordion.Content>
          </Accordion.Section>
        </Accordion>
      </aside>
    </ScrollArea>
  )
}
