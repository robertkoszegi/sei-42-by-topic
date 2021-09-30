import React, { Component } from 'react';
import './App.css';
// Add the Route named import
import { Route, Switch, Redirect } from 'react-router-dom';
import NewOrderPage from './pages/NewOrderPage/NewOrderPage'
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage'
import AuthPage from './pages/AuthPage/AuthPage'

class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route path='/orders/new' render={(props) => (
            <NewOrderPage {...props}/>
          )}/>
          <Route path='/orders' render={(props) => (
            <OrderHistoryPage {...props}/>
          )}/>
          {/* and in case nothing matches, we redirect: */}
          <Redirect to="/orders" />
        </Switch>
      </main>
    );
  }
}

export default App;