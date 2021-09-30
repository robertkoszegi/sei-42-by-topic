import { Link } from "react-router-dom";
export default function LoginPage(props) {
  return (
    <>
      <h1>Login Page {props.match.params.id}</h1>
      <Link to="/orders">Order History</Link>
      <Link to="/orders/new">Order Page</Link>
    </>
  );
}
