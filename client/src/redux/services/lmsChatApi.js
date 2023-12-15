import { lmsAuthApi } from "./lmsAuthApi";

const lmsChatApi = lmsAuthApi.injectEndpoints({
  endpoints: (build) => ({
    createChatroomId: build.mutation({
      query: (data) => ({
        url: "/chat/chatroom/create",
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
    getAllConversationsOfUser: build.mutation({
      query: (id) => `/chat/conversations/get?userId=${id}`,
    }),
  }),
});

export const {
  useCreateChatroomIdMutation,
  useGetUsersListQuery,
  useGetUnreadCountsListMutation,
  useIncUnreadCountMutation,
  useDecUnreadCountMutation,
  useGetAllConversationsOfUserMutation,
} = lmsChatApi;
