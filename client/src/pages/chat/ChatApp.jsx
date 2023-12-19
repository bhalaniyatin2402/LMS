import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "./list/List.jsx";
import Chat from "./chat/Chat.jsx";
import socket from "../../../socket.js";
import {
  setActiveUsers,
  incUnreadCounts,
  updateConversations,
} from "../../redux/slices/chatSlice.js";
import { useIncUnreadCountMutation } from "../../redux/services/lmsChatApi.js";
import Loader from "../../components/ui/Loader.jsx";

function ChatApp({ data, users, isLoading }) {
  const dispatch = useDispatch();
  const chatroom = useSelector((state) => state.chat.chatroomId);
  const [incUnreadCount] = useIncUnreadCountMutation();

  useEffect(() => {
    socket.on("getUsers", (value) => {
      dispatch(setActiveUsers(value));
    });

    return () => {
      socket.off("getUsers");
    };
  }, []);

  useEffect(() => {
    socket.on("get message", async (value) => {
      dispatch(updateConversations(value));
      if (value.sender !== data?.user?._id) {
        if (chatroom !== value.chatroomId) {
          dispatch(
            incUnreadCounts({
              user: value.sender,
              chatroomId: value.chatroomId,
            })
          );
          await incUnreadCount({
            user: value.sender,
            chatroomId: value.chatroomId,
          });
        }
      }
    });

    return () => socket.off("get message");
  }, [chatroom]);

  if(isLoading) {
    return <Loader classname='h-[300px]' />
  }

  return (
    <>
      {!chatroom && <List data={data} users={users} />}
      {chatroom && <Chat data={data} />}
    </>
  );
}

export default ChatApp;
