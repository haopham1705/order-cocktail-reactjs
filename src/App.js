import './App.css';
import AuthRoute from 'components/Router/AuthRoute'
import PrivateRoute from 'components/Router/PrivateRoute'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import ProductInfo from 'components/ProductInfo'
import NotFound from 'components/NotFound'
import Cart from 'components/Cart'
import GlobalLoading from 'components/GlobalLoading'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <GlobalLoading />
      <Router>
        <Switch>
          <AuthRoute path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute exact path="/cocktail/:drinkId" component={ProductInfo} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
