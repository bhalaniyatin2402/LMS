import { Route, Routes } from "react-router-dom";

import About from "../pages/About";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";

function CoutomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default CoutomRoutes;
