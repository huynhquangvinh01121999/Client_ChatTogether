import React, { useContext, useState, useEffect } from "react";
import callApi from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import "../../styles/login.css";
import { useSocket } from "../../Context/SocketProvider";
import { PREX } from "../../contants/prev";

// const url = "http://localhost:3001";
const url = "https://chat-socket-mern.herokuapp.com";

export default function Auth() {
  const { socket } = useSocket();
  const history = useHistory();
  const { isAuthen, setIsAuthen } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthen) {
      history.push("/");
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();

    callApi({
      method: "post",
      url: url + "/authen",
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        var result = res.data;
        if (result.status) {
          alert(result.message);
          socket.emit("setOnlineLogin", username);
          localStorage.setItem(PREX + "isAuthen", true);
          localStorage.setItem(PREX + "userInfo", username);
          setIsAuthen(true);
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <main className="login-form">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card" style={{ borderRadius: "10px" }}>
                <div
                  className="card-header text-center h3"
                  style={{
                    fontWeight: "900",
                    backgroundColor: "black",
                    color: "#00FF00",
                    fontFamily: "Stick No Bills, sans-serif",
                    fontSize: "40px",
                    lineHeight: "40px",
                    wordSpacing: "2px",
                    letterSpacing: "2px",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                  }}
                >
                  Aloha đăng nhập
                </div>
                <div className="card-body">
                  <form onSubmit={(e) => handleLogin(e)}>
                    <div className="form-group row">
                      <label className="col-md-2 col-form-label text-md-right"></label>
                      <div className="col-md-8">
                        <input
                          value={username}
                          type="text"
                          className="form-control"
                          placeholder="Nhập tài khoản của bạn..."
                          required
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-2 col-form-label text-md-right"></label>
                      <div className="col-md-8">
                        <input
                          value={password}
                          type="password"
                          className="form-control"
                          placeholder="Nhập mật khẩu của bạn..."
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-4 offset-md-4">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" name="remember" /> Nhớ mật
                            khẩu
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 offset-md-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                      >
                        Đăng nhập
                      </button>
                    </div>
                    <div className="col-md-6 offset-md-3 mt-2">
                      <span
                        className="btn btn-danger"
                        style={{ width: "100%" }}
                        onClick={() => history.push("/register")}
                      >
                        Đăng ký tài khoản
                      </span>
                    </div>
                    <div className="col-md-6 offset-md-3 mt-2">
                      <span
                        className="btn btn-link"
                        style={{ textAlign: "center", width: "100%" }}
                      >
                        Bạn quên mật khẩu?
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
