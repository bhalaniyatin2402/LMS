import { lmsAuthApi } from "./lmsAuthApi";

export const lmsPaymentApi = lmsAuthApi.injectEndpoints({
  endpoints: (build) => ({
    getApiKey: build.query({
      query: (courseId) => `/payment/getkey?courseId=${courseId}`,
      providesTags: [{ type: "User" }],
    }),
    checkout: build.mutation({
      query: (data) => ({
        url: `/payment/checkout`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
  }),
});

export const { useGetApiKeyQuery, useCheckoutMutation } = lmsPaymentApi;
