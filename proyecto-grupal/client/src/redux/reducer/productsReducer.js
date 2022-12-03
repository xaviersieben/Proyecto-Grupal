const initialState = {
    products : [],
    allProducts : [],
    categories: [],
    detail: {}
};

export default function productsReducer (state= initialState, action){
    switch (action.type) {
        case 'GET_PRODUCTS':
            return{
                ...state,
                products: action.payload,
                allProducts: action.payload
            };
            case 'GET_PRODUCT_DETAILS':
                return {
                  ...state,
                  detail: action.payload,
                 
                };

        case 'GET_CATEGORIES':
            return{
                ...state,
                categories: action.payload
            };
        case 'POST_CATEGORY':
            return {
                ...state,
            }
        case 'POST_PRODUCT':
            return{
                ...state,
            };
        case 'ALPHABETICAL_ORDER':
            let sortedArr = action.payload === true ?
                
                state.products?.sort((a, b) => b.title.localeCompare(a.title)) :
                
                state.products?.sort((a, b) => a.title.localeCompare(b.title));
            return {
                ...state,
                products: sortedArr
            };

        case 'ORDER_BY_RATING':
            let sortedArr2 = action.payload === true ?
                state.products?.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating )) : 
                state.products?.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            return {
                ...state,
                products: sortedArr2
            };

            case 'ORDER_BY_PRICE':
            let sortedArr3 = action.payload === true ?
                state.products?.sort((a, b) => parseInt(a.price) - parseInt(b.price)) : 
                state.products?.sort((a, b) => parseInt(b.price) - parseInt(a.price))
            return {
                ...state,
                products: sortedArr3
            };

        case 'FILTER_BY_CATEGORIES':
            const allProductsCategories = state.allProducts;
            console.log(action.payload);
            const categoriesFiltered = action.payload === 'All' ? allProductsCategories : allProductsCategories.filter( pro => pro.categories?.find( e => e.hasOwnProperty("name")).name.includes(action.payload))
            console.log(categoriesFiltered);
            return{
                ...state,
                products: categoriesFiltered
            };    

        case 'SEARCH_PRODUCT': 
            let productList;
            if (action.payload.length === 0) {
                productList = state.allProducts
            } else {
                productList = state.products.filter( product => {
                let nameProduct = product.title.toLowerCase();
                return nameProduct.includes(action.payload.toLowerCase())
                })
            }
            return {
                ...state,
                products: productList
            };

        case "GET_PRODUCTS_BY_NAME":
            return{
                ...state,
                products: action.payload
            }

        default:
            return {...state};
    }
}