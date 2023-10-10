import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { useGetUserDetailQuery } from "../../redux/services/lmsAuthApi";
import { useLogoutMutation } from "../../redux/services/lmsAuthApi";
import { setLogout } from "../../redux/slices/AuthSlice";
import Loader from "../../components/ui/Loader";
import Home from "../Home";
import "../../styles/pages/user/Profile.scss";

const dummyProdile =
  "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetUserDetailQuery();
  const [logout, { isLoading: loading }] = useLogoutMutation();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Home />;
  }

  async function handleLogout() {
    const res = await logout();
    if (res?.data?.success) {
      dispatch(setLogout());
      toast.success("logout successful");
    } else {
      toast.success("logout failed");
    }
  }

  return (
    <main className="profile bg-base-300">
      <div className="container">
        <h1 className="title">My Profile</h1>
        <div className="content">
          <div className="left">
            <img
              src={
                data?.user?.avatar?.secure_url
                  ? data?.user?.avatar?.secure_url
                  : dummyProdile
              }
            />
            <button
              className="btn btn-sm btn-accent mt-8 px-6"
              onClick={() => navigate("/user/edit-profile")}
            >
              Edit Profile
            </button>
          </div>
          <div className="right">
            <div className="row">
              <h3>Name:</h3>
              <span>{data?.user?.name}</span>
            </div>
            <div className="row">
              <h3>Email:</h3>
              <span>{data?.user?.email}</span>
            </div>
            <div className="row">
              <h3>Role:</h3>
              <span>{data?.user?.role}</span>
            </div>
            <button
              className="btn btn-sm btn-info px-6 mx-auto mt-5"
              onClick={() => navigate("/user/change-password")}
            >
              change password
            </button>
            <button
              className={`btn btn-sm btn-error px-6 mx-auto ${
                loading ? "btn-disabled" : ""
              }`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
