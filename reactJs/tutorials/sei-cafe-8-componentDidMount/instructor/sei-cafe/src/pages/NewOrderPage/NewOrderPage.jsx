import "./NewOrderPage.css";
import React from "react";
import { Link } from "react-router-dom";
import MenuList from "../../components/MenuList/MenuList";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import Logo from "../../components/Logo/Logo";
import CategoryList from "../../components/CategoryList/CategoryList";
import UserLogOut from "../../components/UserLogOut/UserLogOut";

class NewOrderPage extends React.Component {
  constructor() {
    super();
    this.state = {
      menuCategories: [],
      activeCategory: "",
      lineItems: [],
      menuItems: [],
    };
  }
  // initial state of the app when it first loads

  handleCheckout = async () => {
    this.setState({ activeCategory: "something" });
    alert("checkout clicked");
  };

  async componentDidMount() {
    try {
      let fetchItemsResponse = await fetch("/api/items");
      let fetchCatsResponse = await fetch("/api/categories");
      let items = await fetchItemsResponse.json();
      let cats = await fetchCatsResponse.json();
      let catStrings = cats.map((cat) => cat.name);
      console.log(items, cats);
      this.setState({ menuItems: items, menuCategories: catStrings });
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    return (
      <main className="NewOrderPage">
        <nav className="nav">
          <Logo />
          <CategoryList menuCategories={this.state.menuCategories} />
          <Link to="/orders" className="button btn-sm">
            PREVIOUS ORDERS
          </Link>
          <UserLogOut />
        </nav>
        <MenuList menuItems={this.state.menuItems} />
        <OrderDetail
          handleCheckout={this.handleCheckout}
          lineItems={this.state.lineItems}
        />
      </main>
    );
  }
}

export default NewOrderPage;
