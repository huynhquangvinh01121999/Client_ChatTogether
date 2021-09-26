import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Chat/Index";
import Auth from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AuthProvider from "./Context/AuthProvider";
import ChatProvider from "./Context/ChatProvider";
import SocketProvider from "./Context/SocketProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <SocketProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Auth} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </SocketProvider>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
