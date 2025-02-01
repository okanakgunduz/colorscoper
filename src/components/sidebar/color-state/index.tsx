import Accordion from "@components/common/accordion"

import ColorSlots from "./color-slots"
import Header from "./header"
import ColorHarmonyHelper from "./helper-tabs/color-harmony"
import ContrastHelper from "./helper-tabs/contrast-helper"
import ZonesHelper from "./helper-tabs/zones-helper"

export default function ColorState() {
  return (
    <div className="size-full">
      <Header />
      <ColorSlots />
      <Accordion type="multiple" defaultValue={["color-harmony"]}>
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
        <Accordion.Section value="zones">
          <Accordion.Header>Zones</Accordion.Header>
          <Accordion.Content>
            <ZonesHelper />
          </Accordion.Content>
        </Accordion.Section>
      </Accordion>
    </div>
  )
}
