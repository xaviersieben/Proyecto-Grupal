import React from "react";
import style from "./Login.css";

const Login = ({children}) => {
  return (
    <div className="modal modal_open">
      <div className="modal_container">
        <button className="modal_close">X</button>
        {children}
      </div>
      
    </div>
  );
};

export default Login;
