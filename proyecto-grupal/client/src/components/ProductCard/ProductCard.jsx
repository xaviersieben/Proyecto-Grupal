import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import sty from "..//ProductCard/ProductCard.module.css";

export default function ProductCard ({ title, id, price, images }) {

  const history = useHistory();
  function handleClickCard() {
    history.push(`/details/${id}`);
  }
  //const dark = useSelector((state) => state.dark);
  return (
    <div onClick={handleClickCard} className={sty.card}>
      
      <img className={sty.images} src={images} alt="" />
     
      <div className={ sty.text }>
        <strong>{title}</strong>
        <p className={sty.weight}>
          <strong>Price: </strong>
          {price?price:"0"}
        </p>
       
      </div>
    
    </div>
  );
};


