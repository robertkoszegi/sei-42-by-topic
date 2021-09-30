// When using JSX, React must be in scope
import React from 'react';

function UserLogOut(props) {
  return (
      <div className='UserLogOut'>
        Name: {props.name}<br />
        Email: {props.email}<br />
        {/* add the onClick below */}
        <button onClick={() => props.handleLogout()}>Logout</button>
      </div>
  );
}

export default UserLogOut;