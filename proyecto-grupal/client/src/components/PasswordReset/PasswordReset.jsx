import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/productsActions";
import "./PasswordReset.css";
import logo from "../../img/logo.JPG";

export default function PasswordReset() {
  const dispatch = useDispatch();
  const [emailData, setEmailData] = useState({
    email: "",
  });

  const handleOnChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailData) {
      dispatch(actions.resetPassword(emailData));
      setEmailData({ email: "" });
    } else {
      alert("Mail required before submit");
    }
  };

  return (
    <div className="container">
      <div className="password_reset_container">
        <div className="logo_container">
          <h3>CloudyBuy</h3>
          <img className="logo_image" src={logo} alt="logo" />
        </div>
        <h1>Forgot Password?</h1>
        <h4>give us your email to help you!</h4>
        <input
          className="email_input"
          type="email"
          name="email"
          placeholder="your email"
          value={emailData.email}
          onChange={(e) => handleOnChange(e)}
        />
        <button
          className="confirm_button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
