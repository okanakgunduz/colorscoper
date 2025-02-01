import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"

import Editor from "."

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
