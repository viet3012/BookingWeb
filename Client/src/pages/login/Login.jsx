import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import Navbar from "../../components/navbar/Navbar";
import { LOGIN } from "../../store/auth-slice";
import "./login.css";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const [errorText, setErrorText] = useState("");

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
          password.current.value = "";
        } else {
          dispatch(LOGIN(user));
          navigate("/");
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  return (
    <section>
      <Navbar />
      <section className="login__body">
        <div className="card">
          <div className="d-flex flex-column card-body">
            <h1 className="text-center">Login</h1>
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
                className="btn btn-primary"
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
