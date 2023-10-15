import {
  useNavigate,
  Navigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import toast from "react-hot-toast";

import { useDeleteCourseMutation } from "../../redux/services/lmsCourseApi";
import "../../styles/pages/course/CourseDescription.scss";

function CourseDescription() {
  const role = useOutletContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();

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
            {/* <button
              className="btn btn-sm sm:btn-md"
              onClick={() => navigate(`/course/${state?._id}`)}
            >
              Go To Course
            </button> */}
            <button
              className="btn btn-sm sm:btn-md"
              onClick={() => navigate(`/checkout`, { state })}
            >
              Enroll Now
            </button>
          </div>
          <div className="right">
            <p className="desc">{state.description}</p>
            <p className="price">{state.price}₹</p>
            <p className="field">
              category:
              <span>{state.category}</span>
            </p>
            <p className="field">
              instructor:
              <span>{state.createdBy}</span>
            </p>
            <p className="field">
              course Access:
              <span>{state.expiry} Months</span>
            </p>
          </div>
        </div>
        {role && role === "ADMIN" && (
          <div className="absolute -top-10 right-0">
            <button
              className={`btn btn-sm btn-warning mr-3 `}
              onClick={() => navigate(`/course/update`, { state })}
            >
              EDIT
            </button>
            <button
              className={`btn btn-sm btn-error ${isLoading && "btn-disabled"}`}
              onClick={(e) => handleDeleteCourse(e)}
            >
              DELETE
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default CourseDescription;
