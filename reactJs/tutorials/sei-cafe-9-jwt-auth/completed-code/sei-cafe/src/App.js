import React, { Component } from 'react';
import './App.css';
// Add the Route named import
import { Route, Switch, Redirect } from 'react-router-dom';
import NewOrderPage from './pages/NewOrderPage/NewOrderPage'
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage'
import AuthPage from './pages/AuthPage/AuthPage'

class App extends Component {
  state = {
    user: null,
  }

  // if the user clicks signup/login (and is legit), put the user in state.
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }

  // when the page refreshes, check localStorage for the user jwt token
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      this.setState({user: userDoc})      
    }
  }

  render() {
    return (
      <main className="App">
        {/* this ternary operator asks: is there a user in state? */}
        {/* if yes, they can see our pages: neworder, etc. */}
        {/* if no(user is null), show them only the <AuthPage> */}
        { this.state.user ? 
          <Switch>
            <Route path='/orders/new' render={(props) => (
              <NewOrderPage {...props}/>
            )}/>
            <Route path='/orders' render={(props) => (
              <OrderHistoryPage {...props}/>
            )}/>
            <Redirect to="/orders" />
          </Switch>
          :
          <AuthPage setUserInState={this.setUserInState}/>
        }
      </main>
    );
  }
}

export default App;