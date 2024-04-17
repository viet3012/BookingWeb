import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p className="header__title-description">
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button className="header__title-button">Sign in / Register</button>
      </div>
      <div className="header__form">
        <div className="header__form-location">
          <i className="fa fa-bed"></i>
          <input
            type="text"
            placeholder="Where are you going?"
            className="header__input-location"
          ></input>
        </div>
        <div className="header__form-date">
          <i className="fa fa-calendar"></i>
          <input
            type="text"
            placeholder="06/24/2022"
            className="header__input-date"
          ></input>
          <span>to</span>
          <input
            type="text"
            placeholder="06/24/2022"
            className="header__input-date"
          ></input>
        </div>
        <div className="header__form-info">
          <i className="fa fa-male"></i>
          <input
            type="number"
            min="0"
            placeholder="1"
            className="header__input-info"
          ></input>
          <label>adult</label>
          <input
            type="number"
            min="0"
            placeholder="0"
            className="header__input-info"
          ></input>
          <label>children</label>
          <input
            type="number"
            min="0"
            placeholder="1"
            className="header__input-info"
          ></input>
          <label>room</label>
        </div>
        <button
          className="header__form-button"
          onClick={() => location.replace("/search")}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
