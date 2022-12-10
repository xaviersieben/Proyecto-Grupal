import React from "react";
import "./Login.css";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { validateLogin } from "./useLogin";
import * as actions from '../../redux/actions/productsActions';

const Login = ({ children, openLogin, closeLogin }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  
  const dispatch = useDispatch();
  const initialState = {
    email: '',
    password: '',
  }

  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});
  

  const handleOnChange = (e) => {
    e.preventDefault();
    setUser(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
    let dataErrors = validateLogin(user)
    setErrors(prevState => (dataErrors))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataErrors = validateLogin(user)
    setErrors(prevState => (dataErrors))

    if (Object.keys(dataErrors).length === 0) {
      dispatch(actions.loginUser(user))
      alert('New User created!');
      setUser(initialState)
    }

  }


  return (
    <div className={`modal${openLogin && "modal_open"}`} onClick={closeLogin}>
      <div className="modal_container" onClick={handleModalContainerClick}>
        <button className="modal_close" onClick={closeLogin}>
          X
        </button>
        <form className="formCard" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">
              E-mail
              <input type="email" value={user.email} name='email' onChange={e => handleOnChange(e)}/>
              {errors.email && (<p className="danger">{errors.email}</p>)}
            </label>
            <label htmlFor="">
              Password:
              <input type="password" value={user.password} name= 'password' onChange={e => handleOnChange(e)}/>
              {errors.password && (<p className="danger">{errors.password}</p>)}
            </label>
            <button className="btns" type="submit">Login</button>
          </form>
        {children}
      </div>
      
    </div>
    
  );
};

export default Login;
