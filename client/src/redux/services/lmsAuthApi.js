import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lmsAuthApi = createApi({
  reducerPath: "lmsAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_COURSIFY_API}/api/v1`,
    credentials: "include"
  }),
  tagTypes: ["User", "Course"],
  endpoints: (builder) => ({
    register: builder.mutation({    
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", "USER");
        return res;
      },
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", response?.role);
        return response;
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
      }),
      transformResponse: (res) => {
        localStorage.clear();
        return res;
      },
      invalidatesTags: ["User"],
    }),
    getUserDetail: builder.query({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetToken, data }) => ({
        url: `/user/reset/${resetToken}`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/user/change-password`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/user/me`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = lmsAuthApi;
