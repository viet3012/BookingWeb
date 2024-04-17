import React from "react";
import "./CityItem.css";

const CityItem = (props) => {
  return (
    <div className="city-item">
      <div className="city-item__title">
        <h2>{props.name}</h2>
        <p>{props.subText}</p>
      </div>
      <img
        src={`${props.image}`}
        alt=""
        width="370px"
        height="280px"
        className="city-item__image"
      />
    </div>
  );
};

export default CityItem;
