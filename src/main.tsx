import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"

import router from "@routes/router"

import loadPolyfills from "@utils/load-polyfills"

import "./global.css"

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
