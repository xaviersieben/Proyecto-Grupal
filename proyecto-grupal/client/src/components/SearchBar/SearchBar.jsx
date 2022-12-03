import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import s from './SearchBar.module.css';

export default function SearcBar() {

  const dispatch = useDispatch();
  const [nameProduct, setNameProduct] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.searchProduct(nameProduct));
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setNameProduct(e.target.value)
  }

  return (
    <div className={s.container}>
      <form onSubmit={e => handleSubmit(e)}>
        <input className={s.name} type="text" placeholder="Busca un producto o categoria o marca...." value={nameProduct}
          onChange={e => handleOnChange(e)} />
        <input className={s.btns2} type="submit" value='Buscar' />
      </form>
    </div>

  )  

}