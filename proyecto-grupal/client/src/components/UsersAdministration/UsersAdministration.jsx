import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import UserRow from "../UserRow/UserRow";

export default function () {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(actions.getUsers());
    },[dispatch])
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>type</th>
                        <th>Active</th>
                    </tr>
                    {users?.map((user, index) => {
                        return (
                            <UserRow
                                key={index}
                                id={user.id}
                                name={user.name}
                                surname={user.surname}
                                password={user.password}
                                email={user.email}
                                address={user.adress}
                                isAdmin={user.isAdmin}
                                active={user.active}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}