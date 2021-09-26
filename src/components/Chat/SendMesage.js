import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from "../../Context/ChatProvider";
import { SocketContext } from "../../Context/SocketProvider";
import { handleUpdateMessage } from "../../Redux/Actions/MessageAction";

export default function SendMesage() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const { socket } = useContext(SocketContext);
  const { userInfo } = useContext(AuthContext);
  const { userInbox, messages, setMessages } = useContext(ChatContext);

  const handleSendMess = (e) => {
    e.preventDefault();
    // console.log(e);
    if (content.trim() !== "") {
      const d = new Date();
      var request = {
        FromUser: userInfo,
        ToUser: userInbox.UserName,
        Content: content,
        CreateAt:
          d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear(),
      };

      socket.emit("saveMessToDb", request);
      socket.emit("sendMess", { ...request, userInbox });
      setContent("");
      setMessages([...messages, request]);
      handleUpdateMessage(dispatch, request);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("replySendMess", (data) => {
        setMessages([...messages, data]);
      });
    }
  });

  return (
    <>
      <div className="flex-grow-0 py-3 px-4 border-top">
        <form onSubmit={(e) => handleSendMess(e)}>
          <div className="input-group">
            <input
              value={content}
              type="text"
              className="form-control"
              placeholder="Nhập nội dung tin nhắn..."
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Gửi
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
