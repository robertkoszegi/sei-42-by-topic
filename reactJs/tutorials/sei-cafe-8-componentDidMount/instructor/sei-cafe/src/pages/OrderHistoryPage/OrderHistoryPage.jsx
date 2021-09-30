import "./OrderHistoryPage.css";
import { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import UserLogOut from "../../components/UserLogOut/UserLogOut";
import PrevOrdersList from "../../components/PrevOrdersList/PrevOrdersList";

export default class OrderHistoryPage extends Component {
  state = {
    orders: [],
  };

  componentDidMount = async () => {
    try {
      let response = await fetch("/api/orders");
      let orderData = await response.json();
      console.log(orderData);
      this.setState({ orders: orderData });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <main className="OrderHistoryPage">
        <nav>
          <Logo />
          <Link to="/orders/new" className="button btn-sm">
            NEW ORDER
          </Link>
          <UserLogOut />
        </nav>
        <PrevOrdersList orders={this.state.orders} />
        <div></div>
      </main>
    );
  }
}
