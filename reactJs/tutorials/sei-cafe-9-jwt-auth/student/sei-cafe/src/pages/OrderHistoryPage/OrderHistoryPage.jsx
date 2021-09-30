import './OrderHistoryPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import PrevOrdersList from '../../components/PrevOrdersList/PrevOrdersList';

export default class OrderHistoryPage extends React.Component {
  state = {
    orderHistory: []
  }

  async componentDidMount() {
    try {
      let fetchOrdersResponse = await fetch('/api/orders') // <-- get data from server (Stream object)
      // uncomment this line below for extra error handling:
      // if (!fetchOrdersResponse.ok) throw new Error("Couldn't fetch orders")
      let orders = await fetchOrdersResponse.json(); // <------- convert fetch response into a js object

      // put into sate
      this.setState({ orderHistory: orders})
    } catch (err) {
      console.error('ERROR:', err) // <-- log if error
    }
  }

  render() {
    return (
      <main className="OrderHistoryPage">
        <nav>
          <Logo />
          <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
          <UserLogOut  />
        </nav>
        <PrevOrdersList orderHistory={this.state.orderHistory} />
        <div></div>
      </main>
    )
  }
}