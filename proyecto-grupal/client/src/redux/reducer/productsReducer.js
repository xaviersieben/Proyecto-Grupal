import {
  GET_USERS,
  SET_ACTIVE_INACTIVE,
  TURN_INTO_ADMIN_OR_USER,
} from "../actions/productsActions";

const initialState = {
  products: [],
  allProducts: [],
  categories: [],
  cart: [],
  reviews: [],
  orders: [],
  detail: {},
  users: [],
  allUsers: [],
  user: {},
  socialUser: {},
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  userProfile: {},
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case "GET_PRODUCT_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "POST_CATEGORY":
      return {
        ...state,
      };

    case "POST_PRODUCT":
      return {
        ...state,
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };

    case "PUT_CATEGORY":
      return {
        ...state,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        productDeleted: action.payload,
      };

    case "PUT_PRODUCT":
      return {
        ...state,
      };

    case "ALPHABETICAL_ORDER":
      let sortedArr =
        action.payload === true
          ? state.products?.sort((a, b) => b.title.localeCompare(a.title))
          : state.products?.sort((a, b) => a.title.localeCompare(b.title));
      return {
        ...state,
        products: sortedArr,
      };

    case "ORDER_BY_RATING":
      let sortedArr2 =
        action.payload === true
          ? state.products?.sort(
              (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
            )
          : state.products?.sort(
              (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
            );
      return {
        ...state,
        products: sortedArr2,
      };

    case "ORDER_BY_PRICE":
      let sortedArr3 =
        action.payload === true
          ? state.products?.sort(
              (a, b) => parseInt(a.price) - parseInt(b.price)
            )
          : state.products?.sort(
              (a, b) => parseInt(b.price) - parseInt(a.price)
            );
      return {
        ...state,
        products: sortedArr3,
      };

    case "FILTER_BY_CATEGORIES":
      const allProductsCategories = state.allProducts;
      console.log(action.payload);
      const categoriesFiltered =
        action.payload === "All"
          ? allProductsCategories
          : allProductsCategories.filter((pro) =>
              pro.categories
                ?.find((e) => e.hasOwnProperty("name"))
                .name.includes(action.payload)
            );
      console.log(categoriesFiltered);
      return {
        ...state,
        products: categoriesFiltered,
      };

    case "SEARCH_PRODUCT":
      let productList;
      if (action.payload.length === 0) {
        productList = state.allProducts;
      } else {
        productList = state.allProducts.filter((product) => {
          let nameProduct = product.title.toLowerCase();
          return nameProduct.includes(action.payload.toLowerCase());
        });
      }
      return {
        ...state,
        products: productList,
      };

    case "GET_PRODUCTS_BY_NAME":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_CART":
      return {
        ...state,
        cart: [...action.payload],
      };
    case "GET_CART":
      return {
        ...state,
      };
      case "DELETE_CART":
        return {
          ...state,
          cart:[],
        };
    case "ADD_CART":
      let itemInCart = state.cart.find(
        (item) => item.productId === action.payload.productId
      );

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((i) =>
              i.productId === action.payload.productId
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                    amount: i.amount + action.payload.amount,
                  }
                : i
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };

    case "ONE_ITEM_CART":
      
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.productId === action.payload.productId
            ? {
                ...i,
                quantity: action.payload.quantity,
                amount: action.payload.amount,
              }
            : i
        ),
      };

    case "DELETE_ITEMS":
      const data = state.cart?.filter(
        (item) => item.productId !== action.payload.productId
      );

      return {
        ...state,
        cart: data,
      };

    case "CREATE_REVIEW":
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    case "GET_ORDER_DETAIL":
      return {
        ...state,
        orderDetail: action.payload,
      };
    case "SIGN_USER":
      return {
        ...state,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        allUsers: action.payload,
      };
    case SET_ACTIVE_INACTIVE:
      return {
        ...state,
      };
    case TURN_INTO_ADMIN_OR_USER:
      return {
        ...state,
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: {},
      };
    case 'IS_SOCIAL_USER':
      return {
        ...state, socialUser: action.payload
      }
    case 'GET_USER_PROFILE':
      return {
        ...state, userProfile: action.payload
      }
    case 'UPADTE_USER_PROFILE':
      return {
        ...state, userProfile: action.payload
      }

    default:
      return { ...state };
  }
}
