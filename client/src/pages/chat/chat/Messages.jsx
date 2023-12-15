import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Messages({ data }) {
  const scrollRef = useRef(null);
  const chatroomId = useSelector((state) => state.chat.chatroomId);
  const conversation = useSelector(
    (state) => state.chat.conversations[chatroomId]
  );

  useEffect(() => {
    const lastChild =
      scrollRef.current?.children[scrollRef.current.children?.length - 1];
    lastChild?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [conversation]);

  return (
    <div className="h-[296px] overflow-y-auto" ref={scrollRef}>
      {conversation?.length !== 0 &&
        conversation?.map((message) =>
          message.sender === data?.user?._id ? (
            <div className="py-1 flex justify-end mx-1" key={message?._id}>
              <div className="inline-block max-w-[80%] px-2 py-1 rounded-md bg-[#EFEAE2] leading-4 text-md">
                {message?.content}
              </div>
            </div>
          ) : (
            <div className="py-1 mx-1" key={message?._id}>
              <div className="inline-block max-w-[80%] px-2 py-1 rounded-md bg-[#a7ee9a] leading-4 text-md">
                {message?.content}
              </div>
            </div>
          )
        )}
    </div>
  );
}

export default Messages;
