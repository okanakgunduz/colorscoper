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
  SelectProps as RootProps,
} from "@radix-ui/react-select"
import { ElementRef, forwardRef, type ReactNode } from "react"

/* Root */

type SelectProps = {
  title: string
  defaultValue?: string
  placeholder?: string
  children?: ReactNode[] | ReactNode
} & RootProps

export default function Select({
  title,
  defaultValue,
  children,
  placeholder,
}: SelectProps) {
  return (
    <Root defaultValue={defaultValue}>
      <div className="flex flex-col">
        <p aria-label={title} className="text-caption text-muted">
          {title}
        </p>
        <SelectTrigger
          className="flex items-center gap-1 font-medium focus-visible:ring-0"
          aria-label={title}
        >
          <SelectValue {...{ placeholder }} />
          <SelectIcon>
            <CaretDown weight="bold" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectContent className="rounded-xl border bg-white p-2 shadow-xl select-none">
            <SelectScrollUpButton className="flex h-3 cursor-default items-center justify-center bg-white">
              <CaretUp />
            </SelectScrollUpButton>
            <SelectViewport>{children}</SelectViewport>
          </SelectContent>
        </SelectPortal>
      </div>
    </Root>
  )
}

/* Option */

const Option = forwardRef<ElementRef<typeof SelectItem>, SelectItemProps>(
  ({ children, ...rest }, ref) => (
    <SelectItem
      {...rest}
      ref={ref}
      className="group state-checked:text-accent state-checked:bg-muted-accent highlighted:bg-muted-accent highlighted:text-accent flex cursor-pointer items-center justify-between gap-4 rounded-md py-1.5 pr-3 pl-2 font-[480] text-gray-900 not-first:not-last:-my-1 focus:outline-hidden"
    >
      <SelectItemText>{children}</SelectItemText>
      <SelectItemIndicator className="text-accent inline-flex items-center justify-center">
        <Check weight="bold" />
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
