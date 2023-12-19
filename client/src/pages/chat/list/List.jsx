import { useDispatch, useSelector } from "react-redux";

import {
  setAccount,
  setChatroomIdThunk,
} from "../../../redux/slices/chatSlice";

function List({ data, users }) {
  const dispatch = useDispatch();
  const activeUsers = useSelector((state) => state.chat.activeUsers);
  const unreadCounts = useSelector((state) => state.chat.unreadCounts);

  function setAccountFunc(user) {
    dispatch(
      setAccount({
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar?.secure_url,
        _id: user?._id,
      })
    );
    dispatch(setChatroomIdThunk(data?.user?._id));
  }
  

  return (
    <div className="">
      <div className="curr-user flex justify-center items-center gap-5 bg-[lightgreen] rounded-t-lg py-2">
        <img
          src={data?.user?.avatar?.secure_url}
          className="w-[45px] rounded-full"
        />
        <h1 className="text-2xl font-bold">{data?.user?.name}</h1>
      </div>
      <div className="chat-list h-[350px] overflow-y-auto">
        {users?.map(
          (user) =>
            data?.user?._id !== user?._id && (
              <div
                key={user?._id}
                className="relative flex gap-4 py-2 border border-b-0 cursor-pointer"
                onClick={() => setAccountFunc(user)}
              >
                <div className="relative">
                  {activeUsers.map(
                    (item) =>
                      item.userId === user?._id && (
                        <span
                          className="badge bg-[green] badge-xs absolute bottom-0 right-0"
                          key={user?._id}
                        ></span>
                      )
                  )}
                  <img
                    src={user?.avatar?.secure_url}
                    className="w-[40px] ms-4 rounded-full"
                  />
                </div>
                <h1 className="text-lg">{user?.name}</h1>
                {unreadCounts?.map(
                  (i) =>
                    user?._id === i?.user &&
                    i?.count >= 1 && (
                      <div
                        className="badge badge-success badge-sm absolute top-[30%] right-2"
                        key={user?._id}
                      >
                        {i?.count <= 0 ? "" : i?.count}
                      </div>
                    )
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default List;
