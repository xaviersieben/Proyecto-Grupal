import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useLogin } from "../Login/useLogin";
import estilos from "./CheckoutSuccess.module.css";
import {
    Button,
} from "@mui/material";
import { putOrder } from '../../redux/actions/productsActions.js';


function CheckoutSuccess() {

 const [RespMP, setRespMP] = useState({});
 const dispatch = useDispatch();
 const history = useHistory();
 const [modalOpen, openLogin, closeLogin] = useLogin(false);
 let datosDePago;
 const user2 = JSON.parse(localStorage.getItem("user")) || [];
 const order = JSON.parse(localStorage.getItem("orders")) || [];

 const user = sessionStorage.getItem("userId");

 useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  setRespMP(Array.from(params.keys()).reduce((acc, val) => ({ ...acc, [val]: params.get(val) }),{}));
  console.log(RespMP);
  
  // seguir con el dispatch para aprobar el pedido y ver como obtener los datos del usuario para mostrarlos tambien abajo
}, []);

if(RespMP){
        
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
                    <h2>Datos del pedido</h2>
                    <br />
                    <ul id={estilos.lista}>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Nro. de operacion: </span>
                            <span className={estilos.items}>{datosDePago.nroOperacion}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Estado: </span>
                            <span className={estilos.items}>{datosDePago.estado}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Numero de Pedido: </span>
                            <span className={estilos.items}>{order.id}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Total de productos: </span>
                            <span className={estilos.items}>${Intl.NumberFormat("es-AR").format(order.price)}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Método de pago: </span>
                            <span className={estilos.items}>{datosDePago.medioDePago}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Nombre: </span>
                            <span className={estilos.items}>{user2?.name+" "+ user2?.surname}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Mail: </span>
                            <span className={estilos.items}>{user2?.email}</span>
                        </li>
                        <li className={estilos.itemLista}>
                            <span className={estilos.items}>Dirección: </span>
                            <span className={estilos.items}>{user2?.adress}</span>
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