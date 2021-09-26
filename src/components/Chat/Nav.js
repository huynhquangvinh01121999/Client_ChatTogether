import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from "../../Context/ChatProvider";
import { SocketContext } from "../../Context/SocketProvider";

export default function Nav() {
  const { socket } = useContext(SocketContext);
  const { setIsAuthen, userInfo, clientId, setClientId } =
    useContext(AuthContext);
  const { setIsShowChatBox } = useContext(ChatContext);

  const handleLogout = () => {
    setIsAuthen(false);
    setIsShowChatBox(true);
    setClientId("");
    localStorage.removeItem("isAuthen");
    localStorage.removeItem("userInfo");

    socket.emit("acceptDisconnect", clientId);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-door-closed"
              viewBox="0 0 16 16"
              onClick={handleLogout}
            >
              <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
              <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
            </svg>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span className="nav-link">Chào {userInfo}</span>
              </li>
              <li className="nav-item">
                <span className="nav-link cursor" onClick={handleLogout}>
                  Đăng xuất
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
