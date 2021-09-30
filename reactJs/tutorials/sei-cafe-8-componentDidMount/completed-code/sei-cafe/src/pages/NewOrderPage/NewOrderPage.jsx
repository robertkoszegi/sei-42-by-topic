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

  async componentDidMount() {
    try {
      let fetchItemsResponse = await fetch('/api/items') // <-- get data from server (Stream object)
      let fetchCatsResponse = await fetch('/api/categories')
      let items = await fetchItemsResponse.json(); // <------- convert fetch response into a js object
      let catsObjects = await fetchCatsResponse.json();
      let catsStrings = catsObjects.map(c => c.name) // convert [{"id":"0", name:"sandwiches"},{..] => ["sandwiches",..]
      this.setState({ menuItems: items, menuCategories: catsStrings})
    } catch (err) {
      console.error('ERROR:', err) // <-- log if error
    }
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