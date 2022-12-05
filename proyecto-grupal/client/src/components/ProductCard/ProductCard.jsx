import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import sty from "..//ProductCard/ProductCard.module.css";

export default function ProductCard ({ title, id, price, images, rating }) {

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
          <strong>Price: $ </strong>
          {price?price:"0"}
        </p>
        {rating>0 ? <div className={sty.stars}><div className={sty.percent} style={{ width: `${((rating*100)/10)*2}%` }}></div></div> : <div className={sty.stars}><div className={sty.percent} style={{ width: `${0}%` }}></div></div> }
  
      </div>
    </div>
      
     
  );
}


