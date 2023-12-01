import {
  useNavigate,
  Navigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useDeleteCourseMutation } from "../../redux/services/lmsCourseApi";
import "../../styles/pages/course/CourseDescription.scss";

function CourseDescription() {
  const navigate = useNavigate();
  const { role, isPurchased } = useOutletContext();
  const { state } = useLocation();
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();
  const { t } = useTranslation();

  if (!state) {
    return <Navigate to="/courses" />;
  }

  async function handleDeleteCourse(e) {
    e.stopPropagation();

    const res = await deleteCourse(state._id);
    if (res?.error) {
      if (res?.error?.status === 403) {
        return navigate("/denied");
      }
      if (res?.error?.status === 401) {
        return navigate("/login");
      }
      toast.error(res?.error?.data?.message);
    }
    if (res?.data?.success) {
      toast.success("course delete successfully");
      navigate("/courses");
    }
  }

  return (
    <main className="description">
      <div className="container relative">
        <h1 className="title">{state.title}</h1>
        <div className="content">
          <div className="left">
            <img src={state?.thumbnail?.secure_url} />
            {isPurchased ? (
              <button
                className="btn btn-sm sm:btn-md"
                onClick={() => navigate(`/course/${state?._id}`)}
              >
                {t("Go To Course")}
              </button>
            ) : (
              <button
                className="btn btn-sm sm:btn-md"
                onClick={() => navigate(`/checkout`, { state })}
              >
                {t("Enroll Now")}
              </button>
            )}
          </div>
          <div className="right">
            <p className="desc">{state.description}</p>
            <p className="price">{state.price}₹</p>
            <p className="field">
              {t("category")}:<span>{state.category}</span>
            </p>
            <p className="field">
              {t("instructor")}:<span>{state.createdBy}</span>
            </p>
            <p className="field">
              {t("course access")}:
              <span>
                {state.expiry} {t("months")}
              </span>
            </p>
          </div>
        </div>
        {role && role === "ADMIN" && (
          <div className="absolute -top-10 right-0">
            <button
              className={`btn btn-sm btn-warning mr-3 `}
              onClick={() => navigate(`/course/update`, { state })}
            >
              {t("edit")}
            </button>
            <button
              className={`btn btn-sm btn-error ${isLoading && "btn-disabled"}`}
              onClick={(e) => handleDeleteCourse(e)}
            >
              {t("delete")}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default CourseDescription;
