import React from "react";
import "./Form.css";

const Form = () => {
  return (
    <div className="form">
      <h1 className="form__title">Save time, save money!</h1>
      <p className="form__description">
        Sign up and we'll send the best deals to you
      </p>
      <input
        type="email"
        placeholder="Your Email"
        className="form__input"
      ></input>
      <button className="form__button">Subscribe</button>
    </div>
  );
};

export default Form;
