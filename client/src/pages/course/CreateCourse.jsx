import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import FormLayout from "../../components/layouts/FormLayout";
import FormInput from "../../components/forms/FormInput";
import { useCreateCourseMutation } from "../../redux/services/lmsCourseApi";
import { createCourseSchema } from "../../constants/formCourseSchema";
import AddImage from "../../assets/addImage.png";
import "../../styles/pages/course/CreateCourse.scss";

function CreateCourse() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState();
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const { t } = useTranslation()

  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",  
        description: "",
        category: "",
        createdBy: "",
        price: "",
        expiry: "",
        thumbnail: "",
      },
      validationSchema: createCourseSchema,
      onSubmit: async (values, actions) => {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        const res = await createCourse(formData);
        actions.resetForm();
        setPreviewImage("");
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
          toast.success("course created successfully");
          navigate("/courses");
        }
      },
    });

  function getImage(e) {
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      const res = setFieldValue("thumbnail", uploadImage);
      if (!res.thumbnail) {
        const filereader = new FileReader();
        filereader.readAsDataURL(uploadImage);
        filereader.addEventListener("load", function () {
          setPreviewImage(this.result);
        });
      } else {
        setFieldValue(null);
      }
    }
  }

  return (
    <FormLayout
      onSubmit={handleSubmit}
      title="Create New Course"
      className="w-[80%] sm:w-[60%] md:w-[700px]"
      classname="my-[140px] md:my-12"
    >
      <div className="create-course">
        <div className="left">
          <label htmlFor="thumbnail">
            <img src={previewImage ? previewImage : AddImage} alt="" />
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={getImage}
              className="hidden"
              accept=".jpg, .jpeg, .png, .webp"
            />
            {touched.thumbnail && errors.thumbnail ? (
              <span className="text-sm mr-auto text-red-900 w-auto sm:w-[270px]">
                {t(`${errors.thumbnail}`)}
              </span>
            ) : null}
          </label>
          <FormInput
            type="text"
            name="title"
            onChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            placeholder="Course Title"
          />
        </div>
        <div className="right">
          <FormInput
            type="text"
            name="createdBy"
            onChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            placeholder="Course Instructor"
          />
          <FormInput
            type="text"
            name="category"
            onChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            placeholder="Course Category"
          />
          <FormInput
            type="text"
            name="price"
            onChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            placeholder="Course Price in INR"
          />
          <FormInput
            type="text"
            name="expiry"
            onChange={handleChange}
            values={values}
            touched={touched}
            errors={errors}
            placeholder="Course Duration in Months"
          />
          <textarea
            name="description"
            className="md:w-300 resize-none bg-white border border-[#3ABFF8] input-info"
            placeholder={t('Course Description')}
            onChange={handleChange}
            value={values.description}
          ></textarea>
          {touched.description && errors.description ? (
            <span className="text-sm mr-auto text-red-900 w-auto sm:w-[270px]">
              {t(`${errors.description}`)}
            </span>
          ) : null}
        </div>
      </div>
      <button
        type="submit"
        className={`btn btn-sm btn-info mt-8 px-6 ${
          isLoading && "btn-disabled"
        }`}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        {t('Create course')}
      </button>
    </FormLayout>
  );
}

export default CreateCourse;
