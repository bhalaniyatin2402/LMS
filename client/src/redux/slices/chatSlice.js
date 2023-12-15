import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatroomId: "",
    account: {
      name: "",
      userId: "",
      avatar: "",
      _id: "",
    },
    activeUsers: [],
    unreadCounts: [],
    conversations: {},
    chatroomList: [],
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
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    updateConversations(state, action) {
      state.conversations[action.payload.chatroomId].push(action.payload);
    },
    setChatroomList(state, action) {
      state.chatroomList = action.payload;
    },
    updateChatroomList(state, action) {
      console.log(action.payload);
      state.chatroomList.push(action.payload);
      state.conversations[action.payload._id] = [];
    },
    setUnreadCounts(state, action) {
      state.unreadCounts = action.payload;
    },
    incUnreadCounts(state, action) {
      const isExist = state.unreadCounts.findIndex(
        (item) => item.user === action.payload.user
      );
      if (isExist !== -1) {
        state.unreadCounts[isExist].count += 1;
      } else {
        state.unreadCounts.push({ user: action.payload.user, count: 1 });
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
    clearChatroomState(state, action) {
      return {
        chatroomId: "",
        account: {
          name: "",
          userId: "",
          avatar: "",
          _id: "",
        },
        activeUsers: [],
        unreadCounts: [],
        conversations: {},
        chatroomList: [],
      };
    },
  },
});

export default chatSlice.reducer;
export const {
  setChatroomId,
  setActiveUsers,
  setAccount,
  setConversations,
  updateConversations,
  setChatroomList,
  updateChatroomList,
  setUnreadCounts,
  incUnreadCounts,
  decUnreadCounts,
  clearChatroomState,
} = chatSlice.actions;

export function setChatroomIdThunk(senderId) {
  return async function (dispatch, getState) {
    let isChatroomExist;
    for (let key of getState().chat.chatroomList) {
      if (
        key.participants.includes(senderId) &&
        key.participants.includes(getState().chat.account._id)
      ) {
        isChatroomExist = true;
        dispatch(setChatroomId(key._id));
        break;
      }
    }
    if (!isChatroomExist) {
      fetch(
        `${import.meta.env.VITE_APP_COURSIFY_API}/api/v1/chat/chatroom/create`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId,
            receiverId: getState().chat.account._id,
          }),
        }
      )
        .then((e) => e.json())
        .then((res) => {
          dispatch(setChatroomId(res.chatroomId));
          dispatch(
            updateChatroomList({
              _id: res.chatroomId,
              participants: [senderId, getState().chat.account._id],
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };
}
