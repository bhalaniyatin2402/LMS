import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FaWindowClose } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import FormLayout from "../../components/layouts/FormLayout";
import FormInput from "../../components/forms/FormInput";
import { useUpdateLectureMutation } from "../../redux/services/lmsCourseApi";
import { updateLectureSchema } from "../../constants/formCourseSchema";
import AddVideo from "../../assets/addImage.png";

function UpdateLecture() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [updateLecture, { isLoading }] = useUpdateLectureMutation();
  const { t } = useTranslation()
  const [previewVideo, setPreviewVideo] = useState(
    state?.lecture?.lecture?.secure_url
  );

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        lecture: "",
        name: state.lecture.name,
        description: state.lecture.description,
      },
      validationSchema: updateLectureSchema,
      onSubmit: async (values, actions) => {
        const formData = new FormData();
        for (const key in values) {
          if (values[key] === "") continue;
          formData.append(key, values[key]);
        }
        const res = await updateLecture({
          courseId: state.courseId,
          lectureId: state.lecture._id,
          formData,
        });
        actions.resetForm();
        setPreviewVideo("");
        if (res?.error) {
          toast.error(res?.error?.data?.message);
        }
        if (res?.data?.success) {
          toast.success("lecture updated successfully");
          navigate(-1);
        }
      },
    });

  if (state.courseId === null || !state.lecture) {
    return <Navigate to={`/courses/${state.courseId}`} />;
  }

  async function getVideo(e) {
    const uploadVideo = e.target.files[0];

    if (uploadVideo) {
      const res = await setFieldValue("lecture", uploadVideo);
      if (!res.lecture) {
        const source = window.URL.createObjectURL(uploadVideo);
        setPreviewVideo(source);
      } else {
        setPreviewVideo("");
      }
    }
  }

  return (
    <FormLayout title="Update Lecture" onSubmit={handleSubmit} classname="my-6">  
      <div className="video w-[70%] h-[140px] sm:h-[180px] relative">
        {previewVideo ? (
          <>
            <video
              muted
              src={previewVideo}
              controls
              controlsList="nodownload nofullscreen"
              disablePictureInPicture
              className="h-full w-[100%]"
            ></video>
            <FaWindowClose
              className="absolute z-20 top-0 -right-9 text-3xl text-red-900 cursor-pointer"
              onClick={() => {
                setFieldValue("lecture", "");
                setPreviewVideo("");
              }}
            />
          </>
        ) : (
          <label htmlFor="lecture">
            <img
              src={AddVideo}
              className="w-[100%] h-full border border-black m-auto cursor-pointer rounded-lg"
            />
            <input
              type="file"
              id="lecture"
              className="hidden"
              onChange={getVideo}
            />
          </label>
        )}
      </div>
      {errors.lecture ? (
        <span className="text-sm mr-auto text-red-900 w-auto sm:w-[270px]">
          {t(`${errors.lecture}`)}
        </span>
      ) : null}
      <FormInput
        type="text"
        name="name"
        values={values}
        errors={errors}
        touched={touched}
        onChange={handleChange}
        placeholder="Enter Lecture Name"
      />
      <textarea
        name="description"
        className="w-[80vw] sm:w-[350px] h-[70px] resize-none bg-white border border-[#3ABFF8] input-info mt-3 rounded-lg px-3 py-1 text-lg tracking-wider"
        placeholder={t("lecture Description")}
        onChange={handleChange}
        value={values.description}
      ></textarea>
      {touched.description && errors.description ? (
        <span className="text-sm mr-auto text-red-900 w-auto sm:w-[270px]">
          {t(`${errors.description}`)}
        </span>
      ) : null}
      <button
        type="submit"
        className={`btn btn-sm btn-info mt-8 px-6 ${
          isLoading && "btn-disabled"
        }`}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        {t('Update Lecture')}
      </button>
    </FormLayout>
  );
}

export default UpdateLecture;
