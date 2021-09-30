// When using JSX, React must be in scope
import React from "react";

function MenuListItem({ name, price }) {
  return (
    <div className="MenuListItem">
      <div className="emoji flex-ctr-ctr">🥗</div>
      <div className="name">{name}</div>
      <div className="buy">
        <span>${price}</span>
        <button
          className="btn-sm"
          onClick={() => alert("add to cart coming soon!")}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default MenuListItem;
