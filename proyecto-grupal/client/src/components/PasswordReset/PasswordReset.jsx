import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import s from './PasswordReset.module.css';

export default function PasswordReset() {
    const dispatch = useDispatch();
    const [emailData, setEmailData] = useState({
        email: ''
    });

    const handleOnChange = (e) =>{
        setEmailData({...emailData, [e.target.name]: e.target.value})
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(emailData){
            dispatch(actions.resetPassword(emailData));
            setEmailData({email: ""});
        }else{
            alert("Mail required before submit")
        }
    }

    return(
        <div>
            <input  className={s.input} type="email" name='email' placeholder="your email" value={emailData.email} onChange={e => handleOnChange(e)} />
            <button className={s.butt} type="submit" onClick={e => handleSubmit(e)}>Send</button>
        </div>
    );
}
