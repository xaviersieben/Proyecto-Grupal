import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import * as actions from "../../redux/actions/productsActions";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";
import s from "./Home.module.css";
import logo from "..//../img/logo.JPG";
import LoginModal from "../Login/LoginModal";
import NavBar from "../NavBar/NavBar";
import LogIn from "../Auth0/LogIn";
import LogOut from "../Auth0/LogOut";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";

export default function Home() {
  // Auth0
  const { user, isAuthenticated, logout } = useAuth0();

  // Redux
  const dispatch = useDispatch();
  let listProducts = useSelector((state) => state.products);
  let categories = useSelector((state) => state.categories);
  let allProducts = useSelector((state) => state.allProducts);
  let userDb = useSelector((state) => state.user);
  let cart = useSelector((state) => state.cart);

  // Local states
  const [alphabet, setAlphabet] = useState(true);
  const [price, setPrice] = useState(true);
  const [rating, setRating] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  let indexlastGame = page * pageSize;
  let indexFirstGame = indexlastGame - pageSize;
  let currentProducts = listProducts.slice(indexFirstGame, indexlastGame);

  useEffect(() => {
    dispatch(actions.getProducts());
    dispatch(actions.getCategories());
  }, [dispatch]);

  const totalQuantity = cart.reduce((sum, value) => sum + value.quantity, 0);

  const pagination = (action) => {
    if (action === "back") {
      setPage((prevState) => prevState - 1);
    } else if (action === "next") {
      setPage((prevState) => prevState + 1);
    }
  };

  const paginationReset = (page) => {
    setPage((prevState) => 1);
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

  function handleLogOut() {
    dispatch(actions.logOut());
    if (isAuthenticated) logout();
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.logo}>
          <img src={logo} alt="LOGO" className={s.logo} />
          <h4>CloudyBuy</h4>
        </div>

        <SearchBar paginationReset={paginationReset} />

        <div className={s.login}>
          {!userDb.email ? (
            <LoginModal />
          ) : (
            <button className={s.btns} onClick={(e) => handleLogOut(e)}>
              Log Out
            </button>
          )}
          <div>
            {!userDb.email && (
              <Link to={"/register"}>
                <button className={s.btns}>SignUp</button>
              </Link>
            )}
          </div>
          <Link to={"/cart"}>
            {/* <button className={s.btns}>Cart</button> */}
            <Typography sx={{ color: "blue" }}>
              <ShoppingCartIcon className={s.shop} fontSize="small" />
            </Typography>
            <Typography variant="caption text" className={s.topIconBag}>
              {totalQuantity}
            </Typography>
          </Link>
          {/* <Link to={'/cart'}><button className={s.btns}>Cart</button></Link> */}
        </div>
      </div>

      <div className={s.header1}>
        {/* Filter by Category */}
        <div className={s.filters}>
          <div className={s.select}>
            <select name="filterCategory" onChange={(e) => filterCategory(e)}>
              <option value="All"> All Categories </option>
              {categories?.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Order Alphabetically */}
          <div className={s.divSort}>
            <button className={s.alpha} onClick={orderAlphabetical}>
              <i className="fa-solid fa-dolly"></i>
              {alphabet ? (
                <i className="fa-solid fa-arrow-down-z-a"></i>
              ) : (
                <i className="fa-solid fa-arrow-up-a-z"></i>
              )}
            </button>
          </div>

          {/* Order by Price */}
          <div className={s.divSort}>
            <button className={s.alpha} onClick={orderPrice}>
              <i className="fa-solid fa-hand-holding-dollar"></i>
              {price ? (
                <i className="fa-solid fa-arrow-down-z-a"></i>
              ) : (
                <i className="fa-solid fa-arrow-up-a-z"></i>
              )}
            </button>
          </div>

          {/* Order by Rating */}
          <div className={s.divSort}>
            <button className={s.alpha} onClick={orderRating}>
              <i className="fa-regular fa-star"></i>
              {rating ? (
                <i className="fa-solid fa-arrow-down-z-a"></i>
              ) : (
                <i className="fa-solid fa-arrow-up-a-z"></i>
              )}
            </button>
          </div>
        </div>

        <div className={s.divPagination}>
          <Pagination
            pageSize={pageSize}
            totalProducts={listProducts.length}
            page={page}
            pagination={pagination}
          />
        </div>

        <div className={s.userMenu}>
          {userDb.email && (
            <button className={s.userButton}>
              <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              <span>{userDb.name}</span>
            </button>
          )}
        </div>
      </div>
      {userDb.isAdmin && <NavBar />}

      <div className={s.productCards}>
        {currentProducts?.map((product, index) => (
          <ProductCard
            key={product.id}
            title={product.title}
            id={product.id}
            price={product.price}
            images={product.thumbnail}
            rating={product.rating}
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  );
}
