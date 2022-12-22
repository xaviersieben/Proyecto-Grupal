import './App.css';
import { Route } from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';
import AdminRoute from './helpers/AdminRoute';
import CreateProduct from './components/CreateProduct/CreateProduct.jsx';
import ModifyProduct from './components/ModifyProduct/ModifyProduct.jsx';
import CreateCategory from './components/CreateCategory/CreateCategory.jsx'
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Register/Register';
import LoginModal from './components/Login/LoginModal';
import s from './App.module.css';
import UsersAdministration from './components/UsersAdministration/UsersAdministration';
import Cart from './components/Cart/Cart.jsx';
import PasswordReset from "../src/components/PasswordReset/PasswordReset";
import PasswordConfirm from "../src/components/PasswordReset/PasswordConfirm"

function App() {
  return (
    <div className={s.App}>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/home'} component={Home}/>
        <Route exact path = '/details/:id' component={ProductDetails} />
        <AdminRoute path='/modifyProduct/:id' component={ModifyProduct} />
        <AdminRoute path='/createProduct' component={CreateProduct} />
        <AdminRoute path='/createCategory' component={CreateCategory} />
        <Route exact path='/register' component={Register} />
        <Route path='/passReset' component={PasswordReset} /> 
        <Route path='/passConfirm/:id/:token' component={PasswordConfirm} />
        <Route path='/administrateUsers' component={UsersAdministration} />    
        <Route path='/cart' component={Cart} />    
        <Route exact path='/login' component={LoginModal} />
        <AdminRoute path='/administrateUsers' component={UsersAdministration} />
    </div>
  );
}

export default App;
