import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import FormInput from "../components/forms/FormInput";
import FormLayout from "../components/layouts/FormLayout";
import { loginSchema } from "../constants/formAuthSchema";
import { useLoginMutation } from "../redux/services/lmsAuthApi";
import { setCredentials } from "../redux/slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { t } = useTranslation();

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      actions.resetForm();
      if (response?.error) toast.error(response?.error?.data?.message);
      if (response?.data?.success) {
        toast.success("login succesful");
        dispatch(
          setCredentials({
            isLoggedIn: true,
            role: response?.data?.role,
          })
        );
        navigate("/");
      }
    },
  });

  return (
    <>
      <FormLayout title="Login Form" onSubmit={handleSubmit}>
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
          {t("Login")}
        </button>
      </FormLayout>
      <div className="flex gap-1 flex-col justify-center items-center bg-[#e5e6e6]">
        <Link to="/register" className="link text-blue-950">
          {t("Create New Account")}
        </Link>
        <Link to="/forgot/password" className="link text-blue-950 mb-[10px]">
          {t("Forgot Password")}?
        </Link>
      </div>
    </>
  );
}

export default Login;
