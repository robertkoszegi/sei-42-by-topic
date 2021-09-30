import React, { Component } from "react";
import "./App.css";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/orders/new"
            render={(props) => <NewOrderPage {...props} />}
          />
          <Route
            path="/orders"
            render={(props) => <OrderHistoryPage {...props} />}
          />
          <Route
            path="/login/:id"
            render={(props) => <LoginPage {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
