import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions/productsActions';

export default function UserRow ({id, name, surname, password, email, address, isAdmin, active}) {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(active);
    const [admin, setIsAdmin] = useState(isAdmin);
    const [user, setUser] = useState({
        id: id,
        name: name,
        surname: surname,
        password: password,
        email: email,
        adress: address,
        isAdmin: isAdmin,
        active: active,
    });
    function handleClickAdmin(e) {
        e.preventDefault();
        // dispatch(actions.turnIntoAdminOrUser(user.id));
        dispatch(actions.turnIntoAdminOrUser(id));
        // setUser(!user.isAdmin);
        setIsAdmin(!admin);

    }
    function handleClickActive(e) {
        e.preventDefault();
        // dispatch(actions.setActiveInactive({email: user.email}));
        dispatch(actions.setActiveInactive({email: email}));
        // setUser(!user.active);
        setIsActive(!isActive);
    }
    return (
        // <tr key={user.id}>
        //     <td>{user.id}</td>
        //     <td>{user.name}</td>
        //     <td>{user.surname}</td>
        //     <td>{user.password}</td>
        //     <td>{user.email}</td>
        //     <td>{user.adress}</td>
        //     <td><Button color={user.isAdmin?'success':'error'} onClick={(e) => {handleClickAdmin(e)}}>{user.isAdmin?'admin':'user'}</Button></td>
        //     <td><Button color={user.active?'success':'error'} onClick={(e) => {handleClickActive(e)}}>{user.active?'active':'inactive'}</Button></td>
        // </tr>
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{password}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td><Button color={admin?'success':'error'} onClick={(e) => {handleClickAdmin(e)}}>{admin?'admin':'user'}</Button></td>
            <td><Button color={isActive?'success':'error'} onClick={(e) => {handleClickActive(e)}}>{isActive?'active':'inactive'}</Button></td>
        </tr>
    )
}