import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import Editor from "@/routes"

const routes = createRoutesFromElements(
  <>
    <Route index element={<Editor />} />
  </>,
)

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
  },
})

export default router
