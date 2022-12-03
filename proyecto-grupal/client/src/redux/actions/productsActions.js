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

