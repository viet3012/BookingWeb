import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT, LOGIN } from "../../store/auth-slice";
import "./navbar.css";

const Navbar = () => {
  let user = JSON.parse(localStorage.getItem("currentUser")) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (user.email) {
      dispatch(LOGIN(user));
    }
  });

  const logOutHandle = () => {
    navigate("/login");
    dispatch(LOGOUT());
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Booking Website</span>
        {isLogin ? (
          <div className="navItems">
            <span>{user.email}</span>
            <button
              onClick={() => navigate("/dashboard")}
              className="navButton"
            >
              Transaction
            </button>
            <button onClick={logOutHandle} className="navButton">
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/signup")} className="navButton">
              Sign Up
            </button>
            <button onClick={() => navigate("/login")} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
