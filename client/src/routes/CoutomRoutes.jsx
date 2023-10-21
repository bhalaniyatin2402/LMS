import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Denied from "../pages/Denied";
import Error from "../pages/Error";
import CourseList from "../pages/course/CourseList";

import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import RequireAuth from "./RequireAuth";
import IsCoursePurchased from "./IsCoursePurchased";

import Profile from "../pages/user/Profile.";
import EditProfile from "../pages/user/EditProfile";
import ChangePassword from "../pages/user/ChangePassword";
import CourseDescription from "../pages/course/CourseDescription";
import Checkout from "../pages/payment/Checkout";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailure from "../pages/payment/PaymentFailure";
import DisplayLectures from "../pages/Lecture/DisplayLectures";
import MyCourses from "../pages/my_course/MyCourses";

import CreateCourse from "../pages/course/CreateCourse";
import UpdateCourse from "../pages/course/UpdateCourse";
import AddLecture from "../pages/Lecture/AddLecture";
import UpdateLecture from "../pages/Lecture/UpdateLecture";
import AdminDashboard from "../pages/admin_dashboard/AdminDashboard";

import PageNotFound from "../pages/PageNotFound";

function CoutomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/error" element={<Error />} />
      <Route path="/courses" element={<CourseList />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/reset/password/:resetToken" element={<ResetPassword />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/edit-profile" element={<EditProfile />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
        <Route element={<IsCoursePurchased />}>
          <Route path="/course/description" element={<CourseDescription />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentFailure />} />
        <Route path="/course/:courseId" element={<DisplayLectures />} />
        <Route path="/user/courses" element={<MyCourses />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/course/update" element={<UpdateCourse />} />
        <Route path="/course/lecture/add" element={<AddLecture />} />
        <Route path="/course/lecture/update" element={<UpdateLecture />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default CoutomRoutes;
