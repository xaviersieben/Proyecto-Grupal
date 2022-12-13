import './App.css';
import { Route } from 'react-router-dom';
import CreateProduct from './components/CreateProduct/CreateProduct.jsx';
import ModifyProduct from './components/ModifyProduct/ModifyProduct.jsx';
import CreateCategory from './components/CreateCategory/CreateCategory.jsx'
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Register/Register';
import s from './App.module.css';
import UsersAdministration from './components/UsersAdministration/UsersAdministration';
import Cart from './components/Cart/Cart.jsx';

function App() {
  return (
    <div className={s.App}>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/home'} component={Home}/>
        <Route exact path = '/details/:id' component={ProductDetails} />
        <Route path='/modifyProduct/:id' component={ModifyProduct} />
        <Route path='/createProduct' component={CreateProduct} />
        <Route path='/createCategory' component={CreateCategory} />
        <Route exact path='/register' component={Register} />
        <Route path='/administrateUsers' component={UsersAdministration} />    
        <Route path='/cart' component={Cart} />    
    </div>
  );
}

export default App;
