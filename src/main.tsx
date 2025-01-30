import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import router from "@/router"

import "@/index.css"
import loadPolyfills from "@/utils/load-polyfills"

await loadPolyfills()

const root = document.getElementById("root")!

createRoot(root).render(
  <StrictMode>
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  </StrictMode>,
)
