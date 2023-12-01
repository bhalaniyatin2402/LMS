import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { useTranslation } from "react-i18next";

import FormInput from "../components/forms/FormInput";
import FormLayout from "../components/layouts/FormLayout";
import { registerSchema } from "../constants/formAuthSchema";
import { setCredentials } from "../redux/slices/AuthSlice";
import { useRegisterMutation } from "../redux/services/lmsAuthApi";
import "../styles/pages/Register.scss";

const ProfileImage =
  "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const { t } = useTranslation()

  const { values, errors, touched, setFieldValue, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        avatar: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values, actions) => {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        const response = await register(formData);
        actions.resetForm();
        setPreviewImage("");
        if (response?.error) toast.error(response?.error?.data?.message);
        if (response?.data?.success) {
          toast.success("register successsfullly");
          dispatch(
            setCredentials({
              isLoggedIn: true,
              role: "USER",
            })
          );
          navigate("/");
        }
      },
    });

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
      } else {
        setPreviewImage("");
      }
    }
  }

  return (
    <>
      <FormLayout onSubmit={handleSubmit} title="Register Form">
        <label htmlFor="avatar" id="avatarLabel">
          <span className="profile-image">
            {previewImage ? (
              <img src={previewImage} className="avatarImage" />
            ) : (
              <img src={ProfileImage} className="avatarImage" />
            )}
            <BiEdit className="edit" />
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
          <span className="text-sm text-red-900">{t(`${errors.avatar}`)}</span>
        ) : null}
        <FormInput
          name="name"
          onChange={handleChange}
          values={values}
          touched={touched}
          errors={errors}
        />
        <FormInput
          name="email"
          onChange={handleChange}
          values={values}
          touched={touched}
          errors={errors}
        />
        <FormInput
          name="password"
          onChange={handleChange}
          values={values}
          touched={touched}
          errors={errors}
        />
        <button
          type="submit"
          className={`btn btn-sm btn-info mt-8 px-6 ${
            isLoading && "btn-disabled"
          }`}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          {t('Register')}
        </button>
      </FormLayout>
      <p className="loginlink">
        {t('Already have an Account')} ? &nbsp;
        <Link to="/login" className="link text-blue-950">
          {t('Login')}
        </Link>
      </p>
    </>
  );
}

export default Register;
