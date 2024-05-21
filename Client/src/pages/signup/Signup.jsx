import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axios from "../../utils/axios";

const Signup = () => {
  const [errorText, setErrorText] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (user.email === "" || user.password === "") {
      setErrorText("Vui lòng nhập đủ thông tin!");
      return;
    }
    await axios
      .post("/signup", user)
      .then((res) => {
        console.log(res);
        if (res.data.message === "user exist") {
          setErrorText("Email này đã được sử dụng!");
        } else {
          navigate("/login");
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
            <h1 className="text-center">Sign Up</h1>
            <form className="d-grid gap-3">
              <input
                name="email"
                type="email"
                placeholder="email"
                className="form-control"
                ref={emailRef}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                className="form-control"
                ref={passwordRef}
              />

              <span className="text-danger">{errorText}</span>

              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Signup;
