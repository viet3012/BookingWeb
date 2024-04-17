import React from "react";
import "./SearchListItem.css";

const SearchListItem = (props) => {
  return (
    <div className="search-list">
      <img src={`${props.image_url}`} alt="" width="240px" height="250px" />
      <div className="search-list-item">
        <h3 className="search-list__name">{props.name}</h3>
        <p className="search-list__distance">{props.distance} from center</p>
        <span className="search-list__tag">{props.tag}</span>
        <p className="search-list__description">{props.description}</p>
        <p className="search-list__type">{props.type}</p>
        <p
          className={`search-list__free_cancel ${
            props.free_cancel ? "true" : "false"
          }`}
        >
          <b>Free cancellation</b>
        </p>
        <p
          className={`search-list__free_cancel ${
            props.free_cancel ? "true" : "false"
          }`}
        >
          You can cancel later, so lock in this great price today!
        </p>
      </div>
      <div>
        <div className="search-list__rate">
          <span>
            <b>{props.rate_text}</b>
          </span>
          <span className="search-list__rate-number">{props.rate}</span>
        </div>
        <div>
          <p className="search-list__price">${props.price}</p>
          <p className="search-list__detail">Includes taxes and fees</p>
          <button type="" className="search-list__button">
            See avalability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchListItem;
