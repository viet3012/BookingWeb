import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { LOGOUT } from "../../store/auth-slice";
import "../../App.css";
import "./wrapper.css";

const Wrapper = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("currentUser");
  if (user === null) {
    navigate("/login");
  }

  const handleLogout = () => {
    dispatch(LOGOUT());
    navigate("/login");
  };

  return (
    <section className="pt-3 app__container">
      <section className="row d-flex">
        <div className="col-2 border-secondary border-end border-bottom p-1 text-center fw-bold">
          <span className="title">Admin Page</span>
        </div>
        <div className="col-10 border-secondary border-start border-bottom"></div>
      </section>
      <section className="row d-flex h-90">
        <div className="col-2 border-secondary border-end border-top ">
          <section className="sidebar__container">
            <section className="sidebar__wrapper">
              <section className="sidebar__list mt-2">
                <ul>
                  <li className="py-1">
                    {/* MAIN - START */}
                    <span>MAIN</span>
                    <ul>
                      <li>
                        <NavLink className="sidebar_link" to="/">
                          <i className="logo fa-brands fa-microsoft"></i>
                          <span>Dashboard</span>
                        </NavLink>
                      </li>
                    </ul>
                    {/* MAIN - END */}
                  </li>
                  <li className="py-1">
                    {/* LISTS - START */}
                    <span>LISTS</span>
                    <ul>
                      <li>
                        <NavLink className="sidebar_link" to="#">
                          <i className="logo fa-regular fa-user"></i>
                          <span>Users</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="sidebar_link" to="/hotels">
                          <i className="logo fa-solid fa-hotel"></i>
                          <span>Hotels</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="sidebar_link" to="/rooms">
                          <i className="logo fa-solid fa-house"></i>
                          <span>Rooms</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="sidebar_link" to="/transactions">
                          <i className="logo fa-solid fa-truck"></i>
                          <span>Transactions</span>
                        </NavLink>
                      </li>
                    </ul>
                    {/* LISTS - END */}
                  </li>
                  <li className="py-1">
                    {/* NEWS - START */}
                    <span>NEW</span>
                    <ul>
                      <li>
                        <NavLink className="sidebar_link" to="/add-hotel">
                          <i className="logo fa-solid fa-hotel"></i>
                          <span>New Hotel</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="sidebar_link" to="/add-room">
                          <i className="logo fa-solid fa-house"></i>
                          <span>New Room</span>
                        </NavLink>
                      </li>
                    </ul>
                    {/* NEWS - END */}
                  </li>
                  <li className="py-1">
                    {/* USER - START */}
                    <span>USER</span>
                    <ul>
                      <li onClick={handleLogout}>
                        <NavLink className="sidebar_link pointer">
                          <i className="logo fa-solid fa-right-from-bracket"></i>
                          <span>Logout</span>
                        </NavLink>
                      </li>
                    </ul>
                    {/* USER - END */}
                  </li>
                </ul>
              </section>
            </section>
          </section>
        </div>
        <div className="col-10 border-secondary border-start border-top">
          {props.children}
        </div>
      </section>
    </section>
  );
};

export default Wrapper;
