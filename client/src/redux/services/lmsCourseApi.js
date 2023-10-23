import { lmsAuthApi } from "./lmsAuthApi";

export const lmsCourseApi = lmsAuthApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryList: build.query({
      query: () => `/course/category`,
      providesTags: [{ type: "Course" }],
    }),
    getInstructorList: build.query({
      query: () => "/course/instructor",
      providesTags: [{ type: "Course" }],
    }),
    getAllCorses: build.mutation({
      query: (data) => ({
        url: `/course/`,
        params: data,
      }),
      providesTags: [{ type: "Course" }],
    }),
    createCourse: build.mutation({
      query: (data) => ({
        url: `/course/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Course" }],
    }),
    updateCourse: build.mutation({
      query: ({ courseId, formData }) => ({
        url: `/course/?courseId=${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [{ type: "Course" }],
    }),
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/course/`,
        method: "DELETE",
        params: { courseId: id },
      }),
      invalidatesTags: [{ type: "Course" }],
    }),
    getLectures: build.mutation({
      query: (courseId) => `/course/${courseId}`,
      invalidatesTags: [{ type: "Course", id: "Lecture" }],
    }),
    addLecture: build.mutation({
      query: ({ courseId, formData }) => ({
        url: `/course/${courseId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Course", id: "Lecture" }],
    }),
    updateLecture: build.mutation({
      query: ({ courseId, lectureId, formData }) => ({
        url: `/course/${courseId}?lectureId=${lectureId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [{ type: "Course", id: "Lecture" }],
    }),
    removeLecture: build.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/course/${courseId}?lectureId=${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Course", id: "Lecture" }],
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
