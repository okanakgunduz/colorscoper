import { CaretUp, Check } from "@phosphor-icons/react"
import { CaretDown } from "@phosphor-icons/react/dist/ssr"
import {
  Root,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectViewport,
  SelectGroupProps,
  SelectGroup,
  SelectSeparator,
  SelectSeparatorProps,
  SelectLabel,
  SelectLabelProps,
  SelectItem,
  SelectItemProps,
  SelectItemText,
  SelectItemIndicator,
} from "@radix-ui/react-select"
import { ElementRef, forwardRef, type ReactNode } from "react"

/* Root */

type SelectProps = {
  title: string
  defaultValue?: string
  children?: ReactNode[] | ReactNode
}

export default function Select({ title, defaultValue, children }: SelectProps) {
  return (
    <Root>
      <div className="flex flex-col">
        <p aria-label={title} className="text-caption text-muted">
          {title}
        </p>
        <SelectTrigger className="flex items-center gap-1" aria-label={title}>
          <SelectValue />
          <SelectIcon>
            <CaretDown weight="bold" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectScrollUpButton>
              <CaretUp />
            </SelectScrollUpButton>
            <SelectViewport>{children}</SelectViewport>
            <SelectScrollDownButton>
              <CaretDown />
            </SelectScrollDownButton>
          </SelectContent>
        </SelectPortal>
      </div>
    </Root>
  )
}

/* Option */

const Option = forwardRef<ElementRef<typeof SelectItem>, SelectItemProps>(
  ({ children, ...rest }, ref) => (
    <SelectItem {...rest} ref={ref}>
      <SelectItemText>{children}</SelectItemText>
      <SelectItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <Check />
      </SelectItemIndicator>
    </SelectItem>
  ),
)

Select.Option = Option
Select.Option.displayName = Option.displayName

/* Group */

const Group = forwardRef<ElementRef<typeof SelectGroup>, SelectGroupProps>(
  (props, ref) => <SelectGroup {...props} ref={ref} />,
)

Select.Group = Group
Select.Group.displayName = Group.displayName

/* Separator */

const Separator = forwardRef<
  ElementRef<typeof SelectSeparator>,
  SelectSeparatorProps
>((props, ref) => <SelectSeparator {...props} ref={ref} />)

Select.Separator = Separator
Select.Separator.displayName = Separator.displayName

/* GroupLabel */

const GroupLabel = forwardRef<ElementRef<typeof SelectLabel>, SelectLabelProps>(
  (props, ref) => <SelectLabel {...props} ref={ref} />,
)

Select.GroupLabel = GroupLabel
Select.GroupLabel.displayName = GroupLabel.displayName
