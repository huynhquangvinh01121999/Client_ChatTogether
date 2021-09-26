import React, { useState } from "react";
import callApi from "axios";
import { useHistory } from "react-router-dom";
import "../../styles/login.css";

const url = "http://localhost:3001";
// const url = "https://chat-socket-mern.herokuapp.com";

export default function Register() {
  const history = useHistory();
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    callApi({
      url: url + "/createUser",
      method: "POST",
      data: {
        fullname: fullName,
        email: email,
        phone: phone,
        username: username,
        password: password,
      },
    })
      .then((res) => {
        var result = res.data;
        if (result.status) {
          alert(result.message);
          setFullName("");
          setEmail("");
          setPhone("");
          setUserName("");
          setPassword("");
          setRePassword("");
        } else {
          alert(result.message);
          setUserName("");
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
                <div className="card-header">Đăng ký tài khoản mới</div>
                <div className="card-body">
                  <form onSubmit={(e) => handleRegister(e)}>
                    <div className="form-group row">
                      <label
                        for="email_address"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Họ và tên
                      </label>
                      <div className="col-md-6">
                        <input
                          value={fullName}
                          type="text"
                          className="form-control"
                          placeholder="Nhập họ tên..."
                          required
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        for="email_address"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Email
                      </label>
                      <div className="col-md-6">
                        <input
                          value={email}
                          type="email"
                          className="form-control"
                          placeholder="Email của bạn..."
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        for="email_address"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Số điện thoại
                      </label>
                      <div className="col-md-6">
                        <input
                          value={phone}
                          type="phone"
                          className="form-control"
                          placeholder="Số điện thoại của bạn..."
                          required
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        for="email_address"
                        className="col-md-4 col-form-label text-md-right"
                      >
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
                      <label
                        for="password"
                        className="col-md-4 col-form-label text-md-right"
                      >
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
                      <label
                        for="password"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Nhập lại mật khẩu
                      </label>
                      <div className="col-md-6">
                        <input
                          value={rePassword}
                          type="password"
                          className="form-control"
                          placeholder="Nhập lại mật khẩu..."
                          required
                          onChange={(e) => setRePassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-danger">
                        Đăng ký
                      </button>
                      <span
                        className="btn btn-outline-primary ml-md-2"
                        onClick={() => history.push("/login")}
                      >
                        Đăng nhập
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
