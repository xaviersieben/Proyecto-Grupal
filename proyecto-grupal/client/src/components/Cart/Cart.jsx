import React, { useEffect,useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCart } from "../../redux/actions/productsActions";
import CartProduct from "../CartProduct/CartProduct.jsx";
import EmptyCart from "../EmptyCart/EmptyCart";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material";
import styles from '../Cart/Cart.module.css';

//import Swal from "sweetalert2";


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  // const [orderTotal, setOrderTotal] = useState(0);
  const dispatch = useDispatch();

  const user=JSON.parse(localStorage.getItem('user'));
  
  

  const [order, setOrder] = useState({
    id: "",
    price: 0,
    quantity: 0,
    pedido:[]
    
});
// useEffect(() => {
//   dispatch(getCart());
// },[dispatch]);
// console.log(cart);


  const totalAmount = cart.reduce((sum, value) => sum + value.amount * value.quantity, 0);
  //const totalQuantity = cart.reduce((sum, value) => sum + value.quantity, 0);

  return (
    <div className={styles.cart}>
      <Typography variant="h2" className={styles.tableTitle}>Shopping Cart</Typography>
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
            <Link className={styles.volverAtras} to='/home'>Home...</Link>
            <div className={styles.mainDiv}>
                
                <span className={styles.filler}></span>
                <TableContainer>
                    <Table sx={{ minWidth: '1440px' }} size="medium" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#e7ebf0' }}>ID</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Image</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Product</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Price</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Quantity</TableCell>
                            <TableCell sx={{ color: '#e7ebf0' }}>Total</TableCell> 
                            <TableCell sx={{ color: '#e7ebf0' }}>Action</TableCell> 
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
                <div>
                  <h3>Order total: </h3>
                  <p>$ {totalAmount}</p>
                  {/* <h3>Order total: </h3>
                  <p>{cart?.forEach((cartItem) => {
                    let toSum = orderTotal + (cartItem.amount * cartItem.quantity);

                    setOrderTotal(toSum);
                  })}</p> */}
                  <Button color='success' variant='contained'>Buy now</Button>
                </div>
            </div>
        </div>
        
      )}
    </div>
  );
};

export default Cart;

