import "./NewOrderPage.css"
import React from 'react'
import { Link } from 'react-router-dom';
import MenuList from '../../components/MenuList/MenuList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import Logo from '../../components/Logo/Logo';
import CategoryList from '../../components/CategoryList/CategoryList';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

class NewOrderPage extends React.Component {

  // initial state of the app when it first loads
  state = {
    menuCategories: [],
    activeCategory: "",
    lineItems: [],
    menuItems: [],
  }

  handleCheckout = async () => {
    alert('checkout clicked')
  }

  render() {
    return (
      <main className="NewOrderPage">
        <nav className="nav">
          <Logo />
          <CategoryList menuCategories={this.state.menuCategories} />
          <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
          <UserLogOut />
        </nav>
        <MenuList menuItems={this.state.menuItems} />
        <OrderDetail handleCheckout={this.handleCheckout} lineItems={this.state.lineItems} />
      </main>
    );
  }
}

export default NewOrderPage;