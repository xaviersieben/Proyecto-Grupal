import { Button } from "@mui/material";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCart } from "../../redux/actions/productsActions";
import sty from "..//ProductCard/ProductCard.module.css";

export default function ProductCard ({ title, id, price, images, rating }) {

  const history = useHistory();
  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);

  function handleClickCard() {
    history.push(`/details/${id}`);
  }

  function handleCart(){
    dispatch(addCart(id,price,images,title))
    
  }
  //const dark = useSelector((state) => state.dark);
  return (
    <>
    <div>
    
    <div onClick={handleClickCard} className={sty.card}>
      
      <img className={sty.images} src={images} alt="" />
     
      <div className={ sty.text }>
        <strong>{title}</strong>
        <p className={sty.weight}>
          <strong>Price: $ </strong>
          {price?price:"0"}
        </p>
        <div className={ sty.ratingbox } > 
        <p className={sty.weight}>
          <strong>Rating: </strong>
          {rating ? rating : "0"}
        </p>
            {rating>0 ? <div className={sty.stars}><div className={sty.percent} style={{ width: `${((rating*100)/10)*2}%` }}></div></div> : <div className={sty.stars}><div className={sty.percent} style={{ width: `${0}%` }}></div></div> }
        </div>
      
      </div>
      </div>
      <Button style={{width: '100%'}} variant='contained' size='small' onClick={handleCart}>Add to Cart</Button>
    </div>
    </>
      
     
  );
}


