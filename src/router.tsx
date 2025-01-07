import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "@routes/picker";
import Analysis from "@routes/analysis";
import Palette from "@routes/palette";

const routes = createRoutesFromElements(
  <>
    <Route index element={<Home />} />
    <Route path="/analysis" element={<Analysis />} />
    <Route path="/palette" element={<Palette />} />
  </>,
);

const router = createBrowserRouter(routes);

export default router;
