import './App.css';
import { Route } from 'react-router-dom';
import CreateProduct from './components/CreateProduct/CreateProduct.jsx';
import ModifyProduct from './components/ModifyProduct/ModifyProduct.jsx';
import CreateCategory from './components/CreateCategory/CreateCategory.jsx'
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import s from './App.module.css';

function App() {
  return (
    <div className={s.App}>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/home'} component={Home}/>
        <Route exact path = '/details/:id' component={ProductDetails} />
        <Route path='/modifyProduct/:id' component={ModifyProduct} />
        <Route path='/createProduct' component={CreateProduct} />
        <Route path='/createCategory' component={CreateCategory} />
      
    </div>
  );
}

export default App;
