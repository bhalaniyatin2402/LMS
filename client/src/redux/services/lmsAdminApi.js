import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setHeaders } from "./lmsAuthApi";

export const lmsAdminApi = createApi({
  reducerPath: "lmsAdmin",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/admin",
    credentials: "include",
    prepareHeaders: setHeaders(),
  }),
  endpoints: (build) => ({
    courseSellByUser: build.query({
      query: () => `/courses-sell-by-user`,
    }),
    coursesSellByCourse: build.query({
      query: () => `/courses-sell-by-course`,
    }),
  }),
});

export const { useCourseSellByUserQuery, useCoursesSellByCourseQuery } =
  lmsAdminApi;
