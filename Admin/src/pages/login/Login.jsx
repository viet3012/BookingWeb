import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import "../../App.css";
import "./login.css";
import { LOGIN } from "../../store/auth-slice";

const Login = () => {
  const [errorText, setErrorText] = useState("");
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let user = {
      email: email.current.value,
      password: password.current.value,
    };
    if (user.email === "" || user.password === "") {
      setErrorText("Vui lòng nhập đủ thông tin!");
      return;
    }
    await axios
      .post("/login", user)
      .then((res) => {
        console.log(res);
        if (res.data.message === "wrong") {
          setErrorText("Sai email hoặc mật khẩu!");
          return;
        }
        if (res.data.isAdmin === false) {
          setErrorText("Tài khoản này không phải Admin!");
          return;
        } else {
          dispatch(LOGIN(user));
          navigate("/");
        }
      })
      .catch((error) => console.log("error:", error));
  };

  return (
    <section>
      <section className="login__body">
        <div className="card">
          <div className="d-flex flex-column card-body p-4">
            <h1 className="text-center login__title">Login</h1>
            <form className="d-grid gap-3">
              <input
                name="email"
                type="email"
                placeholder="email"
                className="form-control"
                ref={email}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                className="form-control"
                ref={password}
              />
              <span className="text-danger">{errorText}</span>
              <button
                onClick={handleSubmit}
                type="button"
                className="rounded login__button"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
