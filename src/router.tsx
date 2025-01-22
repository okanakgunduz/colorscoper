import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Editor from "@/routes"

const routes = createRoutesFromElements(
  <>
    <Route index element={<Editor />} />
  </>,
)

const router = createBrowserRouter(routes)

export default router
