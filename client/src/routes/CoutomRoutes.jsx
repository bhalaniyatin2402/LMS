import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";

function CoutomRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default CoutomRoutes
