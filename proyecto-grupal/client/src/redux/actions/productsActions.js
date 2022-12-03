import axios from 'axios';

export function getProducts(){
    return (dispatch) => {
        fetch('http://localhost:3001/product')
         .then((res) => res.json())
         .then((json) => {
            dispatch({
                type: 'GET_PRODUCTS',
                payload: json,
            })
         })
    }
};

export function getProductsDetails(id) {
    return async function (dispatch) {
      try{
          var json = await axios.get(`http://localhost:3001/product/${id}`)
          return dispatch({
              type: 'GET_PRODUCT_DETAILS',
              payload: json.data,
            });
      }
      catch(err){
        console.log(err);
      }
    }
  }

export function getCategories(){
    return (dispatch) => {
        fetch('http://localhost:3001/category')
         .then((res) => res.json())
         .then((json) => {
            dispatch({
                type: 'GET_CATEGORIES',
                payload: json,
            })
         })
    }
};

export function postProduct(payload){
    return async (dispatch) => {
        const response = await axios.post(
          `http://localhost:3001/products`,
          payload
        );
        return response;
      };
}

export function alphabeticalOrder(payload){
    return {
        type: 'ALPHABETICAL_ORDER',
        payload
    }
};

export function orderByRating(payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
};

export function filterByCategories(payload){
    return {
            type: 'FILTER_BY_CATEGORIES', 
            payload
        }    
};

export function getProductsByName(name){
  return async function (dispatch){
    try {
      var json = await axios (`http://localhost:3001/product?name=${name}`);
      return dispatch({
        type: "GET_PRODUCTS_BY_NAME",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}