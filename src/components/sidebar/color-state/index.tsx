import { motion } from "motion/react"
import Accordion from "@components/common/accordion"
import { fade } from "@utils/animation"
import ColorSlots from "./color-slots"
import Header from "./header"
import ColorHarmonyHelper from "./helper-tabs/color-harmony"
import ContrastHelper from "./helper-tabs/contrast-helper"
import ZonesHelper from "./helper-tabs/zones-helper"

export default function ColorState() {
  return (
    <motion.aside
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="size-full"
    >
      <Header />
      <ColorSlots />
      <Accordion defaultValue={["color-harmony"]} type="multiple">
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
    </motion.aside>
  )
}
