import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import FormInput from "../components/forms/FormInput";
import FormLayout from "../components/layouts/FormLayout";
import { resetPasswordSchema } from "../constants/formAuthSchema";
import { useResetPasswordMutation } from "../redux/services/lmsAuthApi";

function ResetPassword() {
  const resetToken = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { t } = useTranslation()

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const res = await resetPassword({ ...resetToken, data: values });
      console.log(res);
      if (res?.data?.success) {
        navigate("/");
        toast.success("password updated");
      } else {
        toast.error(res?.error?.data?.message);
      }
    },
  });

  return (
    <FormLayout title="Reset Password" onSubmit={handleSubmit}>
      <FormInput
        type="password"
        name="password"
        onChange={handleChange}
        values={values}
        touched={touched}
        errors={errors}
        placeholder="Enter Password"
      />
      <FormInput
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        values={values}
        touched={touched}
        errors={errors}
        placeholder="Confirm Password"
      />
      <button
        type="submit"
        className={`btn btn-sm btn-info mt-8 px-6 ${
          isLoading && "btn-disabled"
        }`}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        {t('Reset Password')}
      </button> 
    </FormLayout>
  );
}

export default ResetPassword;
