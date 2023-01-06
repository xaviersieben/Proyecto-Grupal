import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import estilos from "./CheckoutSuccess.module.css";
import {
    Button,
} from "@mui/material";
import { putOrder, setCart, getUsers, getOrders } from '../../redux/actions/productsActions.js';


function CheckoutSuccess() {
 const dispatch = useDispatch();
 const history = useHistory();
 const user = useSelector((state) => state.user);
 const users = useSelector((state) => state.users);
 const orders = useSelector((state) => state.orders);

 const params = new URLSearchParams(window.location.search)
 const [RespMP] = useState(Array.from(params.keys()).reduce((acc, val) => ({ ...acc, [val]: params.get(val) }),{}));
 const user2 = JSON.parse(localStorage.getItem("user2")) || [];
 const order = JSON.parse(localStorage.getItem("order2")) || [];
 let datosDePago;
let dataOrder = [];
let dataUser = [];

if(RespMP){
 
  dispatch(getUsers());
  dispatch(getOrders());  
  
  dataOrder = orders.filter(o => o.idMp === order.idMp); 
  dataUser = users.filter(u => u.id === user.id);
  
  datosDePago = {
        nroOperacion: RespMP.payment_id,
        estado: "",
        medioDePago: "",
        preference_id: RespMP.preference_id
    }
    switch(RespMP.status){
        case "approved": 
        datosDePago.estado = "Aprobado"; 
        dispatch(putOrder(order.idMp, { status: "confirmed" }));
        break;
        case "rejected": datosDePago.estado = "Rechazado"; break;
        default: datosDePago.estado = "Rechazado";
    }
    switch(RespMP.payment_type){
        case "credit_card": datosDePago.medioDePago = "Tarjeta de crédito"; break;
        case "debit_card": datosDePago.medioDePago = "Tarjeta de débito"; break;
        default: datosDePago.medioDePago = "Otro";
    }
  }   
   
  function onAcepta(e) {
    e.preventDefault();
     (RespMP.status === "approved") && dispatch(setCart([]));
       history.push("/home");
  }

    document.title = "Cloudify - Pago "+ datosDePago.estado;
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    return(
        
           <> 
                <div id={estilos.contenedorDatos}>
                    <h2>Order Status</h2>
                    <br />
                    <ul id={estilos.lista}>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Operation Nro.: </span>
                            <span className={estilos.items}>{datosDePago.nroOperacion}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Payment Status: </span>
                            <span className={estilos.items}>{datosDePago.estado}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Order Number: </span>
                            <span className={estilos.items}>{dataOrder[0]?.id}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Total Ammount: </span>
                            <span className={estilos.items}>${Intl.NumberFormat("es-AR").format(dataOrder[0]?.price)}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Payment Method: </span>
                            <span className={estilos.items}>{datosDePago.medioDePago}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>User: </span>
                            <span className={estilos.items}>{dataUser[0]?.name + " " + dataUser[0]?.surname}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>eMail: </span>
                            <span className={estilos.items}>{user?.email}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Address: </span>
                            <span className={estilos.items}>{dataUser[0]?.adress}</span>
                        </li>
                    </ul>
                    <br />
                    <Button onClick={onAcepta} color="success" variant="contained">
                      Volver
                    </Button>
                </div>
                
          </>  
        
    );
}

export default CheckoutSuccess