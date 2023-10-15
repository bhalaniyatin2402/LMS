import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setHeaders } from "./lmsAuthApi";

export const lmsPaymentApi = createApi({
  reducerPath: "lmsPayment",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/payment",
    credentials: "include",
    prepareHeaders: setHeaders(),
  }),
  endpoints: (build) => ({
    getApiKey: build.query({
      query: (courseId) => `/getkey?courseId=${courseId}`,
    }),
    checkout: build.mutation({
      query: (data) => ({
        url: `/checkout`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetApiKeyQuery, useCheckoutMutation } = lmsPaymentApi;
