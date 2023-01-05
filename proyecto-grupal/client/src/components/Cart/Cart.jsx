import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCart, postOrder } from "../../redux/actions/productsActions";
import CartProduct from "../CartProduct/CartProduct.jsx";
import EmptyCart from "../EmptyCart/EmptyCart";
import LoginModal from "../Login/LoginModal";
import Login from "../Login/Login";
//import s from "../CreateProduct/CreateProduct";
import axios from "axios";

import { useLogin } from "../Login/useLogin";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import styles from "../Cart/Cart.module.css";

//import Swal from "sweetalert2";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  // const [orderTotal, setOrderTotal] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, openLogin, closeLogin] = useLogin(false);


  const user = sessionStorage.getItem("userId");

  const [input, setInput] = useState({
    address: "",
  });

  function handleInputChange(e) {
    e.preventDefault();
    console.log(input);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin() {
    console.log("hola");
    if (!sessionStorage.getItem("token")) {
      openLogin();
    } else {
      sessionStorage.removeItem("token");
    }
  }

  async function buy() {
    const response = await axios.post("http://localhost:3001/checkout", {
      items: cart,
      pagador: input,
    });
    const pago = response.data.init_point;
    const pagoId = response.data.id;

    let order = {
      id: parseInt(user),
      idMp: pagoId,

      price: totalAmount,
      quantity: totalQuantity,
      pedido: cart,
    };

      localStorage.setItem('orders', JSON.stringify(order));
      localStorage.setItem('user', JSON.stringify(user));
      

    dispatch(postOrder(order));
    window.location.href = pago;

    //history.push("/home");
  }

  function onBuy(e) {
    e.preventDefault();

    !user ? handleLogin() : buy();

    //history.push("/home");
  }

  const totalAmount = cart.reduce(
    (sum, value) => sum + value.amount * value.quantity,
    0
  );
  const totalQuantity = cart.reduce((sum, value) => sum + value.quantity, 0);

  return (
    <div>
      <Login modalOpen={modalOpen} closeLogin={closeLogin} />
      {/* <Typography variant="h2" className={styles.tableTitle}>
        Shopping Cart
      </Typography> */}

      <div className={styles.cart}>
        <Typography variant="h2" className={styles.tableTitle}>
          Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <div className={styles.fullDiv}>
            {/* <p>Your cart is currently empty</p>
          <div>
            <Link to="/">
              <ArrowBackIcon />
              <span>Start shopping</span>
            </Link>
          </div> */}
            <EmptyCart />
          </div>
        ) : (
          // <div>
          //   <div>
          //     <h3>Product</h3>
          //     <h3>Price</h3>
          //     <h3>Quantity</h3>
          //     <h3>Total</h3>
          //   </div>
          //   {cart.map((cartItem) => (
          //     <>
          //       <div>{cartItem.title}</div>
          //       <div>{cartItem.amount}</div>
          //       <div>{cartItem.quantity}</div>
          //       <img src={cartItem.images} alt="" />
          //     </>
          //   ))}
          //   <div>{totalAmount}</div>

          //   <div>{totalQuantity}</div>
          // </div>

          <div className={styles.fullDiv}>
            <Link className={styles.volverAtras} to="/home">
              Home...
            </Link>
            <div className={styles.mainDiv}>
              <span className={styles.filler}></span>
              <TableContainer>
                <Table
                  sx={{ minWidth: "1440px" }}
                  size="medium"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      {/* <TableCell sx={{ color: "#e7ebf0" }}>ID</TableCell> */}
                      <TableCell sx={{ color: "#e7ebf0" }}>Image</TableCell>
                      <TableCell sx={{ color: "#e7ebf0" }}>Product</TableCell>
                      <TableCell sx={{ color: "#e7ebf0" }}>Price</TableCell>
                      <TableCell sx={{ color: "#e7ebf0" }}>Quantity</TableCell>
                      <TableCell sx={{ color: "#e7ebf0" }}>Total</TableCell>
                      <TableCell sx={{ color: "#e7ebf0" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.map((cartItem, index) => {
                      return (
                        <CartProduct
                          key={index}
                          productId={cartItem.productId}
                          title={cartItem.title}
                          amount={cartItem.amount}
                          quantity={cartItem.quantity}
                          images={cartItem.images}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={styles.orderTotalAddressAndBuy}>
                  <div className={styles.orderTotal}>
                    <Typography variant="h3">Order total: </Typography>
                    <Typography variant="p" className={styles.orderTotalP}><span style={{marginLeft: '20px'}}></span>$ {totalAmount}</Typography>
                  </div>
                {/* <h3>Order total: </h3>
                  <p>{cart?.forEach((cartItem) => {
                    let toSum = orderTotal + (cartItem.amount * cartItem.quantity);

                    setOrderTotal(toSum);
                  })}</p> */}
                  {/* <div>
                    <form className={s.form}>
                      <div className={s.divInput}>
                        <label className={s.label} htmlFor="">
                          Dirección de envío:
                        </label>
                        <input
                          className={s.input}
                          placeholder="Dirección..."
                          value={input.address}
                          name="address"
                          type="text"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </form>
                  </div> */}
                   <div>
                    <form>
                      <div className={styles.addressDiv}>
                        <label className={styles.addressDivLabel} htmlFor="">
                          Shipping address:
                        </label>
                        <input
                          className={styles.addressDivInput}
                          placeholder="Address..."
                          value={input.address}
                          name="address"
                          type="text"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </form>
                  </div>
                <Button onClick={onBuy} color="success" variant="contained" className={styles.buyButton}>
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
