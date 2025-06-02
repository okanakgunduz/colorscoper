import { CaretDown, Check } from "@phosphor-icons/react"
import {
  Root,
  SelectProps as RootProps,
  SelectContent,
  SelectGroup,
  SelectGroupProps,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemProps,
  SelectItemText,
  SelectLabel,
  SelectLabelProps,
  SelectPortal,
  SelectSeparator,
  SelectSeparatorProps,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "@radix-ui/react-select"
import { ElementRef, type ReactNode, forwardRef } from "react"
import cx, { Class } from "@utils/cx"
import If from "./if"

/* ----------------- Types ------------------ */

type SelectBaseProps<T extends string> = {
  title?: string
  placeholder?: string
  children?: ReactNode[] | ReactNode
  className?: Class
  value?: T
  defaultValue?: T
  onValueChange?: (value: T) => void
} & Omit<RootProps, "value" | "defaultValue" | "onValueChange">

/* ----------------- Component ------------------ */

function SelectComponent<T extends string>({
  title,
  children,
  placeholder,
  className,
  value,
  defaultValue,
  onValueChange,
  ...rest
}: SelectBaseProps<T>) {
  return (
    <Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...rest}
    >
      <div className={cx(className, "flex flex-col")}>
        <If
          condition={!!title}
          renderItem={() => (
            <p
              aria-label={title}
              className="text-caption text-muted select-none"
            >
              {title}
            </p>
          )}
        />
        <SelectTrigger
          className="flex w-full items-center justify-between gap-1 font-medium focus-visible:ring-0"
          aria-label={title}
        >
          <SelectValue className="bg-red-400!" placeholder={placeholder} />
          <SelectIcon>
            <CaretDown weight="bold" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectContent className="rounded-xl border bg-white p-2 shadow-xl select-none">
            <SelectViewport className="h-full">{children}</SelectViewport>
          </SelectContent>
        </SelectPortal>
      </div>
    </Root>
  )
}

/* ----------------- Subcomponents ------------------ */

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
Option.displayName = "Select.Option"

const Group = forwardRef<ElementRef<typeof SelectGroup>, SelectGroupProps>(
  (props, ref) => <SelectGroup {...props} ref={ref} />,
)
Group.displayName = "Select.Group"

const Separator = forwardRef<
  ElementRef<typeof SelectSeparator>,
  SelectSeparatorProps
>((props, ref) => <SelectSeparator {...props} ref={ref} />)
Separator.displayName = "Select.Separator"

const GroupLabel = forwardRef<ElementRef<typeof SelectLabel>, SelectLabelProps>(
  (props, ref) => <SelectLabel {...props} ref={ref} />,
)
GroupLabel.displayName = "Select.GroupLabel"

/* ----------------- Attach with static props ------------------ */

type SelectGeneric = <T extends string>(
  props: SelectBaseProps<T>,
) => JSX.Element

type SelectWithStatics = SelectGeneric & {
  Option: typeof Option
  Group: typeof Group
  Separator: typeof Separator
  GroupLabel: typeof GroupLabel
}

const Select = SelectComponent as SelectWithStatics
Select.Option = Option
Select.Group = Group
Select.Separator = Separator
Select.GroupLabel = GroupLabel

export default Select
