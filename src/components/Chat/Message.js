import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { ChatContext } from "../../Context/ChatProvider";

export default function Message() {
  const { messages } = useContext(ChatContext);
  const { userInfo } = useContext(AuthContext);

  // chat scroll to bottom
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom);
  // end

  return (
    <>
      <div className="position-relative">
        <div className="chat-messages p-4" id="main_chat">
          {messages.map((message) =>
            message.FromUser === userInfo ? (
              <div className="chat-message-right pb-4">
                <div>
                  <img
                    src="https://toppng.com/uploads/preview/vu-thi-ha-user-pro-icon-115534024853ae3gswzwd.png"
                    className="rounded-circle mr-1"
                    alt="Chris Wood"
                    width="40"
                    height="40"
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    {message.CreateAt}
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1 text-right">
                    {message.FromUser}
                  </div>
                  {message.Content}
                </div>
              </div>
            ) : (
              <div className="chat-message-left pb-4">
                <div>
                  <img
                    src="https://toppng.com/uploads/preview/vu-thi-ha-user-pro-icon-115534024853ae3gswzwd.png"
                    className="rounded-circle mr-1"
                    alt="Sharon Lessman"
                    width="40"
                    height="40"
                  />
                  <div className="text-muted small text-nowrap mt-2">
                    {message.CreateAt}
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                  <div className="font-weight-bold mb-1">
                    {message.FromUser}
                  </div>
                  {message.Content}
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
}
