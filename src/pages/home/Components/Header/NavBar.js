import React from "react";
import NavBarItem from "./NavBarItem";

const NavBar = () => {
  const DUMMY_NAV = [
    {
      type: "Stays",
      icon: "fa-bed",
      active: true,
    },
    {
      type: "Flights",
      icon: "fa-plane",
      active: false,
    },
    {
      type: "Car rentals",
      icon: "fa-car",
      active: false,
    },
    {
      type: "Attractions",
      icon: "fa-bed",
      active: false,
    },
    {
      type: "Airport taxis",
      icon: "fa-taxi",
      active: false,
    },
  ];
  return (
    <div className="navbar">
      <div className="navbar__title">Booking Website</div>
      <div className="navbar__buttons">
        <button className="navbar__button">Register</button>
        <button className="navbar__button">Login</button>
      </div>
      <div className="navbar__icon">
        {DUMMY_NAV.map((item) => (
          <NavBarItem key={item.id} type={item.type} icon={item.icon} active={item.active} />
        ))}
      </div>
    </div>
  );
};
export default NavBar;
