import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import s from './PasswordReset.module.css';

export default function PasswordConfirm(){
    const dispatch = useDispatch();
    let data = window.location.toString().split("/");
    let email = data[4];
    let token = data[5]
    const [userData, setUserData] = useState({
        email: email,
        password:'',
        password2: '',
        token: token
    });
    const handleOnChange = (e) =>{
        setUserData({...userData, [e.target.name]: e.target.value})
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(userData.password && userData.password2){
            if(userData.password === userData.password2){
                if(token === localStorage.getItem("token") && email === localStorage.getItem("email")){
                    dispatch(actions.resetConfirm(userData));
                    setUserData({
                        email: '',
                        password: '',
                        password2: '',
                    });
                    alert("password changed")
                }else{
                    alert("access denied")
                }
            }else{
                alert("passwords do not match")
            }
        }else{
            alert("Please fill all fields");
        }
    }
    return(
        <div>
            <input  className={s.input} type="password" name='password' placeholder="your new password" value={userData.password} onChange={e => handleOnChange(e)} />
            <input  className={s.input} type="password" name='password2' placeholder="confirm password" value={userData.password2} onChange={e => handleOnChange(e)} />
            <button className={s.butt} type="submit" onClick={e => handleSubmit(e)}>Send</button>
        </div>
    );
}