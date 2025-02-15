import anchorPolyfill from "@oddbird/css-anchor-positioning/fn"
import {
  apply as applyPopoverPolyfill,
  isSupported as popoverSupported,
} from "@oddbird/popover-polyfill/fn"

export default async function loadPolyfills() {
  const anchorSupport = CSS.supports("position-anchor", "top")

  if (!popoverSupported()) applyPopoverPolyfill()
  if (!anchorSupport) await anchorPolyfill()
}
