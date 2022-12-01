import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import SearchBar from '../SearchBar/SearchBar';
import s from './Home.module.css';


export default function Home() {

  const dispatch = useDispatch();
  let listProducts = useSelector((state) => state.products);
  let listCategories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(actions.getProducts());
    dispatch(actions.getCategories());
  },
  [])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img src="" alt="LOGO" />
        <h3>Ecommerce</h3>
        <SearchBar/>
      </div>


    </div>
  );


};

