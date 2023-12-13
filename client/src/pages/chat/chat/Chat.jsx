import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { setChatroomId } from "../../../redux/slices/chatSlice";

function Chat({
  data,
  conversation,
  newMessages,
  setConversation,
  setNewMessages,
}) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.chat.account);
  const activeUsers = useSelector((state) => state?.chat?.activeUsers);

  return (
    <div className="h-[400px]">
      <div className="flex items-center gap-2 bg-[hsl(120,73%,75%)] rounded-t-lg py-1">
        <FaArrowLeft
          className="cursor-pointer text-xl mx-2"
          onClick={() => {
            dispatch(setChatroomId(""));
            setConversation([]);
            setNewMessages([]);
          }}
        />
        <img src={account?.avatar} className="w-[40px] rounded-full" />
        <div className="chat-header">
          <h1 className="text-xl font-bold">{account?.name}</h1>
          <h2>
            {activeUsers.some((obj) => obj.userId === account._id)
              ? "online"
              : "offline"}
          </h2>
        </div>
      </div>
      <Messages
        data={data}
        conversation={conversation}
        newMessages={newMessages}
      />
      <ChatInput data={data} />
    </div>
  );
}

export default Chat;
