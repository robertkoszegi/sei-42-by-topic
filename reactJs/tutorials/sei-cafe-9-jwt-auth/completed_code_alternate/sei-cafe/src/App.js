import React, { Component } from "react";
import "./App.css";
// Add the Route named import
import { Route, Switch, Redirect } from "react-router-dom";
import NewOrderPage from "./pages/NewOrderPage/NewOrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import AuthPage from "./pages/AuthPage/AuthPage";

class App extends Component {
  state = {
    user: null,
  };

  // when the page refreshes, check localStorage for the user jwt token
  async componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      // YOU DO: check expiry!
      try {
        const response = fetch("/api/user");
        let userDoc = JSON.parse(atob(token.split(".")[1])).user; // decode jwt token
        this.setState({ user: userDoc });
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData });
  };

  render() {
    return (
      <main className="App">
        {/* this ternary operator asks: is there a user in state? */}
        {/* if yes, they can see our pages: neworder, etc. */}
        {/* if no(user is null), show them only the <AuthPage> */}
        {this.state.user ? (
          <Switch>
            <Route
              path="/orders/new"
              render={(props) => <NewOrderPage {...props} />}
            />
            <Route
              path="/orders"
              render={(props) => <OrderHistoryPage {...props} />}
            />
            <Redirect to="/orders" />
          </Switch>
        ) : (
          <AuthPage setUserInState={this.setUserInState} />
        )}
      </main>
    );
  }
}

export default App;
