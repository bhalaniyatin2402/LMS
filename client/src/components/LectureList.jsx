import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import toast from "react-hot-toast";

import { useRemoveLectureMutation } from "../redux/services/lmsCourseApi";

function LectureList({
  currentLecture,
  setCurrentLecture,
  lectures,
  role,
  getLecture,
}) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [removeLectureId, setRemoveLectureId] = useState("");
  const [removeLecture, { isLoading }] = useRemoveLectureMutation();

  async function handleRemoveLecture(e, lectureId) {
    const res = await removeLecture({ courseId, lectureId });
    if (res?.error) {
      if (res?.error?.status === 403) {
        return toast.error("access denied to remove lecture");
      }
      toast.error(res?.error?.data?.message);
    }
    if (res?.data?.success) {
      toast.success("lecture removed successfully");
      getLecture(courseId);
    }
    setRemoveLectureId(null);
  }

  return (
    <>
      {lectures &&
        lectures.map((lecture, index) => (
          <div
            className={`relative border-b border-b-red-900 p-3 ps-7 mt-2 cursor-pointer`}
            onClick={() => {
              setCurrentLecture(index);
              window.localStorage.setItem(courseId, index);
            }}
            key={index}
          >
            <input
              type="checkbox"
              className="absolute top-[50%] -translate-y-[50%] left-[6px] text-xl"
            />
            <p className="text-xl">
              <span className="fon font-semibold">{index + 1}.</span>
              <span
                className={`${
                  currentLecture === index && "text-purple-950 font-semibold"
                }`}
              >
                {lecture.name}
              </span>
            </p>
            {role === "ADMIN" && (
              <>
                <button
                  onClick={(e) => {
                    setRemoveLectureId(lecture._id);
                    handleRemoveLecture(e, lecture._id);
                  }}
                  className={`btn btn-xs btn-error text-white ${
                    isLoading && removeLectureId === lecture.id
                      ? "btn-disabled"
                      : ""
                  }`}
                >
                  {isLoading && removeLectureId === lecture._id && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Remove Lecture
                </button>
                <div
                  className="absolute top-4 right-5 cursor-pointer border border-black rounded p-[2px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/course/lecture/update", {
                      state: { courseId, lecture },
                    });
                  }}
                >
                  <BiEditAlt className="text-2xl" />
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
}

export default LectureList;
