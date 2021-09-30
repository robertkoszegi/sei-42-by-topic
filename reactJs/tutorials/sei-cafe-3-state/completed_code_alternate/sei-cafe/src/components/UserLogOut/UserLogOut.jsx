// When using JSX, React must be in scope
import React from 'react';

class UserLogOut extends React.Component {
  render() {
  return (
      <div className='UserLogOut'>
        Name: {this.props.name}<br />
        Email: {this.props.email}<br />
        <button>Logout</button>
      </div>
  );
  }
}

export default UserLogOut;