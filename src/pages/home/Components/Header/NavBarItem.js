import React from "react";
import "./NavBarItem.css";

const NavBarItem = (props) => {
  return (
    <span className={`navbar-item ${props.active ? "active" : ""}`}>
      <span className={`fa ${props.icon}`}></span>
      <span className="navbar-item__type">{props.type}</span>
    </span>
  );
};

export default NavBarItem;
