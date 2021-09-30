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

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData });
  };

  componentDidMount = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        //We call our verify route that just uses the auth middleware to verify the token. See the server comments for more details
        const response = await fetch("/api/users/verify", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        //If the token is expired data.name will be TokenExpiredError so we throw a new error so out catch block can handle it
        if (data.name === "TokenExpiredError") throw new Error("token expired");

        let userDoc = JSON.parse(atob(token.split(".")[1])).user;
        this.setState({ user: userDoc });
      } catch (err) {
        console.log(err);
        //If there is a problem with the response from the verify link, set the user to null
        this.setState({ user: null });
      }
    }
  };

  render() {
    return (
      <main className="App">
        {this.state.user ? (
          <Switch>
            <Route
              path="/orders/new"
              render={(props) => (
                //PASS USER AS PROPS FOR THE USER INFO
                <NewOrderPage
                  {...props}
                  user={this.state.user}
                  setUserInState={this.setUserInState}
                />
              )}
            />
            <Route
              path="/orders"
              render={(props) => (
                //PASS USER AS PROPS FOR THE USER INFO
                <OrderHistoryPage
                  {...props}
                  user={this.state.user}
                  setUserInState={this.setUserInState}
                />
              )}
            />
            {/* and in case nothing matches, we redirect: */}
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
