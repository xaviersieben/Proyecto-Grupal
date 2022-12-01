import './App.css';
import { Route } from 'react-router-dom';
import createProduct from './components/CreateProduct/CreateProduct.jsx';
import Home from './components/Home/Home';
import s from './App.module.css';

function App() {
  return (
    <div className={s.App}>
        <Route exact path={'/'} component={Home}/>
        <Route exact path={'/home'} component={Home}/>
        <Route path='/createProduct' component={createProduct} />
      
    </div>
  );
}

export default App;
