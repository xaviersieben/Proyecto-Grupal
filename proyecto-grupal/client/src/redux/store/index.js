import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import productsReducer from '..//reducer/productsReducer';


const store = createStore( 	productsReducer, composeWithDevTools(applyMiddleware(thunk)) );

export default store;