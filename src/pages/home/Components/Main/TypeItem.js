import React from "react";
import "./TypeItem.css";

const TypeItem = (props) => {
  return (
    <div className="type-item">
      <img
        src={`${props.image}`}
        alt=""
        width="210px"
        height="170px"
        className="type-item__image"
      />
      <h3 className="">{props.name}</h3>
      <p>{props.count} hotels</p>
    </div>
  );
};

export default TypeItem;
