import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard';
import Pagination from "../Pagination/Pagination";
import s from './Home.module.css';
import logo from "..//../img/logo.JPG";
import LoginModal from "../Login/LoginModal";
import NavBar from "../NavBar/NavBar";


export default function Home() {

  const dispatch = useDispatch();
  let listProducts = useSelector((state) => state.products);
// Redux
  let categories = useSelector((state) => state.categories);
  let allProducts = useSelector((state) => state.allProducts);

  // Local states 
  const [alphabet, setAlphabet] = useState(true);
  const [price, setPrice] = useState(true);
  const [rating, setRating] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  let indexlastGame = page * pageSize;
  let indexFirstGame = indexlastGame- pageSize;
  let currentProducts = listProducts.slice(indexFirstGame, indexlastGame);



  useEffect(() => {
    dispatch(actions.getProducts());
    dispatch(actions.getCategories());
    
  },
  [dispatch])

 const pagination = (action)=>{
    if (action === 'back') {setPage(prevState => (prevState - 1))}
    else if (action === 'next') {setPage(prevState => (prevState + 1))}
 };

 const paginationReset = (page)=>{
  setPage(prevState => (1))
};

 function filterCategory(e) {
    dispatch(actions.filterByCategories(e.target.value));
    setPage(1);
}

function orderAlphabetical() {
  setAlphabet(!alphabet);
  dispatch(actions.alphabeticalOrder(alphabet));
  setPage(1);
}

function orderPrice() {
  setPrice(!price);
  dispatch(actions.orderByPrice(price));
  setPage(1);
}

function orderRating() {
  setRating(!rating);
  dispatch(actions.orderByRating(rating));
  setPage(1);
}

  return (
    <div className={s.container}>
      
      <div className={s.header}>
        <img src={logo} alt="LOGO" className={s.logo}/>
        <h3>CloudyBuy</h3>
        {/* Filter by Category */}
        <div className={s.filters}>
         

          <div className={s.select}>
            <select name="filterCategory" onChange={(e) => filterCategory(e)} >
              <option value="All"> All Categories </option>
              { categories?.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              )) }
            </select>
          </div>
         </div>
         {/* Order Alphabetically */}
         <i className="fa-solid fa-dolly"></i>
         <button className={s.alpha} onClick={orderAlphabetical} >
            {alphabet ? ( <i className="fa-solid fa-arrow-down-z-a"></i> ) : (
             <i className="fa-solid fa-arrow-up-a-z"></i> )}
         </button> 
         

           {/* Order by Price */}
           <i className="fa-solid fa-hand-holding-dollar"></i>
         <button className={s.alpha} onClick={orderPrice} >
            {price ? ( <i className="fa-solid fa-arrow-down-z-a"></i>  ) : (
              <i className="fa-solid fa-arrow-up-a-z"></i> )}
          </button> 

          {/* Order by Rating */}
          <i className="fa-regular fa-star"></i>
          <button className={s.alpha} onClick={orderRating} >
            {rating ? ( <i className="fa-solid fa-arrow-down-z-a"></i> ) : (
              <i className="fa-solid fa-arrow-up-a-z"></i> )}
          </button>  
        <SearchBar paginationReset={paginationReset}/>
        
          <LoginModal/>  
        <div>
          <Link to={'/register'}>
            <button className={s.btns}>SignUp</button>
          </Link>
        </div>

      </div>
      
      <div className="">

      </div>
      <NavBar/>
      
      <Pagination pageSize={pageSize} totalProducts={listProducts.length} 
        page={page} pagination={pagination}/>
      <div className={s.productCards}>
        {
          currentProducts?.map( (product, index) => 
           
              <ProductCard key={product.id} title={product.title} id={product.id} price={product.price} images={product.thumbnail} rating={product.rating} />
            
          )

        }
      </div>
   
    </div>
  );


};