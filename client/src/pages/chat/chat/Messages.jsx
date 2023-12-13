function Messages({ data, conversation, newMessages }) {
  return (
    <div className="h-[296px] overflow-y-auto">
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
      {newMessages?.length !== 0 &&
        newMessages?.map((message) =>
          message.sender === data?.user?._id ? (
            <div className="py-1 flex justify-end" key={message?._id}>
              <div className="inline-block max-w-[80%] px-2 py-1 rounded-md bg-[#EFEAE2] leading-4 text-md">
                {message?.content}
              </div>
            </div>
          ) : (
            <div className="py-1" key={message?._id}>
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
