import { lmsAuthApi } from "./lmsAuthApi";

const lmsChatApi = lmsAuthApi.injectEndpoints({
  endpoints: (build) => ({
    getChatroomId: build.mutation({
      query: (data) => ({
        url: "/chat/chatroom/get",
        method: "POST",
        body: data,
      }),
    }),
    getConversaton: build.mutation({
      query: (data) => ({
        url: "/chat/messages/get",
        method: "POST",
        body: data,
      }),
    }),
    getUsersList: build.query({
      query: () => `/chat/users/list`,
    }),
    getUnreadCountsList: build.mutation({
      query: (id) => ({
        url: `/chat//unread-counts/get`,
        method: "POST",
        body: { senderId: id },
      }),
    }),
    incUnreadCount: build.mutation({
      query: (data) => ({
        url: `/chat/unread-counts/inc`,
        method: "POST",
        body: data,
      }),
    }),
    decUnreadCount: build.mutation({
      query: (data) => ({
        url: `/chat/unread-counts/dec`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetChatroomIdMutation,
  useGetConversatonMutation,
  useGetUsersListQuery,
  useGetUnreadCountsListMutation,
  useIncUnreadCountMutation,
  useDecUnreadCountMutation,
} = lmsChatApi;
