import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const setHeaders = (headers) => {
  const token = Cookies.get("token");

  if (token) {
    return { Authorization: `Bearer token=${token}` };
  }
};

export const lmsAuthApi = createApi({
  reducerPath: "lmsAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/user",
    credentials: "include",
    headers: setHeaders(),
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (res) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", "USER");
        return res;
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", response?.role);
        return response;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
      }),
      transformResponse: (res) => {
        localStorage.clear();
        return res;
      },
    }),
    getUserDetail: builder.query({
      query: () => ({
        url: "/me",
      }),
      providesTags: ["Me"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/reset",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetToken, data }) => ({
        url: `/reset/${resetToken}`,
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/change-password`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/me`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Me"],
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
