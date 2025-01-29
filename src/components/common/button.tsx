import cx, { type Class } from "@/utils/cx"
import { cva, type VariantProps } from "class-variance-authority"
import { PropsWithChildren } from "react"
import type { Icon } from "@phosphor-icons/react"

const button = cva(
  "transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none",
  {
    variants: {
      type: {
        default: null,
      },
      disabled: {
        false: null,
        true: null,
      },
      iconPlacement: {
        leading: null,
        trailing: null,
        none: null,
      },
    },

    defaultVariants: {
      type: "default",
      iconPlacement: "none",
      disabled: false,
    },
  },
)

interface CommonProps
  extends Exclude<VariantProps<typeof button>, "iconPlacement"> {
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

type ButtonProps = ButtonWithIconProps | ButtonWithoutIconProps

export default function Button({
  className,
  disabled,
  iconPlacement,
  icon: IconComponent,
  type,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cx(
        button({
          type,
          disabled,
          iconPlacement: IconComponent ? (iconPlacement ?? "leading") : "none",
        }),
        className,
      )}
    >
      {IconComponent && <IconComponent />}
      {children}
    </button>
  )
}
