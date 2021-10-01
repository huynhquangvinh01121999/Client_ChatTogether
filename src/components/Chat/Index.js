import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/chat.css";
import Message from "./Message";
import InboxChat from "./InboxChat";
import SendMesage from "./SendMesage";
import Nav from "./Nav";
import InfoHeader from "./InfoHeader";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from "../../Context/ChatProvider";
import { useSocket } from "../../Context/SocketProvider";
import { useDispatch } from "react-redux";
import {
  handleGetUser,
  handleUpdateClientId,
  handleUpdateDisconnect,
} from "../../Redux/Actions/UserAction";
import { PREX } from "../../contants/prev";
import {
  handleMessageToMe,
  handleUpdateMessage,
} from "../../Redux/Actions/MessageAction";

export default function Home() {
  const { socket } = useSocket();
  const { isAuthen, setClientId } = useContext(AuthContext);
  const { messages, setMessages, isShowChatBox, userInbox, setUserInbox } =
    useContext(ChatContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthen) history.push("/login");

    handleMessageToMe(dispatch);
    handleGetUser(dispatch);
  }, []);

  useEffect(() => {
    if (socket === null) return;

    // Bước 2: Nhận ClientId của chính mình
    socket.on("sendClientId", (clientId) => {
      setClientId(clientId);
      // Bước 3: phản hồi đã nhận đc clientId của chính mình - thông điệp kèm là userInfo
      socket.emit("replySendClientId", localStorage.getItem(PREX + "userInfo"));
    });
    // Bước 6: nhận data để cập nhật lại ds các user online
    socket.on("updateReducerUsers_ClientId", (data) => {
      handleUpdateClientId(dispatch, data);
      if (userInbox.UserName === data.userInfo) {
        setUserInbox({
          ClientId: data.clientId,
          UserName: data.userInfo,
        });
      }
      // handleSetUserInbox(dispatch, {
      //   ClientId: data.ClientId,
      //   UserName: data.data,
      // });
      // var usinbox = JSON.parse(localStorage.getItem(PREX + "userInbox"));
      // console.log(userInbox.UserName + " - " + data.userInfo);
    });
    // Bước 9: nhận thông báo client disconnect - update lại status cho client đó
    socket.on("notifiDisconnect", (clientId) => {
      // Bước 10: phản hồi xác nhận cho server là chính thức disconnect
      socket.emit("acceptDisconnect", clientId);
    });
    // Bước 13: nhận phản hồi từ server để update lại state status
    socket.on("clientLogouted", (clientId) => {
      handleUpdateDisconnect(dispatch, {
        clientId: clientId,
        status: false,
      });
    });
    // client nhận thông báo từ server gửi data về để update ds client khi có client login
    socket.on("updateUserInbox", (data) => {
      handleUpdateClientId(dispatch, data);
    });
  });

  useEffect(() => {
    if (socket === null) return;
    socket.on("recei-mess", (data) => {
      setMessages([...messages, data]);
      handleUpdateMessage(dispatch, data);
    });
    return () => {
      socket.off("recei-mess");
    };
  });

  // return (
  //   <>
  //      <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         socket.emit("send-mess", content);
  //         setContent("");
  //       }}
  //     >
  //       <input
  //         type="text"
  //         placeholder="nhập tin nhắn"
  //         value={content}
  //         onChange={(e) => setContent(e.target.value)}
  //       />
  //     </form>
  //   </>
  // );

  // // cứ 5p check các user 1 lần
  // setInterval(() => {
  //   // alert("repeat");
  //   handleMessageToMe(dispatch);

  //   handleGetUser(dispatch);

  //   socket.emit("replySendClientId", userInfo); // gửi qua server để update clientId

  //   socket.on("updateReducerUsers_ClientId", (data) => {
  //     // console.log(2 + " " + data.clientId);
  //     handleUpdateClientId(dispatch, data);
  //     // if (userInbox) {
  //     //   if (userInbox.UserName === data.userInfo) {
  //     //     setUserInbox({
  //     //       ClientId: data.clientId,
  //     //       UserName: data.userInfo,
  //     //     });
  //     //   }
  //     // }
  //   });
  // }, 120000);

  return (
    <>
      <Nav />
      <main className="content">
        <div className="container p-0">
          <div className="card">
            <div className="row g-0">
              <InboxChat />

              <div className="col-12 col-lg-7 col-xl-9" hidden={isShowChatBox}>
                <InfoHeader />

                <Message />

                <SendMesage />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
