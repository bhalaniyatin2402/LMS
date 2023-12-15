import { useState } from "react";
import { useSelector } from "react-redux";
import { IoSendSharp } from "react-icons/io5";

import socket from "../../../../socket";

function ChatInput({ data }) {
  const [value, setValue] = useState("");
  const chat = useSelector((state) => state.chat);

  function handleSendMessage() {
    if (value) {
      socket.emit("send message", {
        senderId: data?.user?._id,
        receiverId: chat?.account?._id,
        chatroomId: chat?.chatroomId,
        content: value,
      });
      setValue("");
    }
  }

  return (
    <div className="w-[100%] flex justify-center items-center gap-2 p-1">
      <textarea
        type="text"
        className="border rounded-xl px-2 py-[2px] resize-none bg-[#ffffff]"
        placeholder="write your message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IoSendSharp
        className="text-3xl text-white cursor-pointer bg-[#3f133f] p-[5px] rounded-full mt-auto"
        onClick={handleSendMessage}
      />
    </div>
  );
}

export default ChatInput;
