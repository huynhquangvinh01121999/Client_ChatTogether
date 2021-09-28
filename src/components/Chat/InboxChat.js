import React, { useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from "../../Context/ChatProvider";

export default function InboxChat() {
  const { setMessages, setUserInbox, setIsShowChatBox } =
    useContext(ChatContext);
  const { userInfo } = useContext(AuthContext);
  const users = useSelector((state) => state.users.data);
  const listMessage = useSelector((state) => state.messages.data);

  const handleClickInbox = useCallback(
    (user) => {
      const resultMessageOfUserFirst = listMessage.filter(
        (message) =>
          message.FromUser === user.UserName || message.ToUser === user.UserName
      );

      setUserInbox({
        ClientId: user.ClientId,
        UserName: user.UserName,
      });
      setMessages(resultMessageOfUserFirst);
      setIsShowChatBox(false);

      // localStorage.setItem(
      //   PREX + "userInbox",
      //   JSON.stringify({
      //     ClientId: user.ClientId,
      //     UserName: user.UserName,
      //   })
      // );
    },
    [setMessages, setUserInbox, listMessage]
  );

  return (
    <>
      <div className="col-12 col-lg-5 col-xl-3 border-right">
        <div className="px-4 d-none d-md-block">
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <input
                type="text"
                className="form-control my-3"
                placeholder="Tìm kiếm bạn bè..."
              />
            </div>
          </div>
        </div>
        {users.map((user) =>
          user.UserName !== userInfo ? (
            <span
              className="list-group-item list-group-item-action border-0"
              key={user._id}
              onClick={() => handleClickInbox(user)}
            >
              <div className="badge bg-success float-right"></div>
              <div className="d-flex align-items-start">
                <img
                  src="https://toppng.com/uploads/preview/vu-thi-ha-user-pro-icon-115534024853ae3gswzwd.png"
                  className="rounded-circle mr-1"
                  alt="William Harris"
                  width="40"
                  height="40"
                />
                <div className="flex-grow-1 ml-3">
                  {user.UserName}
                  <div className="small">
                    {user.Status ? (
                      <span className="chat-online">Đang hoạt động</span>
                    ) : (
                      <span className="chat-offline">Offline</span>
                    )}
                  </div>
                </div>
              </div>
              <hr className="d-block d-lg-none mt-1 mb-0" />
            </span>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
}
