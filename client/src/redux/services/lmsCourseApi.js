import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setHeaders } from "./lmsAuthApi";

export const lmsCourseApi = createApi({
  reducerPath: "lmsCourse",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/api/v1/course`,
    credentials: "include",
    headers: setHeaders(),
  }),
  endpoints: (build) => ({
    getCategoryList: build.query({
      query: () => `/category`,
    }),
    getInstructorList: build.query({
      query: () => "/instructor",
    }),
    getAllCorses: build.mutation({
      query: (data) => ({
        url: `/`,
        params: data,
      }),
      providesTags: ["Course"],
    }),
    createCourse: build.mutation({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: build.mutation({
      query: ({ courseId, formData }) => ({
        url: `/?courseId=${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/`,
        method: "DELETE",
        params: { courseId: id },
      }),
      invalidatesTags: ["Course"],
    }),
    getLectures: build.mutation({
      query: (courseId) => `/${courseId}`,
    }),
    addLecture: build.mutation({
      query: ({ courseId, formData }) => ({
        url: `/${courseId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Lecture"],
    }),
    updateLecture: build.mutation({
      query: ({ courseId, lectureId, formData }) => ({
        url: `/${courseId}?lectureId=${lectureId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Lecture"],
    }),
    removeLecture: build.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}?lectureId=${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lecture"],
    }),
  }),
});

export const {
  useGetCategoryListQuery,
  useGetInstructorListQuery,
  useGetAllCorsesMutation,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetLecturesMutation,
  useAddLectureMutation,
  useUpdateLectureMutation,
  useRemoveLectureMutation,
} = lmsCourseApi;
