// When using JSX, React must be in scope
import React from 'react';

function UserLogOut(props) {
  return (
      <div className='UserLogOut'>
        Name: CardiB<br />
        Email: cardi@b.com<br />
        <button>Logout</button>
      </div>
  );
}

export default UserLogOut;