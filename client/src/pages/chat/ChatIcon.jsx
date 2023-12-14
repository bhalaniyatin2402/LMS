import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IoChatboxEllipses } from "react-icons/io5";

import ChatApp from "./ChatApp";
import socket from "../../../socket";
import { setActiveUsers, setUnreadCounts } from "../../redux/slices/chatSlice";
import { useGetUserDetailQuery } from "../../redux/services/lmsAuthApi";
import {
  useGetUnreadCountsListMutation,
  useGetUsersListQuery,
} from "../../redux/services/lmsChatApi";

function ChatIcon() {
  const dispatch = useDispatch();
  const { isLoading, data } = useGetUserDetailQuery();
  const { isLoading: loading, data: users } = useGetUsersListQuery();
  const [getUnreadCountList] = useGetUnreadCountsListMutation();

  async function handleUserConnect() {
    document.getElementById("my_modal_3").showModal();
    socket.connect();
    socket.emit("addUser", data?.user._id);
    const result = await getUnreadCountList(data?.user?._id);
    dispatch(setUnreadCounts(result?.data));
  }

  function handleUserDisconnect() {
    socket.disconnect();
    dispatch(setActiveUsers([]));
  }

  if (isLoading || loading) {
    return;
  }

  return (
    <>
      <div
        className="fixed right-5 bottom-4 flex justify-center items-center gap-2 text-2xl bg-purple-950 px-3 py-1 text-white rounded-xl cursor-pointer"
        onClick={handleUserConnect}
      >
        <IoChatboxEllipses className="text-xl" />
        chat
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-72 p-2 bg-[#ffffff]">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-0 top-1"
              onClick={handleUserDisconnect}
            >
              ✕
            </button>
          </form>
          <ChatApp data={data} users={users} />
        </div>
      </dialog>
    </>
  );
}

export default ChatIcon;
