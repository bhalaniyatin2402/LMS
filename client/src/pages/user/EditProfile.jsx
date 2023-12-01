import { BiEdit } from "react-icons/bi";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import FormLayout from "../../components/layouts/FormLayout";
import FormInput from "../../components/forms/FormInput";
import Loader from "../../components/ui/Loader";
import Home from "../Home";
import { editProfileSchema } from "../../constants/formAuthSchema";
import {
  useGetUserDetailQuery,
  useUpdateProfileMutation,
} from "../../redux/services/lmsAuthApi";

const dummyProfile =
  "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"

function EditProfile() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const { data, isLoading: loading, isError } = useGetUserDetailQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { t } = useTranslation()

  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        name: data?.user?.name,
        email: data?.user?.email,
        avatar: "",
      },
      validationSchema: editProfileSchema,
      onSubmit: async (values, actions) => {
        const formData = new FormData();
        for (const key in values) {
          if (values[key] === "") continue;
          formData.append(key, values[key]);
        }
        const res = await updateProfile(formData);
        actions.resetForm();
        setPreviewImage("");
        if (res?.error) toast.error(response?.error?.data?.message);
        if (res?.data?.success) {
          toast.success("profile updated");
          navigate("/user/profile");
        }
      },
    });

  if (loading) {
    return <Loader />;
  }
  if (isError) {
    return <Home />;
  }

  async function getImage(e) {
    e.preventDefault();

    const uploadImage = e.target.files[0];

    if (uploadImage) {
      const result = await setFieldValue("avatar", uploadImage);
      if (!result.avatar) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load", function () {
          setPreviewImage(this.result);
        });
      }
    } else {
      setPreviewImage("");
    }
  }

  return (
    <FormLayout title="Update Profile" onSubmit={handleSubmit}>
      <label htmlFor="avatar" id="avatarLabel">
        <span className="profile-image">
          {previewImage ? (
            <img src={previewImage} className="avatarImage" />
          ) : (
            <img
              src={
                data?.user?.avatar?.secure_url
                  ? data?.user?.avatar?.secure_url
                  : dummyProfile
              }
              className="avatarImage"
            />
          )}
          <BiEdit className="edit text-3xl absolute right-0 bottom-0 bg-red rounded-md" />
        </span>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={getImage}
          accept=".jpg, .jpeg, .png, .svg"
        />
      </label>
      {errors.avatar ? (
        <span className="text-sm text-red-900">{errors.avatar}</span>
      ) : null}
      <FormInput
        name="name"
        values={values}
        touched={touched}
        errors={errors}
        onChange={handleChange}
      />
      <FormInput
        name="email"
        values={values}
        touched={touched}
        errors={errors}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={`btn btn-sm btn-info mt-8 px-6 ${
          isLoading && "btn-disabled"
        }`}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        {t('Update Profile')}
      </button>
    </FormLayout>
  );
}

export default EditProfile;
