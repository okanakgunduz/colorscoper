import "@/global.css"
import { Editor, Export } from "@/views"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"

const root = document.getElementById("root")!

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Editor />} />
        <Route path="/export" element={<Export />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
