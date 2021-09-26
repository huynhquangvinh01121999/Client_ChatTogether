import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [isAuthen, setIsAuthen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    var resultAuthen = localStorage.getItem("isAuthen");
    if (resultAuthen) {
      setIsAuthen(true);
      setUserInfo(localStorage.getItem("userInfo"));
    }
  }, [isAuthen]);

  return (
    <AuthContext.Provider
      value={{
        isAuthen,
        setIsAuthen,
        userInfo,
        setUserInfo,
        clientId,
        setClientId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
