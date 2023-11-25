import { lmsAuthApi } from "./lmsAuthApi";

export const lmsPaymentApi = lmsAuthApi.injectEndpoints({
  endpoints: (build) => ({
    checkout: build.mutation({
      query: (data) => ({
        url: `/payment/checkout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    verify: build.query({
      query: (data) => `/payment/verify?courseId=${data}`,
    }),
  }),
});

export const { useCheckoutMutation, useVerifyQuery } = lmsPaymentApi;
