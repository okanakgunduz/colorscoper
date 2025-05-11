import type { Icon } from "@phosphor-icons/react"
import { type VariantProps, cva } from "class-variance-authority"
import { HTMLProps, PropsWithChildren } from "react"
import cx, { type Class } from "@utils/cx"

const button = cva(
  "transition-colors px-3 py-0.5 h-fit active:opacity-50 duration-150 cursor-pointer rounded-full select-none inline-flex items-center justify-center",
  {
    variants: {
      type: {
        default: "text-muted",
        fill: "bg-muted-accent text-accent",
      },

      disabled: {
        false: null,
        true: "pointer-events-none text-gray-400",
      },
      size: {
        sm: "font-medium gap-1",
        md: null,
      },
      content: {
        "icon-only": "rounded p-2",
        text: "",
      },
      iconPlacement: {
        leading: "pl-[10px]",
        trailing: "pr-[10px] flex-row-reverse",
        none: null,
      },
    },

    compoundVariants: [
      {
        type: "fill",
        disabled: true,
        class: "bg-gray-100",
      },
      {
        type: "fill",
        content: "icon-only",
        class: "bg-muted-background",
      },
    ],

    defaultVariants: {
      type: "default",
      size: "sm",
      content: "text",
      iconPlacement: "none",
      disabled: false,
    },
  },
)

interface CommonProps {
  className?: Class
}

interface ButtonWithIconProps extends CommonProps {
  icon: Icon
  iconPlacement?: "leading" | "trailing"
}

interface ButtonWithoutIconProps extends CommonProps {
  icon?: never
  iconPlacement?: "none"
}

type ButtonProps = (ButtonWithIconProps | ButtonWithoutIconProps) &
  HTMLProps<HTMLButtonElement> &
  Exclude<VariantProps<typeof button>, "iconPlacement">

export default function Button({
  className,
  disabled,
  iconPlacement,
  icon: IconComponent,
  type,
  children,
  content,
  size,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cx(
        button({
          type,
          size,
          disabled,
          content,
          iconPlacement: IconComponent ? (iconPlacement ?? "leading") : "none",
        }),
        className,
      )}
      {...{ disabled }}
      {...rest}
    >
      {IconComponent && (
        <IconComponent weight={type === "fill" ? "fill" : "regular"} />
      )}
      {children}
    </button>
  )
}
