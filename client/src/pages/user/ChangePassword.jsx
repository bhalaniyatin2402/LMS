import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

import FormLayout from "../../components/layouts/FormLayout";
import FormInput from "../../components/forms/FormInput";
import { useChangePasswordMutation } from "../../redux/services/lmsAuthApi";
import { changePasswordSchema } from "../../constants/formAuthSchema";

function ChangePassword() {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { t } = useTranslation();

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, actions) => {
      const res = await changePassword(values);
      actions.resetForm();
      if (res?.error) toast.error(res?.error?.data?.message);
      if (res?.data?.success) {
        toast.success("password changed");
        navigate("/user/profile");
      }
    },
  });

  return (
    <FormLayout title="Change Password" onSubmit={handleSubmit}>
      <FormInput
        type="password"
        name="oldPassword"
        touched={touched}
        errors={errors}
        values={values}
        onChange={handleChange}
        placeholder="Enter Old Password"
      />
      <FormInput
        type="password"
        name="newPassword"
        touched={touched}
        errors={errors}
        values={values}
        onChange={handleChange}
        placeholder="Enter New Password"
      />
      <button
        type="submit"
        className={`btn btn-sm btn-info mt-8 px-6 ${
          isLoading && "btn-disabled"
        }`}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        {t("Change Password")}
      </button>
    </FormLayout>
  );
}

export default ChangePassword;
