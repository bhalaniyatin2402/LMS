import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const lmsAuthApi = createApi({
    reducerPath: 'lmsAuth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/v1/user'
    }),
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => '/me'
        })
    })
})

export const { getUserInfo } = lmsAuthApi
