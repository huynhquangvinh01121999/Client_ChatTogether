import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/chat.css";
import Message from "./Message";
import InboxChat from "./InboxChat";
import SendMesage from "./SendMesage";
import Nav from "./Nav";
import InfoHeader from "./InfoHeader";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from "../../Context/ChatProvider";
import { SocketContext } from "../../Context/SocketProvider";
import {
  handleGetUser,
  handleUpdateClientId,
  handleUpdateDisconnect,
} from "../../Redux/Actions/UserAction";
import { handleMessageToMe } from "../../Redux/Actions/MessageAction";
// import { handleSetUserInbox } from "../../Redux/Actions/UserInboxAction";

export default function Home() {
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  const { isAuthen, userInfo, setClientId } = useContext(AuthContext);
  const { isShowChatBox, userInbox, setUserInbox } = useContext(ChatContext);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("updateUserInbox", userInfo);

  //     socket.on("reUpdateUserInbox", (data) => {
  //       console.log(data);
  //       handleSetUserInbox(dispatch, {
  //         ClientId: data.ClientId,
  //         UserName: data.data,
  //       });
  //       setUserInbox({
  //         ClientId: data.ClientId,
  //         UserName: data.data,
  //       });
  //     });
  //   }
  // }, [userInfo, socket]);

  useEffect(() => {
    handleMessageToMe(dispatch);

    if (!isAuthen) history.push("/login");

    if (socket) {
      socket.on("sendClientId", (clientId) => {
        socket.on("replySetOnline", (data) => {
          handleUpdateClientId(dispatch, data);
        });

        setClientId(clientId);

        handleGetUser(dispatch);

        socket.emit("replySendClientId", userInfo); // gửi qua server để update clientId

        socket.on("updateReducerUsers_ClientId", (data) => {
          handleUpdateClientId(dispatch, data);
          if (userInbox) {
            if (userInbox.UserName !== data.data) {
              setUserInbox({
                ClientId: data.clientId,
                UserName: data.userInfo,
              });
            }
          }
        });

        socket.on("notifiDisconnect", (clientId) => {
          socket.emit("acceptDisconnect", clientId);
          handleUpdateDisconnect(dispatch, {
            clientId: clientId,
            status: false,
          });
        });

        socket.on("clientLogouted", (clientId) => {
          handleUpdateDisconnect(dispatch, {
            clientId: clientId,
            status: false,
          });
        });
      });
    } else {
      window.location.reload();
    }
  });

  // cứ 5p check các user 1 lần
  setInterval(() => {
    // alert("repeat");
    handleMessageToMe(dispatch);

    handleGetUser(dispatch);

    socket.emit("replySendClientId", userInfo); // gửi qua server để update clientId

    socket.on("updateReducerUsers_ClientId", (data) => {
      handleUpdateClientId(dispatch, data);
      if (userInbox) {
        if (userInbox.UserName !== data.data) {
          setUserInbox({
            ClientId: data.clientId,
            UserName: data.userInfo,
          });
        }
      }
    });
  }, 300000);

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
