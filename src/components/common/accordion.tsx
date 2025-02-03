import { CaretDown } from "@phosphor-icons/react"
import {
  AccordionContent,
  AccordionContentProps,
  AccordionHeader,
  AccordionItem,
  AccordionItemProps,
  AccordionMultipleProps,
  AccordionTrigger,
  AccordionTriggerProps,
  Root,
} from "@radix-ui/react-accordion"
import {
  ElementRef,
  PropsWithChildren,
  ReactNode,
  createContext,
  forwardRef,
  useState,
} from "react"
import cx, { Class } from "@utils/cx"

/* Contexts */
const AccordionValueContext = createContext<string[]>([])
const SectionIdContext = createContext<string | undefined>(undefined)

/* Root */

type AccordionProps = {
  children: ReactNode[] | ReactNode
  defaultValue: string[]
} & AccordionMultipleProps

export default function Accordion({
  children,
  defaultValue = [],
  ...props
}: AccordionProps) {
  const [value, setValue] = useState<string[]>(defaultValue)

  return (
    <AccordionValueContext.Provider value={value}>
      <Root
        className="w-full divide-y border-y"
        value={value}
        onValueChange={setValue}
        {...props}
      >
        {children}
      </Root>
    </AccordionValueContext.Provider>
  )
}

/* Section */

type SectionSectionProps = { children: ReactNode[] } & AccordionItemProps

const Section = forwardRef<
  ElementRef<typeof AccordionItem>,
  SectionSectionProps
>(({ children, value, ...props }, ref) => (
  <SectionIdContext.Provider value={value}>
    <AccordionItem {...props} ref={ref} value={value}>
      {children}
    </AccordionItem>
  </SectionIdContext.Provider>
))

Accordion.Section = Section
Accordion.Section.displayName = Section.displayName

/* Header */

type HeaderProps = { className?: Class } & AccordionTriggerProps

const Header = forwardRef<
  ElementRef<typeof AccordionTrigger>,
  PropsWithChildren<HeaderProps>
>(({ children, className, ...props }, ref) => (
  <AccordionHeader>
    <AccordionTrigger
      className={cx(
        "px-sidebar group text-heading-2 flex h-14 w-full cursor-pointer items-center justify-between font-[500]",
        className,
      )}
      {...props}
      ref={ref}
    >
      <span>{children}</span>
      <CaretDown
        weight="bold"
        className="group-state-open:rotate-180 text-accent transition-transform duration-300"
      />
    </AccordionTrigger>
  </AccordionHeader>
))

Accordion.Header = Header
Accordion.Header.displayName = Header.displayName

/* Content */

const Content = forwardRef<
  ElementRef<typeof AccordionContent>,
  AccordionContentProps
>(({ children, ...props }, ref) => {
  // const value = useContext(AccordionValueContext)
  // const sectionId = useContext(SectionIdContext)

  return (
    <AccordionContent
      {...props}
      ref={ref}
      forceMount
      className="state-open:h-auto h-0 overflow-hidden"
    >
      {children}
    </AccordionContent>
  )
})

Accordion.Content = Content
Accordion.Content.displayName = Content.displayName
