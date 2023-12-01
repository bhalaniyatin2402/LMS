import * as yup from "yup";

const validImagetype = ["image/jpg", "image/jpeg", "image/webp", "image/png"];
const validVideoType = ["video/mp3", "video/mp4"];

export const createCourseSchema = yup.object({
  title: yup
    .string()
    .min(5, "atleast 5 character required")
    .max(50, "must be 50 character or less")
    .required("title is required"),
  description: yup
    .string()
    .min(8, "atleast 8 character required")
    .max(500, "must be 500 character or less")
    .required("description is required"),
  createdBy: yup.string().required("instructor name is required"),
  category: yup.string().required("course category is required"),
  price: yup.number().required("price is required"),
  expiry: yup.number().required("course duration is required"),
  thumbnail: yup
    .mixed()
    .nonNullable()
    .required()
    .test(
      "FILE_TYPE",
      "unsupported file type",
      (value) => value && validImagetype.includes(value.type)
    )
    .test(
      "FILE_SIZE",
      "photo size exceed 500kb",
      (value) => value && value.size <= 512 * 1024
    ),
});

export const updateCourseSchema = yup.object({
  title: yup
    .string()
    .min(5, "atleast 5 character required")
    .max(50, "must be 50 character or less"),
  description: yup
    .string()
    .min(8, "atleast 8 character required")
    .max(500, "must be 500 character or less"),
  createdBy: yup.string(),
  category: yup.string(),
  price: yup.number(),
  expiry: yup.number(),
  thumbnail: yup
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

export const addLectureSchema = yup.object({
  lecture: yup
    .mixed()
    .required("please upload video.")
    .nonNullable()
    .test(
      "FILE_TYPE",
      "unsupported file type",
      (value) => value && validVideoType.includes(value.type)
    )
    .test(
      "FILE_SIZE",
      "video size exceed 10mb",
      (value) => value && value.size <= 10 * 1024 * 1024
    ),
  name: yup
    .string()
    .min(8, "atleast 5 character required")
    .max(40, "must be 50 character or less")
    .required("name is required"),
  description: yup
    .string()
    .min(40, "atleast 40 character required")
    .max(200, "must be 200 character or less")
    .required("description is required"),
});

export const updateLectureSchema = yup.object({
  lecture: yup
    .mixed()
    .nonNullable()
    .test(
      "FILE_TYPE",
      "unsupported file type",
      (value) => !value || (value && validVideoType.includes(value.type))
    )
    .test(
      "FILE_SIZE",
      "video size exceed 10mb",
      (value) => !value || (value && value.size <= 10 * 1024 * 1024)
    ),
  name: yup
    .string()
    .min(8, "atleast 5 character required")
    .max(40, "must be 40 character or less"),
  description: yup
    .string()
    .min(40, "atleast 40 character required")
    .max(200, "must be 200 character or less"),
});
