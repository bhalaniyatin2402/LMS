import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useGetUserDetailQuery } from "../redux/services/lmsAuthApi";
import Loader from "../components/ui/Loader";

function RequireAuth({ allowedRoles }) {
  const { data, isLoading, isSuccess, error } = useGetUserDetailQuery();

  let isLoggedIn = undefined;
  let role = undefined;

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) {
    isLoggedIn = true;
    role = data?.user?.role;
  }

  return data && allowedRoles.find((allowRole) => allowRole === role) ? (
    <Outlet context={role} />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireAuth;
