import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

// const uri = "http://localhost:3001/";
const uri = "https://chat-socket-mern.herokuapp.com/";

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(uri, { transports: ["websocket"] }));
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
