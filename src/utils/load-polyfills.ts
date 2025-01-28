import {
  apply as applyPopoverPolyfill,
  isSupported as popoverSupported,
} from "@oddbird/popover-polyfill/fn"

import applyAnchorPolyfill from "@oddbird/css-anchor-positioning/fn"

export default async function loadPolyfills() {
  // const popoverSupported = "popover" in HTMLElement.prototype
  const anchorSupport = "anchorName" in document.documentElement.style // CSS.supports("position-anchor", "top")

  if (!popoverSupported()) applyPopoverPolyfill() // await import(...)
  if (!anchorSupport) await applyAnchorPolyfill() // await import(...)
}
