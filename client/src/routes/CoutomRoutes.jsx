import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Denied from "../pages/Denied";

import RequireAuth from "./RequireAuth";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Profile from "../pages/user/Profile.";
import EditProfile from "../pages/user/EditProfile";
import ChangePassword from "../pages/user/ChangePassword";

import PageNotFound from "../pages/PageNotFound";

function CoutomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/denied" element={<Denied />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/reset/password/:resetToken" element={<ResetPassword />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/edit-profile" element={<EditProfile />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default CoutomRoutes;