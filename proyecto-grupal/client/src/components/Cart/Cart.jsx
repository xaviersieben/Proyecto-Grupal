import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



//import Swal from "sweetalert2";
;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalAmount = cart.reduce((sum, value) => sum + value.amount, 0);
  const totalQuantity = cart.reduce((sum, value) => sum + value.quantity, 0);

  return (
    <div>
      <h2>Shopping cart</h2>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is momentaneously empty</p>
          <div>
            <Link to="/">
              <ArrowBackIcon />
              <span>Start shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h3>Product</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <h3>Total</h3>
          </div>
          {cart.map((cartItem) => (
            <>
              <div>{cartItem.productId}</div>
              <div>{cartItem.amount}</div>
              <div>{cartItem.quantity}</div>
              <img src={cartItem.images} alt="" />
            </>
          ))}
          <div>{totalAmount}</div>

          <div>{totalQuantity}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
