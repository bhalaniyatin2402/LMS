import { lmsAuthApi } from "./lmsAuthApi";

export const lmsMyCourseApi = lmsAuthApi.injectEndpoints({
  endpoints: (build) => ({
    getMyCourseList: build.query({
      query: () => "/my-course/",
      providesTags: ["User"],
    }),
    getLectureProgress: build.query({
      query: (courseId) => `/my-course/${courseId}`,
      providesTags: [{ type: "User", id: "Progress" }],
    }),
    updateLectureMark: build.mutation({
      query: ({ courseId, lectureId, checked }) => ({
        url: `/my-course/${courseId}?lectureId=${lectureId}`,
        method: "PUT",
        body: { checked },
      }),
      invalidatesTags: [{ type: "User", id: "Progress" }],
    }),
    addNote: build.mutation({
      query: ({ courseId, lectureId, note }) => ({
        url: `/my-course/${courseId}?lectureId=${lectureId}`,
        method: "POST",
        body: { note },
      }),
      invalidatesTags: [{ type: "User", id: "Progress" }],
    }),
    deleteNote: build.mutation({
      query: ({ courseId, lectureId, noteIndex }) => ({
        url: `/my-course/${courseId}?lectureId=${lectureId}`,
        method: "DELETE",
        body: { noteIndex },
      }),
      invalidatesTags: [{ type: "User", id: "Progress" }],
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
