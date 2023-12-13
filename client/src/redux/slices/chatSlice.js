import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatroomId: "",
    activeUsers: [],
    account: {
      name: "",
      userId: "",
      avatar: "",
      _id: "",
    },
    unreadCounts: [],
  },
  reducers: {
    setChatroomId(state, action) {
      state.chatroomId = action.payload;
    },
    setActiveUsers(state, action) {
      state.activeUsers = action.payload;
    },
    setAccount(state, action) {
      state.account = action.payload;
    },
    setUnreadCounts(state, action) {
      state.unreadCounts = action.payload;
    },
    incUnreadCounts(state, action) {
      if (state.chatroomId !== action.payload.chatroomId) {
        const isExist = state.unreadCounts.findIndex(
          (item) => item.user === action.payload.user
        );
        if (isExist !== -1) {
          state.unreadCounts[isExist].count += 1;
        } else {
          state.unreadCounts.push({ user: action.payload.user, count: 1 });
        }
        fetch(
          `${
            import.meta.env.VITE_APP_COURSIFY_API
          }/api/v1/chat/unread-counts/inc`,
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: action.payload.user,
              chatroomId: action.payload.chatroomId,
            }),
          }
        );
      }
    },
    decUnreadCounts(state, action) {
      if (state.chatroomId === action.payload.chatroomId) {
        const isExist = state.unreadCounts.findIndex(
          (item) => item.user === action.payload.user
        );
        if (isExist !== -1) {
          state.unreadCounts[isExist].count = 0;
        } else {
          state.unreadCounts.push({ user: action.payload.user, count: 0 });
        }
      }
    },
  },
});

export default chatSlice.reducer;
export const {
  setChatroomId,
  setActiveUsers,
  setAccount,
  setUnreadCounts,
  incUnreadCounts,
  decUnreadCounts,
} = chatSlice.actions;
