import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuList from './components/MenuList/MenuList';
import OrderDetail from './components/OrderDetail/OrderDetail'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className='component'>
          <Logo />
          <CategoryList />
          <UserLogout />
        </nav>
        <MenuList />
        <OrderDetail />
      </div>
    )
  }
}

export default App;
