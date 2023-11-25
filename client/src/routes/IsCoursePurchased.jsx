import React from "react";
import {
  Outlet,
  useLocation,
  useOutletContext,
  Navigate,
} from "react-router-dom";

import { useGetMyCourseListQuery } from "../redux/services/lmsMyCourseApi";
import Loader from "../components/ui/Loader";
import Error from "../pages/Error";

function IsCoursePurchased() {
  const { data: myCourses, isLoading, error } = useGetMyCourseListQuery();
  const role = useOutletContext();
  const { state } = useLocation();

  if (state === null || !state) {
    return <Navigate to="/courses" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error && error.status !== 403) {
    return <Error />;
  }

  const myCoursesId = [];
  myCourses?.courseList.map((course) => {
    myCoursesId.push(course._id);
  });

  return (
    <>
      {(myCoursesId.includes(state._id) && myCoursesId?.length !== 0) ||
      role === "ADMIN" ? (
        <Outlet context={{ role, isPurchased: true }} />
      ) : (
        <Outlet context={{ role, isPurchased: false }} />
      )}
    </>
  );
}

export default IsCoursePurchased;
