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

export function postCategory(payload) {
    return async (dispatch) => {
        const response = await axios.post(
          `http://localhost:3001/category`,
          payload
        );
        return response;
      };
}

export function postProduct(payload){
    console.log(`Payload de action postProduct: `);
    console.dir(payload);
    return async (dispatch) => {
        const response = await axios.post(
          `http://localhost:3001/product`,
          payload
        );
        return response;
      };
}

export function getProductsByName(name){
  return async function (dispatch){
    try {
      var json = await axios (`http://localhost:3001/product?name=${name}`);
      return dispatch({
        type: 'GET_PRODUCTS_BY_NAME',
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function putProduct(id, body) {
  return async function (dispatch) {
    try {
      await axios.put(`http://localhost:3001/product/${id}`, body);
      return dispatch({
        type: 'PUT_PRODUCT',
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/product/${id}`);
      return dispatch({
        type: 'DELETE_PRODUCT',
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function putCategory(id, body) {
  return async function (dispatch) {
    try {
      await axios.put(`http://localhost:3001/category/${id}`, body);
      return dispatch({
        type: 'PUT_CATEGORY',
        payload: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function deleteCategory(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/category/${id}`);
      return dispatch({
        type: 'DELETE_CATEGORY',
        payload: id
      })
    } catch (error) {
      console.log(error)
    }
  }
};

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

export function orderByPrice(payload){
  return {
      type: 'ORDER_BY_PRICE',
      payload
  }
};

export function filterByCategories(payload){
    return {
            type: 'FILTER_BY_CATEGORIES', 
            payload
        }    
};


export function searchProduct(payload){
    return {
        type: 'SEARCH_PRODUCT',
        payload
    }
};





