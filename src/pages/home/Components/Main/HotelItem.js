import React from "react";
import "./HotelItem.css";

const HotelItem = (props) => {
  return (
    <div className="hotel-item">
      <img src={`${props.image_url}`} alt="" width="270px" height="280px" />
      <div>
        <a href="/detail" className="hotel-item__link">
          {props.name}
        </a>
        <p className="hotel-item__city">{props.city}</p>
        <p className="hotel-item__price">Starting from ${props.price}</p>
        <span className="hotel-item__rate">{props.rate}</span>
        <span>{props.type}</span>
      </div>
    </div>
  );
};

export default HotelItem;
