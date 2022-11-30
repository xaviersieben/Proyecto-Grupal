import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createProduct from './components/CreateProduct.jsx';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/createProduct' component={CreateProduct} />
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
