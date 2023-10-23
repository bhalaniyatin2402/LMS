import { lmsAuthApi } from "./lmsAuthApi";

export const lmsAdminApi = lmsAuthApi.injectEndpoints({
  endpoints: (build) => ({
    courseSellByUser: build.query({
      query: () => `/admin/courses-sell-by-user`,
      providesTags: [{ type: "User" }],
    }),
    coursesSellByCourse: build.query({
      query: () => `/admin/courses-sell-by-course`,
      providesTags: { type: "User" },
    }),
  }),
});

export const { useCourseSellByUserQuery, useCoursesSellByCourseQuery } =
  lmsAdminApi;
