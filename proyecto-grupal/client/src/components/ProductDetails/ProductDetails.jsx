import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
//import Loading from '..//Loading/Loading.jsx';
import {getProductsDetails } from '..//../redux/actions/productsActions.js';
import sty from "./ProductDetails.module.css";
import CarouselImg from "../CarouselImg/CarouselImg";



export default function ProductDetails() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history= useHistory()
    
    // redux states --------------------------------
    const prod = useSelector(state=>state.detail)
    console.log(prod);
    //const dark = useSelector(state=>state.dark)

   useEffect(()=>{
       dispatch(getProductsDetails(id))  
          
   },[id, dispatch])

 //--------handler click--------------------
   function handleClickCreate() {
    history.push(`/modifyProduct/${id}`);
  }
  function handleClickBack() {
    history.push("/home");
  }
  
    return (
      <div className={sty.details}>
       
        <div className={sty.btn}>
          
          <button onClick={handleClickBack}>
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
          <br></br>
        
        </div>
        {
          
          prod.message ? <h2>{prod.message}</h2> : <>
          
         { prod.thumbnail ? (   
          <div className={sty.container}>
            
            
            {/* <img src={prod.thumbnail} alt="" />  */}
            <CarouselImg />
            


                        
            <div className={sty.text}>
            
              <h1>{prod.title}</h1>
              
              <div className={sty.specs}>
              
                <p>
                  <strong>Description: </strong>
                  {prod?.description}
                </p>
                
                <p>
                  <strong>Price: </strong>
                  {prod?.price}.
                </p>

                <p>
                  <strong>Rating: </strong>
                  {prod?.rating}
                </p>

                <p>
                  <strong>Stock: </strong>
                  {prod.stock? prod.stock:"0"}
                </p>

                <p>
                  <strong>Brand: </strong>
                  {prod?.brand}
                </p>

                <p>
                  <strong>Category: </strong>
                  {prod?.category}
                </p>
                
                <button onClick={handleClickCreate} className={sty.button1 }>
                  <i className="fa-solid fa-plus"></i> Modify product
                </button>
                
                
              </div>
              
              
              
            </div>
            
          </div>
           ) : (
                 <p></p> 
              )
          }
          </>
        }
       
      </div>
    );
};
