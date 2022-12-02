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



export default function Home() {

  const dispatch = useDispatch();
  let listProducts = useSelector((state) => state.products);

  let categories = useSelector((state) => state.categories);
  let allProducts = useSelector((state) => state.allProducts);

  // let listCategories = useSelector((state) => state.categories);


  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
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

  console.log('listProducts',listProducts);
  console.log('page',page);
  console.log('pageSize',pageSize);

  function filterCategory(e) {
    dispatch(actions.filterByCategories(e.target.value));
    setPage(1);
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img src={logo} alt="LOGO" className={s.logo}/>
        <h3>CloudyBuy</h3>
        {/* Filter by Temperament */}
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
        <SearchBar/>
      </div>
      
      <div className="">

      </div>

      <div className={s.productCards}>
        {
          currentProducts?.map( (product, index) => 
           
              <ProductCard key={product.id} title={product.title} id={product.id} price={product.price} images={product.images} />
            
          )

        }
      </div>

      <Pagination pageSize={pageSize} totalProducts={listProducts.length} 
        page={page} pagination={pagination}/>
        
    </div>
  );


};