import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

// const uri = "http://localhost:3001/";
const uri = "https://chat-socket-mern.herokuapp.com/";
// const socket = io(uri, { transports: ["websocket"] });

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(uri, { transports: ["websocket"] });
    setSocket(newSocket);
    // return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
