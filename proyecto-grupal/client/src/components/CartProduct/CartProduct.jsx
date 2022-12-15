import React from "react";
import { Button, TableRow, TableCell, TextField } from "@mui/material";
import * as actions from '../../redux/actions/productsActions';

import styles from '../CartProduct/CartProduct.module.css';

export default function CartProduct ({productId, title, amount, quantity, images}) {
    return (
        <TableRow key={productId} className={(productId % 2 === 0)? styles.tableRowEven:styles.tableRowOdd}>
            <TableCell sx={{color: '#e7ebf0'}}>{productId}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}><img src={images} /></TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>{title}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>$ {amount}</TableCell>
            {/* <TableCell sx={{color: '#e7ebf0'}}><TextField sx={{ color: '#e7ebf0', maxWidth: '75px'}} id='filled-number' type='number' variant='filled' defaultValue={quantity} /></TableCell> */}
            <TableCell sx={{color: '#e7ebf0'}}> <input className={styles.quantityInput} type="number" name="quantity" value={quantity} /> </TableCell>
            <TableCell sx={{color: '#e7ebf0'}}>$ {amount * quantity}</TableCell>
            <TableCell sx={{color: '#e7ebf0'}}><Button color='error' variant='contained' >Remove from Cart</Button></TableCell>
        </TableRow>
    )
}