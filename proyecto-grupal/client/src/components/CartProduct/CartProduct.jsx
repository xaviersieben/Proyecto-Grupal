import React from "react";
import { useDispatch } from "react-redux";
import { Button, TableRow, TableCell, TextField } from "@mui/material";
import * as actions from "../../redux/actions/productsActions";

import styles from "../CartProduct/CartProduct.module.css";

export default function CartProduct({
  productId,
  title,
  amount,
  quantity,
  images,
}) {
  const dispatch = useDispatch();

  function removeCart() {
    dispatch(actions.removeCart(productId));
  }

  function changeCart(e) {
    let cant = e.target.value < 1 ? 1 : parseInt(e.target.value);

    dispatch(actions.changeItemCart(productId, cant, amount));
  }

  return (
    <TableRow
      key={productId}
      className={productId % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
    >
      {/* <TableCell sx={{ color: "#e7ebf0" }}>{productId}</TableCell> */}
      <TableCell sx={{ color: "#e7ebf0" }}>
        <img src={images} alt={title} />
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{title}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>$ {amount}</TableCell>
      {/* <TableCell sx={{color: '#e7ebf0'}}><TextField sx={{ color: '#e7ebf0', maxWidth: '75px'}} id='filled-number' type='number' variant='filled' defaultValue={quantity} /></TableCell> */}
      <TableCell sx={{ color: "#e7ebf0" }}>
        {" "}
        <input
          className={styles.quantityInput}
          type="number"
          name="quantity"
          value={quantity}
          onChange={changeCart}
        />{" "}
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>$ {amount * quantity}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        <Button onClick={removeCart} color="error" variant="contained">
          Remove from Cart
        </Button>
      </TableCell>
    </TableRow>
  );
}
