import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import FormLayout from "../components/layouts/FormLayout";
import { useForgotPasswordMutation } from "../redux/services/lmsAuthApi";
import FormInput from "../components/forms/FormInput";

function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotpassword, { isLoading }] = useForgotPasswordMutation();
  const { t } = useTranslation()

  const { touched, values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
    },  
    onSubmit: async (values) => {
      const res = await forgotpassword({ email: values.email });
      if (res?.data?.success) {
        toast.success("email sent successfully");
        navigate("/");
      } else {
        toast.error(res?.error?.data?.message);
      }
    },
  });

  return (
    <>
      <FormLayout title="Forgot Password" onSubmit={handleSubmit}>
        <FormInput
          name="email"
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
          {t('Forgot Password')}
        </button>
      </FormLayout>
    </>
  );
}

export default ForgotPassword;
