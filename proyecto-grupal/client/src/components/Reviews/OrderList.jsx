import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
import * as actions from "../../redux/actions/productsActions";
import s from "./OrderList.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: 80,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    width: 400,
    height: 800,
  },
  typo: {
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
  },
  paragraph: {
    margin: "10px 0",
  },
}));

export default function OrderList({ onOrderSelect }) {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.getOrders());
  }, [dispatch]);

  function handleClickBack() {
    history.push("/home");
  }

  return (
    <div className={s.general}>
      <Grid container className={classes.root} spacing={2}>
        {orders.length === 0 ? (
          <Typography variant="body1" color="initial">
            You have no orders created yet.
            <Button size="small" onClick={handleClickBack}>
              Go back and buy!
            </Button>
          </Typography>
        ) : (
          orders.map((order) => {
            const orderDetails = order.OrderDetails;
            let totalPrice = 0;
            for (let i = 0; i < orderDetails.length; i++) {
              const productPrice = orderDetails[i].product.price;
              totalPrice += productPrice;
            }

            return (
              <Grid container className={classes.root} spacing={2}>
                {orders.map((order) => {
                  const orderDetails = order.OrderDetails;
                  return (
                    <Grid item xs={3} key={order._id}>
                      <Typography className={classes.typo}>
                        Your Orders
                        <Button size="small" onClick={handleClickBack}>
                          Home
                        </Button>
                      </Typography>
                      <Card className={classes.card}>
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="h2"
                            className={classes.paragraph}
                          >
                            Order #{order.id}
                          </Typography>
                          <Typography color="textSecondary">
                            Date: {order.createdAt}
                          </Typography>
                          <Typography color="textSecondary">
                            Status: {order.status}
                          </Typography>
                          {orderDetails.map((orderDetail) => {
                            return (
                              <Typography
                                key={orderDetail._id}
                                className={classes.paragraph}
                              >
                                <img
                                  src={orderDetail.product.thumbnail}
                                  alt={orderDetail.product.title}
                                  width="200"
                                  height="200"
                                  alignItems="center"
                                />
                                <Typography className={classes.paragraph}>
                                  {orderDetail.product.title}:{" "}
                                </Typography>
                                <Typography className={classes.paragraph}>
                                  {orderDetail.quantity} x $
                                  {orderDetail.product.price}
                                </Typography>
                                <Typography className={classes.paragraph}>
                                  <Button size="medium">
                                    Leave your review
                                  </Button>
                                </Typography>
                              </Typography>
                            );
                          })}
                          <Typography variant="body2" component="p">
                            Total: {totalPrice}$
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}
