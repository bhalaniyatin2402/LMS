import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BsArrowRight } from "react-icons/bs";
import { useTranslation } from "react-i18next";
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
  const role = useOutletContext();
  const { data, isLoading, error } = useGetUserDetailQuery();
  const [logout, { isLoading: loading }] = useLogoutMutation();
  const { t } = useTranslation();

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
      navigate("/login");
    } else {
      toast.success("logout failed");
    }
  }

  return (
    <main className="profile bg-[#e5e6e6]">
      <div className="container">
        <h1 className="title">{t("My Profile")}</h1>
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
              {t("Edit Profile")}
            </button>
          </div>
          <div className="right">
            <div className="row">
              <h3>{t("name")}:</h3>
              <span>{data?.user?.name}</span>
            </div>
            <div className="  row">
              <h3>{t("email")}:</h3>
              <span>{data?.user?.email}</span>
            </div>
            <div className="row">
              <h3>{t("role")}:</h3>
              <span>{data?.user?.role}</span>
            </div>
            <button
              className="btn btn-sm btn-info px-6 mx-auto mt-5"
              onClick={() => navigate("/user/change-password")}
            >
              {t("Change Password")}
            </button>
            <button
              className={`btn btn-sm btn-error px-6 mx-auto ${
                loading ? "btn-disabled" : ""
              }`}
              onClick={handleLogout}
            >
              {t("Logout")}
            </button>
          </div>
        </div>
      </div>
      {role === "USER" && (
        <div className="my-course">
          <span>
            <Link to="/user/courses">{t("My Courses")}</Link>
          </span>
          <BsArrowRight />
        </div>
      )}
    </main>
  );
}

export default Profile;
