import * as yup from "yup";

const validImagetype = ["image/jpg", "image/jpeg", "image/webp", "image/png"];

const validEmailAddress =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validPasswoed = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, "atleast 3 character required")
    .max(20, "must be 20 character or less")
    .required("please enter your name"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(validEmailAddress, "Invalid email address")
    .required("please enter your email"),
  password: yup
    .string()
    .min(6, "password atleast 6 character long")
    .max(16, "must 16 character or less")
    .matches(validPasswoed, "atleast a number and special character")
    .required("password is required"),
  avatar: yup
    .mixed()
    .nonNullable()
    .test(
      "FILE_TYPE",
      "unsupported file type",
      (value) => !value || (value && validImagetype.includes(value.type))
    )
    .test(
      "FILE_SIZE",
      "photo size exceed 500kb",
      (value) => !value || (value && value.size <= 512 * 1024)
    ),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("invlid email addresss")
    .matches(validEmailAddress, "invalid email address")
    .required("email is required"),
  password: yup
    .string()
    // .matches(validPasswoed, "invalid password")
    .required("password is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(6, "password atleast 6 character long")
    .max(16, "must 16 character or less")
    .matches(validPasswoed, "atleast a number and special character")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must matched"),
});

export const editProfileSchema = yup.object({
  name: yup
    .string("please enter valid name")
    .min(3, "atleast 3 character required")
    .max(20, "must be 20 character or less")
    .required("please enter your name"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(validEmailAddress, "Invalid email Address")
    .required("please enter your email"),
  avatar: yup
    .mixed()
    .nonNullable()
    .test(
      "FILE_TYPE",
      "unsupported file type",
      (value) => !value || (value && validImagetype.includes(value.type))
    )
    .test(
      "FILE_SIZE",
      "photo size less than 500kb",
      (value) => !value || (value && value.size <= 512 * 1024)
    ),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("old password is required"),
  newPassword: yup
    .string()
    .min(6, "password atleast 6 character long")
    .max(16, "must 16 character or less")
    .matches(validPasswoed, "atleast a number and special character")
    .required("new passwrd is required"),
});
