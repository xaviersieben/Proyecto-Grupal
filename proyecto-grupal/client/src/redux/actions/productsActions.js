import axios from 'axios';

export function getProducts(){
    return (dispatch) => {
        fetch('http://localhost:3001/products')
         .then((res) => res.json())
         .then((json) => {
            dispatch({
                type: 'GET_PRODUCTS',
                payload: json,
            })
         })
    }
};

export function getCategories(){
    return (dispatch) => {
        fetch('http://localhost:3001/products/categories')
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

export function filterByCategories(genre){
    return {
            type: 'FILTER_BY_CATEGORIES', 
            payload: categories
        }    
};

