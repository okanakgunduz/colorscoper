export default async function loadPolyfills() {
  const popoverSupport = "popover" in HTMLElement.prototype
  const anchorSupport = CSS.supports("position-anchor", "top")

  if (!popoverSupport) await import("@oddbird/popover-polyfill")
  if (!anchorSupport) await import("@oddbird/css-anchor-positioning")
}
