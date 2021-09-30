// When using JSX, React must be in scope
import React from 'react';

function MenuListItem(props) {
  return (
    <div className="MenuListItem">
      <div className="emoji flex-ctr-ctr">🥗</div>
      <div className="name">Green Salad</div>
      <div className="buy">
        <span>$3.95</span>
        <button className="btn-sm" onClick={() => alert('add to cart coming soon!')}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default MenuListItem;