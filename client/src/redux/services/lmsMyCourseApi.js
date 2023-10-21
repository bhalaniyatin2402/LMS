import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setHeaders } from "./lmsAuthApi";

export const lmsMyCourseApi = createApi({
  reducerPath: "lmsMyCourse",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/my-course",
    credentials: "include",
    prepareHeaders: setHeaders(),
  }),
  endpoints: (build) => ({
    getMyCourseList: build.query({
      query: () => "/",
    }),
    getLectureProgress: build.query({
      query: (courseId) => `/${courseId}`,
      providesTags: ["Progress"],
    }),
    updateLectureMark: build.mutation({
      query: ({ courseId, lectureId, checked }) => ({
        url: `/${courseId}?lectureId=${lectureId}`,
        method: "PUT",
        body: { checked },
      }),
      invalidatesTags: ["Progress"],
    }),
    addNote: build.mutation({
      query: ({ courseId, lectureId, note }) => ({
        url: `/${courseId}?lectureId=${lectureId}`,
        method: "POST",
        body: { note },
      }),
      invalidatesTags: ["Progress"],
    }),
    deleteNote: build.mutation({
      query: ({ courseId, lectureId, noteIndex }) => ({
        url: `/${courseId}?lectureId=${lectureId}`,
        method: "DELETE",
        body: { noteIndex },
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const {
  useGetMyCourseListQuery,
  useGetLectureProgressQuery,
  useUpdateLectureMarkMutation,
  useAddNoteMutation,
  useDeleteNoteMutation,
} = lmsMyCourseApi;
