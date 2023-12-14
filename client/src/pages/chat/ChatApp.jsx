import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "./list/List.jsx";
import Chat from "./chat/Chat.jsx";
import socket from "../../../socket.js";
import {
  setActiveUsers,
  incUnreadCounts,
} from "../../redux/slices/chatSlice.js";

function ChatApp({ data, users }) {
  const dispatch = useDispatch();
  const chatroom = useSelector((state) => state.chat.chatroomId);
  const [conversation, setConversation] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    socket.on("getUsers", (value) => {
      dispatch(setActiveUsers(value));
    });

    return () => {
      socket.off("getUsers");
    };
  }, []);

  useEffect(() => {
    socket.on("get message", (value) => {
      if (chatroom == value.chatroomId) {
        setNewMessages((messages) => [...messages, value]);
      }
      if (value.sender !== data?.user?._id) {
        dispatch(
          incUnreadCounts({
            user: value.sender,
            chatroomId: value.chatroomId,
          })
        );
      }
    });

    return () => socket.off("get message");
  }, [chatroom]);

  return (
    <>
      {!chatroom && (
        <List data={data} users={users} setConversation={setConversation} />
      )}
      {chatroom && (
        <Chat
          data={data}
          conversation={conversation}
          newMessages={newMessages}
          setConversation={setConversation}
          setNewMessages={setNewMessages}
        />
      )}
    </>
  );
}

export default ChatApp;
