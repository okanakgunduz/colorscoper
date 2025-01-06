import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "@routes/index";
import Analysis from "@routes/analysis";

const routes = createRoutesFromElements(
  <>
    <Route index element={<Home />} />
    <Route path="/analysis" element={<Analysis />} />
  </>,
);

const router = createBrowserRouter(routes);

export default router;
