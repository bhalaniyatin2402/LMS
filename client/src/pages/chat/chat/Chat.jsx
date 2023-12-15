import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

import Messages from "./Messages";
import ChatInput from "./ChatInput";
import {
  decUnreadCounts,
  setChatroomId,
} from "../../../redux/slices/chatSlice";
import { useDecUnreadCountMutation } from "../../../redux/services/lmsChatApi";

function Chat({ data }) {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const [decUnredCount] = useDecUnreadCountMutation();

  useEffect(() => {
    dispatch(
      decUnreadCounts({
        user: chat?.account?._id,
        chatroomId: chat?.chatroomId,
      })
    );
    (async function () {
      await decUnredCount({
        user: chat?.account?._id,
        chatroomId: chat?.chatroomId,
      });
    })();
  }, []);

  return (
    <div className="h-[400px]">
      <div className="flex items-center gap-2 bg-[hsl(120,73%,75%)] rounded-t-lg py-1">
        <FaArrowLeft
          className="cursor-pointer text-xl mx-2"
          onClick={() => {
            dispatch(setChatroomId(""));
          }}
        />
        <img src={chat?.account?.avatar} className="w-[40px] rounded-full" />
        <div className="chat-header">
          <h1 className="text-xl font-bold">{chat?.account?.name}</h1>
          <h2>
            {chat?.activeUsers.some((obj) => obj.userId === chat?.account._id)
              ? "online"
              : "offline"}
          </h2>
        </div>
      </div>
      <Messages data={data} />
      <ChatInput data={data} />
    </div>
  );
}

export default Chat;
