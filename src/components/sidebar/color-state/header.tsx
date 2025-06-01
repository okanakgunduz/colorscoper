import Logo from "@/assets/Logo"

export default function Header() {
  return (
    <header className="p-sidebar space-y-2">
      <div className="flex w-full justify-between">
        <h1 className="text-heading flex items-center gap-1">
          <Logo width={20} height={20} />
          <span>ColorScope</span>
        </h1>
      </div>
      <p className="text-paragraph text-muted">
        Analyze the base color in terms of zones, harmonies and other helpers.
      </p>
    </header>
  )
}
