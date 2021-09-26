import React, { useContext, useState, useEffect } from "react";
import callApi from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { SocketContext } from "../../Context/SocketProvider";
import "../../styles/login.css";

// const url = "http://localhost:3001";
const url = "https://chat-socket-mern.herokuapp.com";

export default function Auth() {
  const { socket } = useContext(SocketContext);
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
          localStorage.setItem("isAuthen", true);
          localStorage.setItem("userInfo", username);
          setIsAuthen(true);
          socket.emit("setOnlineLogin", username);
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <main className="login-form">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">Đăng nhập</div>
                <div className="card-body">
                  <form onSubmit={(e) => handleLogin(e)}>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Tài khoản
                      </label>
                      <div className="col-md-6">
                        <input
                          value={username}
                          type="text"
                          className="form-control"
                          placeholder="Nhập tài khoản..."
                          required
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Mật khẩu
                      </label>
                      <div className="col-md-6">
                        <input
                          value={password}
                          type="password"
                          className="form-control"
                          placeholder="Nhập mật khẩu..."
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-6 offset-md-4">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" name="remember" /> Nhớ mật
                            khẩu
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary">
                        Đăng nhập
                      </button>
                      <span
                        className="btn btn-outline-danger ml-2"
                        onClick={() => history.push("/register")}
                      >
                        Đăng ký tài khoản
                      </span>
                      <span className="btn btn-link">Bạn quên mật khẩu?</span>
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
