import React from "react";
import "./SearchPopup.css";

const SearchPopup = () => {
  return (
    <div className="search-popup">
      <h3 className="search-popup__title">Search</h3>
      <label className="search-popup__des">Destination</label>
      <input type="text" className="search-popup__input-long" />
      <label className="search-popup__des">Check-in Date</label>
      <input
        type="text"
        placeholder="06/24/2022 to 06/24/2022"
        className="search-popup__input-long"
      />
      <label className="search-popup__des">Options</label>
      <div className="search-popup__options">
        <label>Min price per night</label>
        <input type="text" className="search-popup__input" />
      </div>
      <div className="search-popup__options">
        <label>Max price per night</label>
        <input type="text" className="search-popup__input" />
      </div>
      <div className="search-popup__options">
        <label>Adult</label>
        <input type="number" placeholder="1" className="search-popup__input" />
      </div>
      <div className="search-popup__options">
        <label>Children</label>
        <input type="number" placeholder="0" className="search-popup__input" />
      </div>
      <div className="search-popup__options">
        <label>Room</label>
        <input type="number" placeholder="1" className="search-popup__input" />
      </div>
      <button type="button" className="search-popup__button">
        Search
      </button>
    </div>
  );
};

export default SearchPopup;
