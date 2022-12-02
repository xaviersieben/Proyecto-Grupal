// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import productsReducer from '../reducer/productsReducer';

// const reducers = combineReducers({
// 	productsReducer
// });

// const store = createStore(
// 	reducers,
// 	composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;


import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/productsReducer';
import thunk from 'redux-thunk';

const composeEnhancers =
   (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
   compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk)),
);

export default store;