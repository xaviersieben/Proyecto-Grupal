import {  TableRow } from "@mui/material";
import React from "react";
//import { useState } from "react";
//import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import styles from '../UserRow/userRow.module.css';
import { TableCell } from "@mui/material";

export default function OrderRow ({id, quantity, status, price, user, orderDetail}) {
    const dispatch = useDispatch();
    function handleClick(e) {
        e.preventDefault(); 
        dispatch(actions.getOrderDetail(id));
    }
    return (
        <TableRow key={id} className={(id % 2 === 0)? styles.tableRowEven:styles.tableRowOdd}>
            <TableCell sx={{color: '#e7ebf0'}}>{id}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{status}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{quantity}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{price}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{user}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}><button  type="submit" onClick={(e) => handleClick(e)}>Detail</button></TableCell>
        </TableRow>
    )
}