import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../Login/useLogin";
import s from "./MenuBar.module.css";
import LoginModal from "../Login/LoginModal";


export default function MenuBar({email, handleLogOut}) {

  const [modalOpen, openLogin, closeLogin] = useLogin(false);
  // console.log(email)

  function handleLogin() {
    return (
      <LoginModal />
    )
  }

return (
    <nav className={s.userNav}>
      <ul className={s.userMenu}>
        
        <li className={s.userMenuLi}>
          <button className={s.userButton}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <ul className={s.userSubMenu}>
    
          {!email && (
            <li>    
              <Link to={"/login"} className={s.userSubMenuLiA} href="#">
              {" "} LogIn
              {/* <a className={s.userSubMenuLiA} onClick={()=>handleLogin()} href="">{" "} LogIn</a> */}
              </Link>
            </li>
          )}
          {!email && (
            <li>    
              <Link to={"/register"} className={s.userSubMenuLiA} href="#">
              {" "} SignUp
              </Link>
            </li>
          )}    
          {email && (
            <li className={s.userSubMenuLi}>
              <Link to={"/orders/user"} className={s.userSubMenuLiA} href="#">
                {" "} My Orders
              </Link>
            </li>
          )}
          {email && (
            <li className={s.userSubMenuLi}>
              <Link to={"/profile"} className={s.userSubMenuLiA} href="#">
                {" "} My Profile
              </Link>
            </li>
          )}
          {email && (
            <li className={s.userSubMenuLi}>
              <Link to={'/wishlist'} className={s.userSubMenuLiA} href="#"> 
                {" "} My Wishlist
              </Link>
            </li>
          )}

            <li className={s.userSubMenuLi}>
              <Link to={'/cart'} className={s.userSubMenuLiA} href="#"> 
                {" "} My Cart
              </Link>
            </li>

          {email && (
            <li className={s.userSubMenuLi}>
              <a className={s.userSubMenuLiA} onClick={(e) => handleLogOut(e)} href="#">
                {" "} Log Out
              </a>
            </li>
          )}
          </ul>
        </li>
      </ul>

  </nav>
)
}
