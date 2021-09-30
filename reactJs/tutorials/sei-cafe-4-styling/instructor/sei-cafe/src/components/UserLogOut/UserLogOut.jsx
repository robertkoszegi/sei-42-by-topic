import React from "react";
import "./UserLogOut.css";
import Button from "@material-ui/core/Button";

class UserLogOut extends React.Component {
  render() {
    return (
      <div className="UserLogOut">
        <div>Name: {this.props.name}</div>
        <div>Email: {this.props.email}</div>
        <button className="btn-sm btn btn-primary">Logout</button>
        <Button variant="outlined" color="secondary">
          Login
        </Button>
      </div>
    );
  }
}

export default UserLogOut;
