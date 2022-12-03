import React from "react";
import { useState } from "react";
import s from './SearchBar.module.css';
import {getProductsByName} from "../../redux/actions/productsActions"
import { useDispatch } from "react-redux"
export default function SearcBar() {
  const [nameProduct, setNameProduct] = useState('');
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductsByName(nameProduct))
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
        <input className={s.btns2} type="submit" value='Buscar' />
      </form>
    </div>

  )  

}