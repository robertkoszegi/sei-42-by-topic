import { Link } from "react-router-dom";
export default function OrderHistoryPage(props) {
  return (
    <>
      <div>OrderHistoryPage</div>
      <br />
      <Link to="/orders/new">New Order</Link>
    </>
  );
}
