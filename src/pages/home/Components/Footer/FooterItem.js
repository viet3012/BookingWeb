import React from "react";
import "./FooterItem.css";

const FooterItem = (props) => {
  return (
    <div className="footer-item">
      <a href="#" className="footer-item__link">
        {props.col_values[0]}
      </a>
      <a href="#" className="footer-item__link">
        {props.col_values[1]}
      </a>
      <a href="#" className="footer-item__link">
        {props.col_values[2]}
      </a>
      <a href="#" className="footer-item__link">
        {props.col_values[3]}
      </a>
      <a href="#" className="footer-item__link">
        {props.col_values[4]}
      </a>
      <a href="#" className="footer-item__link">
        {props.col_values[5]}
      </a>
      <a href="#" className="footer-item__link">
        {props.col_values[6]}
      </a>
      <a href="#" className="footer-item__link">
        {props.col_values[7]}
      </a>
    </div>
  );
};

export default FooterItem;
