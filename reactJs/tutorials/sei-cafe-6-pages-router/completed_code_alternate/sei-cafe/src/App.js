import React, { Component } from 'react';
import './App.css';
// Add the Route named import
import { Route, Switch, Redirect } from 'react-router-dom';

import NewOrderPage from './pages/NewOrderPage/NewOrderPage'
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path='/orders/new' render={(props) => (
          <NewOrderPage {...props}/>
        )}/>
        <Route path='/orders' render={(props) => (
          <OrderHistoryPage {...props}/>
        )}/>
        <Redirect to="/orders" />
        </Switch>
      </div>
    );
  }
}

export default App;