import { Root } from "@radix-ui/react-accordion"
import { PropsWithChildren } from "react"

type AccordionProps = { defaultValue: string }
export function Accordion({
  defaultValue,
  children,
}: PropsWithChildren<AccordionProps>) {
  return (
    <Root defaultValue={defaultValue as unknown as string[]} type="multiple">
      {children}
    </Root>
  )
}

type SectionProps = {}
export function Section() {}

type TriggerProps = {}
export function Trigger() {}

type ContentProps = {}
export function Content() {}
