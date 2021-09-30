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

  // add to cart button
  handleAddToCart = (incoming_item) => {    
    let itemAlreadyExistsInCart = this.state.lineItems.some(obj => obj.item.name === incoming_item.name)
    if (itemAlreadyExistsInCart) {
      // if item already exists in cart, increment quantity in the fanciest way possible: map + ternary operator to replace the object in question.
      // YOU DO: replace with a simple, readable, debuggable for loop.
      this.setState({lineItems: this.state.lineItems.map(obj => obj.item.name === incoming_item.name ? {...obj,qty:obj.qty+1} : obj)})
    } else {
      // if item doesn't exist in cart, copy over existing cart + stick incoming_item in
      this.setState({lineItems: [...this.state.lineItems,{qty:1,item:incoming_item}]})
    }
  }

  // send cart to server
  handleCheckout = async () => {
    try {
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
        body: JSON.stringify({lineItems: this.state.lineItems}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse)   // <-- log server response

      this.setState({lineItems: []}) // if order sent without errors, set state to empty
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }

  // lifecycle method that runs once. fetch the menu from the DB.
  async componentDidMount() {
    try {
      let fetchItemsResponse = await fetch('/api/items') // <-- get data from server (Stream object)
      let fetchCatsResponse = await fetch('/api/categories')
      let items = await fetchItemsResponse.json(); // <------- convert fetch response into a js object/array
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
        <MenuList menuItems={this.state.menuItems} handleAddToCart={this.handleAddToCart} />
        <OrderDetail handleCheckout={this.handleCheckout} lineItems={this.state.lineItems} />
      </main>
    );
  }
}

export default NewOrderPage;