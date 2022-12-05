import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import s from './SearchBar.module.css';
export default function SearcBar({paginationReset}) {

  const [nameProduct, setNameProduct] = useState('');
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.searchProduct(nameProduct));
    paginationReset();
  }
  const handleOnChange = (e) => {
    e.preventDefault();
    setNameProduct(e.target.value)
  }
  console.log(nameProduct)
  return (
    <div className={s.container}>
      <form onSubmit={e => handleSubmit(e)}>
        <input className={s.name} type="text" placeholder="Busca un producto o categoria o marca...." value={nameProduct}
          onChange={e => handleOnChange(e)} />
        <button className={s.alpha} type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>

  )  

}