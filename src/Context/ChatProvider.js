import React, { useState } from "react";

export const ChatContext = React.createContext();

export default function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [userInbox, setUserInbox] = useState({
    ClientId: "",
    UserName: "",
  });
  const [isShowChatBox, setIsShowChatBox] = useState(true);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        userInbox,
        setUserInbox,
        isShowChatBox,
        setIsShowChatBox,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
